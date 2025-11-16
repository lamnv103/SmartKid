"use client"

import type React from "react"
import { View, Text, StyleSheet } from "react-native"

interface ScoreDisplayProps {
  score: number
  maxScore?: number
  label?: string
  size?: "small" | "medium" | "large"
}

export const ScoreDisplay: React.FC<ScoreDisplayProps> = ({ score, maxScore, label = "Score", size = "medium" }) => {
  const sizeStyles = {
    small: styles.smallScore,
    medium: styles.mediumScore,
    large: styles.largeScore,
  }

  const textSizes = {
    small: { scoreSize: 24, labelSize: 12 },
    medium: { scoreSize: 32, labelSize: 14 },
    large: { scoreSize: 48, labelSize: 16 },
  }

  const textSize = textSizes[size]

  return (
    <View style={[styles.container, sizeStyles[size]]}>
      <Text style={[styles.score, { fontSize: textSize.scoreSize }]}>
        {score}
        {maxScore && <Text style={styles.maxScore}>/{maxScore}</Text>}
      </Text>
      <Text style={[styles.label, { fontSize: textSize.labelSize }]}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFE5F0",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 2,
    borderColor: "#FFD4E5",
  },
  smallScore: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediumScore: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  largeScore: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  score: {
    fontWeight: "bold",
    color: "#FF6B9D",
  },
  maxScore: {
    fontSize: 16,
    color: "#999",
  },
  label: {
    color: "#666",
    marginTop: 4,
    fontWeight: "500",
  },
})
