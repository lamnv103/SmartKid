"use client"

import type React from "react"
import { TouchableOpacity, Text, StyleSheet, type ViewStyle } from "react-native"

interface ButtonProps {
  onPress: () => void
  children: string
  variant?: "primary" | "secondary" | "success" | "danger"
  size?: "small" | "medium" | "large"
  disabled?: boolean
  style?: ViewStyle
}

export const Button: React.FC<ButtonProps> = ({
  onPress,
  children,
  variant = "primary",
  size = "medium",
  disabled = false,
  style,
}) => {
  const variantStyles = {
    primary: styles.primaryButton,
    secondary: styles.secondaryButton,
    success: styles.successButton,
    danger: styles.dangerButton,
  }

  const sizeStyles = {
    small: styles.smallButton,
    medium: styles.mediumButton,
    large: styles.largeButton,
  }

  const textSizeStyles = {
    small: styles.smallText,
    medium: styles.mediumText,
    large: styles.largeText,
  }

  return (
    <TouchableOpacity
      style={[styles.button, variantStyles[variant], sizeStyles[size], disabled && styles.disabledButton, style]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[styles.buttonText, textSizeStyles[size]]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  primaryButton: {
    backgroundColor: "#FF6B9D",
  },
  secondaryButton: {
    backgroundColor: "#FFD4E5",
  },
  successButton: {
    backgroundColor: "#6BCB77",
  },
  dangerButton: {
    backgroundColor: "#FF6B6B",
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  largeButton: {
    paddingVertical: 16,
    paddingHorizontal: 32,
  },
  disabledButton: {
    opacity: 0.5,
  },
  buttonText: {
    fontWeight: "bold",
    color: "#FFF",
  },
  smallText: {
    fontSize: 12,
  },
  mediumText: {
    fontSize: 14,
  },
  largeText: {
    fontSize: 16,
  },
})
