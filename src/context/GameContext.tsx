"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"
import type { GameCard, GameSession } from "../types"

interface GameContextType {
  cards: GameCard[]
  currentSession: GameSession | null
  startGame: (category: string, level: "easy" | "medium" | "hard", studentId: string) => void
  endGame: (score: number, correctAnswers: number) => void
  getCardsByCategory: (category: string) => GameCard[]
}

const GameContext = createContext<GameContextType | undefined>(undefined)

// Mock game data
const MOCK_CARDS: GameCard[] = [
  // Animals
  { id: "1", vietnameseName: "Mèo", englishName: "Cat", image: "🐱", category: "animals", pronunciation: "kæt" },
  { id: "2", vietnameseName: "Chó", englishName: "Dog", image: "🐶", category: "animals", pronunciation: "dɔg" },
  { id: "3", vietnameseName: "Chim", englishName: "Bird", image: "🐦", category: "animals", pronunciation: "bɜrd" },
  { id: "4", vietnameseName: "Cá", englishName: "Fish", image: "🐠", category: "animals", pronunciation: "fɪʃ" },
  {
    id: "5",
    vietnameseName: "Voi",
    englishName: "Elephant",
    image: "🐘",
    category: "animals",
    pronunciation: "ˈɛlɪfənt",
  },
  { id: "6", vietnameseName: "Sư tử", englishName: "Lion", image: "🦁", category: "animals", pronunciation: "ˈlaɪən" },
  { id: "7", vietnameseName: "Khỉ", englishName: "Monkey", image: "🐵", category: "animals", pronunciation: "ˈmʌŋki" },
  { id: "8", vietnameseName: "Gấu", englishName: "Bear", image: "🐻", category: "animals", pronunciation: "bɛr" },
  // Fruits
  { id: "9", vietnameseName: "Táo", englishName: "Apple", image: "🍎", category: "fruits", pronunciation: "æpəl" },
  {
    id: "10",
    vietnameseName: "Chuối",
    englishName: "Banana",
    image: "🍌",
    category: "fruits",
    pronunciation: "bəˈnænə",
  },
  { id: "11", vietnameseName: "Cam", englishName: "Orange", image: "🍊", category: "fruits", pronunciation: "ˈɔrɪndʒ" },
  {
    id: "12",
    vietnameseName: "Dâu",
    englishName: "Strawberry",
    image: "🍓",
    category: "fruits",
    pronunciation: "ˈstrɔberi",
  },
  { id: "13", vietnameseName: "Nho", englishName: "Grape", image: "🍇", category: "fruits", pronunciation: "ɡreɪp" },
  {
    id: "14",
    vietnameseName: "Dưa hấu",
    englishName: "Watermelon",
    image: "🍉",
    category: "fruits",
    pronunciation: "ˈwɔtərˌmɛlən",
  },
  { id: "15", vietnameseName: "Chanh", englishName: "Lemon", image: "🍋", category: "fruits", pronunciation: "ˈlɛmən" },
  { id: "16", vietnameseName: "Xoài", englishName: "Mango", image: "🥭", category: "fruits", pronunciation: "ˈmæŋɡoʊ" },
  // Vehicles
  { id: "17", vietnameseName: "Xe", englishName: "Car", image: "🚗", category: "vehicles", pronunciation: "kɑr" },
  {
    id: "18",
    vietnameseName: "Máy bay",
    englishName: "Airplane",
    image: "✈️",
    category: "vehicles",
    pronunciation: "ˈɛrpleɪn",
  },
  { id: "19", vietnameseName: "Tàu", englishName: "Train", image: "🚂", category: "vehicles", pronunciation: "treɪn" },
  { id: "20", vietnameseName: "Xe buýt", englishName: "Bus", image: "🚌", category: "vehicles", pronunciation: "bʌs" },
  {
    id: "21",
    vietnameseName: "Xe đạp",
    englishName: "Bicycle",
    image: "🚲",
    category: "vehicles",
    pronunciation: "ˈbaɪsɪkəl",
  },
  {
    id: "22",
    vietnameseName: "Tàu thủy",
    englishName: "Ship",
    image: "🚢",
    category: "vehicles",
    pronunciation: "ʃɪp",
  },
  {
    id: "23",
    vietnameseName: "Trực thăng",
    englishName: "Helicopter",
    image: "🚁",
    category: "vehicles",
    pronunciation: "ˈhɛlɪˌkɑptər",
  },
  {
    id: "24",
    vietnameseName: "Xe cứu thương",
    englishName: "Ambulance",
    image: "🚑",
    category: "vehicles",
    pronunciation: "ˈæmbjələns",
  },
  // Colors
  { id: "25", vietnameseName: "Đỏ", englishName: "Red", image: "🔴", category: "colors", pronunciation: "rɛd" },
  {
    id: "26",
    vietnameseName: "Xanh dương",
    englishName: "Blue",
    image: "🔵",
    category: "colors",
    pronunciation: "blu",
  },
  { id: "27", vietnameseName: "Vàng", englishName: "Yellow", image: "🟡", category: "colors", pronunciation: "ˈjɛloʊ" },
  { id: "28", vietnameseName: "Xanh lá", englishName: "Green", image: "🟢", category: "colors", pronunciation: "ɡrin" },
  { id: "29", vietnameseName: "Tím", englishName: "Purple", image: "🟣", category: "colors", pronunciation: "ˈpɜrpəl" },
  { id: "30", vietnameseName: "Cam", englishName: "Orange", image: "🟠", category: "colors", pronunciation: "ˈɔrɪndʒ" },
  { id: "31", vietnameseName: "Hồng", englishName: "Pink", image: "🩷", category: "colors", pronunciation: "pɪŋk" },
  { id: "32", vietnameseName: "Nâu", englishName: "Brown", image: "🟤", category: "colors", pronunciation: "braʊn" },
]

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cards] = useState<GameCard[]>(MOCK_CARDS)
  const [currentSession, setCurrentSession] = useState<GameSession | null>(null)

  const startGame = (category: string, level: "easy" | "medium" | "hard", studentId: string) => {
    const session: GameSession = {
      id: Math.random().toString(),
      studentId,
      category,
      level,
      score: 0,
      correctAnswers: 0,
      totalCards: 0,
      duration: 0,
      date: new Date().toISOString(),
    }
    setCurrentSession(session)
  }

  const endGame = (score: number, correctAnswers: number) => {
    if (currentSession) {
      setCurrentSession({
        ...currentSession,
        score,
        correctAnswers,
      })
    }
  }

  const getCardsByCategory = (category: string) => {
    return cards.filter((card) => card.category === category)
  }

  return (
    <GameContext.Provider value={{ cards, currentSession, startGame, endGame, getCardsByCategory }}>
      {children}
    </GameContext.Provider>
  )
}

export const useGame = () => {
  const context = useContext(GameContext)
  if (!context) {
    throw new Error("useGame must be used within GameProvider")
  }
  return context
}
