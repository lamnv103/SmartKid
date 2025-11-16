"use client"

import type React from "react"
import { View, StyleSheet, type ViewStyle } from "react-native"

interface CardProps {
  children: React.ReactNode
  variant?: "default" | "elevated" | "outlined"
  style?: ViewStyle
}

export const Card: React.FC<CardProps> = ({ children, variant = "default", style }) => {
  const variantStyles = {
    default: styles.defaultCard,
    elevated: styles.elevatedCard,
    outlined: styles.outlinedCard,
  }

  return <View style={[styles.card, variantStyles[variant], style]}>{children}</View>
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 16,
  },
  defaultCard: {
    backgroundColor: "#FFE5F0",
    borderWidth: 2,
    borderColor: "#FFD4E5",
  },
  elevatedCard: {
    backgroundColor: "#FFF",
    shadowColor: "#FF6B9D",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 5,
  },
  outlinedCard: {
    backgroundColor: "transparent",
    borderWidth: 2,
    borderColor: "#FF6B9D",
  },
})
