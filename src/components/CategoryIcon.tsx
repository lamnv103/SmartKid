"use client"

import type React from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle } from "react-native"

interface CategoryIconProps {
  emoji: string
  label: string
  color: string
  onPress?: () => void
  style?: ViewStyle
}

export const CategoryIcon: React.FC<CategoryIconProps> = ({ emoji, label, color, onPress, style }) => {
  return (
    <TouchableOpacity style={[styles.container, { backgroundColor: color }, style]} onPress={onPress}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    paddingVertical: 24,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  emoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
})
