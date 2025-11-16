"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native"
import { useGame } from "../context/GameContext"
import type { NavigateFunction } from "../types/navigation";

interface GameScreenProps {
  category: string;
  level: string;
  onNavigate: NavigateFunction;
}

interface CardState {
  id: string
  vietnameseName: string
  englishName: string
  image: string
  category: string
  pronunciation: string
  pairId: string
}

const { width } = Dimensions.get("window")

export const GameScreen: React.FC<GameScreenProps> = ({ category, level, onNavigate }) => {
  const { getCardsByCategory } = useGame()
  const [cards, setCards] = useState<CardState[]>([])
  const [flipped, setFlipped] = useState<{ [key: string]: boolean }>({})
  const [matched, setMatched] = useState<string[]>([])
  const [score, setScore] = useState(0)
  const [moves, setMoves] = useState(0)
  const [timeLeft, setTimeLeft] = useState(0)
  const [gameActive, setGameActive] = useState(true)
  const [combo, setCombo] = useState(0)

  useEffect(() => {
    const categoryCards = getCardsByCategory(category)
    const cardCount = level === "easy" ? 4 : level === "medium" ? 6 : 8
    const selectedCards = categoryCards.slice(0, cardCount)

    // Create pairs with unique IDs
    const gameCards: CardState[] = []
    selectedCards.forEach((card, index) => {
      gameCards.push({ ...card, pairId: `pair-${index}-0` })
      gameCards.push({ ...card, pairId: `pair-${index}-1` })
    })

    // Shuffle cards
    const shuffled = gameCards.sort(() => Math.random() - 0.5)
    setCards(shuffled)

    // Set timer based on difficulty
    const timeByLevel = { easy: 120, medium: 180, hard: 240 }
    setTimeLeft(timeByLevel[level as keyof typeof timeByLevel])
  }, [category, level])

  useEffect(() => {
    if (!gameActive || timeLeft <= 0) return

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameActive(false)
          return 0
        }
        return prev - 1
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [gameActive])

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return `${mins}:${secs.toString().padStart(2, "0")}`
  }

  const handleCardFlip = (cardId: string) => {
    if (!gameActive || flipped[cardId] || matched.includes(cardId)) return

    const newFlipped = { ...flipped, [cardId]: true }
    setFlipped(newFlipped)
    setMoves(moves + 1)

    const flippedCards = Object.keys(newFlipped).filter((id) => newFlipped[id] && !matched.includes(id))

    if (flippedCards.length === 2) {
      setTimeout(() => {
        const card1 = cards.find((c) => c.id === flippedCards[0])
        const card2 = cards.find((c) => c.id === flippedCards[1])

        if (card1 && card2 && card1.englishName === card2.englishName) {
          const newMatched = [...matched, ...flippedCards]
          setMatched(newMatched)

          // Calculate score with combo multiplier
          const baseScore = 10
          const comboMultiplier = 1 + combo * 0.1
          const earnedScore = Math.floor(baseScore * comboMultiplier)
          setScore(score + earnedScore)
          setCombo(combo + 1)

          setFlipped({})
        } else {
          // Reset combo on mismatch
          setCombo(0)
          setFlipped({})
        }
      }, 1000)
    }
  }

  const handleGameEnd = () => {
    setGameActive(false)
    const accuracy = moves > 0 ? Math.round((matched.length / (cards.length * 2)) * 100) : 0
    onNavigate("StudentHome", { score, moves, accuracy })
  }

  if (!gameActive && timeLeft === 0) {
    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>⏰ Hết giờ!</Text>
          <Text style={styles.resultScore}>Điểm: {score}</Text>
          <Text style={styles.resultMoves}>Số lần lật: {moves}</Text>
          <Text style={styles.resultMatched}>Cặp tìm được: {matched.length / 2}</Text>
          <TouchableOpacity style={styles.playAgainButton} onPress={() => onNavigate("StudentHome")}>
            <Text style={styles.playAgainButtonText}>Quay lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  if (matched.length === cards.length && cards.length > 0) {
    const accuracy = Math.round((matched.length / (cards.length * 2)) * 100)
    const timeBonus = Math.max(0, timeLeft * 2)
    const totalScore = score + timeBonus

    return (
      <View style={styles.container}>
        <View style={styles.resultContainer}>
          <Text style={styles.resultTitle}>🎉 Tuyệt vời!</Text>
          <Text style={styles.resultScore}>Điểm: {totalScore}</Text>
          <Text style={styles.resultMoves}>Số lần lật: {moves}</Text>
          <Text style={styles.resultAccuracy}>Độ chính xác: {accuracy}%</Text>
          <Text style={styles.resultBonus}>Thưởng thời gian: +{timeBonus}</Text>
          <TouchableOpacity style={styles.playAgainButton} onPress={() => onNavigate("StudentHome")}>
            <Text style={styles.playAgainButtonText}>Chơi lại</Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate("StudentHome")} disabled={!gameActive}>
          <Text style={[styles.backButton, !gameActive && styles.backButtonDisabled]}>← Quay lại</Text>
        </TouchableOpacity>
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Điểm</Text>
            <Text style={styles.statValue}>{score}</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statLabel}>Lần</Text>
            <Text style={styles.statValue}>{moves}</Text>
          </View>
          <View style={[styles.statItem, timeLeft < 30 && styles.statItemWarning]}>
            <Text style={styles.statLabel}>Thời gian</Text>
            <Text style={[styles.statValue, timeLeft < 30 && styles.statValueWarning]}>{formatTime(timeLeft)}</Text>
          </View>
        </View>
      </View>

      {combo > 1 && (
        <View style={styles.comboContainer}>
          <Text style={styles.comboText}>🔥 Combo x{combo}</Text>
        </View>
      )}

      <View style={styles.progressContainer}>
        <View style={styles.progressBar}>
          <View style={[styles.progressFill, { width: `${(matched.length / cards.length) * 100}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {matched.length / 2} / {cards.length / 2} cặp
        </Text>
      </View>

      <View style={styles.gameBoard}>
        {cards.map((card) => (
          <TouchableOpacity
            key={card.id}
            style={[styles.card, flipped[card.id] || matched.includes(card.id) ? styles.cardFlipped : styles.cardBack]}
            onPress={() => handleCardFlip(card.id)}
            disabled={!gameActive}
          >
            {flipped[card.id] || matched.includes(card.id) ? (
              <View style={styles.cardContent}>
                <Text style={styles.cardImage}>{card.image}</Text>
                <Text style={styles.cardText}>{card.englishName}</Text>
                <Text style={styles.cardTextVi}>{card.vietnameseName}</Text>
              </View>
            ) : (
              <Text style={styles.cardBackText}>?</Text>
            )}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
    paddingHorizontal: 16,
    paddingTop: 40,
  },
  header: {
    marginBottom: 16,
  },
  backButton: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B9D",
    marginBottom: 12,
  },
  backButtonDisabled: {
    opacity: 0.5,
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    backgroundColor: "#FFE5F0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  statItem: {
    alignItems: "center",
  },
  statItemWarning: {
    backgroundColor: "#FFD4E5",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  statLabel: {
    fontSize: 12,
    color: "#666",
    fontWeight: "500",
  },
  statValue: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#FF6B9D",
    marginTop: 4,
  },
  statValueWarning: {
    color: "#C92A2A",
  },
  comboContainer: {
    alignItems: "center",
    marginBottom: 12,
  },
  comboText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6B9D",
  },
  progressContainer: {
    marginBottom: 16,
  },
  progressBar: {
    height: 8,
    backgroundColor: "#FFD4E5",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 6,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6B9D",
  },
  progressText: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  gameBoard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  card: {
    width: "48%",
    aspectRatio: 1,
    marginBottom: 12,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 2,
  },
  cardBack: {
    backgroundColor: "#FF6B9D",
    borderColor: "#FF5A8C",
  },
  cardFlipped: {
    backgroundColor: "#FFE5F0",
    borderColor: "#FFD4E5",
  },
  cardBackText: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FFF",
  },
  cardContent: {
    alignItems: "center",
  },
  cardImage: {
    fontSize: 40,
    marginBottom: 8,
  },
  cardText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  cardTextVi: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  resultContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  resultTitle: {
    fontSize: 48,
    marginBottom: 20,
  },
  resultScore: {
    fontSize: 32,
    fontWeight: "bold",
    color: "#FF6B9D",
    marginBottom: 10,
  },
  resultMoves: {
    fontSize: 18,
    color: "#666",
    marginBottom: 8,
  },
  resultAccuracy: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  resultMatched: {
    fontSize: 16,
    color: "#666",
    marginBottom: 8,
  },
  resultBonus: {
    fontSize: 16,
    color: "#FF6B9D",
    fontWeight: "600",
    marginBottom: 20,
  },
  playAgainButton: {
    backgroundColor: "#FF6B9D",
    paddingHorizontal: 40,
    paddingVertical: 14,
    borderRadius: 12,
  },
  playAgainButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
})
