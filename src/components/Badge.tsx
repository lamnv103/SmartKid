"use client"

import type React from "react"
import { View, Text, StyleSheet, type ViewStyle } from "react-native"

interface BadgeProps {
  emoji: string
  label: string
  description?: string
  style?: ViewStyle
}

export const Badge: React.FC<BadgeProps> = ({ emoji, label, description, style }) => {
  return (
    <View style={[styles.badge, style]}>
      <Text style={styles.emoji}>{emoji}</Text>
      <Text style={styles.label}>{label}</Text>
      {description && <Text style={styles.description}>{description}</Text>}
    </View>
  )
}

const styles = StyleSheet.create({
  badge: {
    backgroundColor: "#FFE5F0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFD4E5",
  },
  emoji: {
    fontSize: 32,
    marginBottom: 4,
  },
  label: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#333",
    textAlign: "center",
  },
  description: {
    fontSize: 10,
    color: "#666",
    marginTop: 2,
    textAlign: "center",
  },
})
