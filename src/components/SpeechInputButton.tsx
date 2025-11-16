"use client"

import type React from "react"
import { TouchableOpacity, Text, StyleSheet, View, Alert } from "react-native"
import { useState } from "react"

interface SpeechInputButtonProps {
  onSpeechDetected: (text: string) => void
  isLoading: boolean
}

export const SpeechInputButton: React.FC<SpeechInputButtonProps> = ({ onSpeechDetected, isLoading }) => {
  const [isListening, setIsListening] = useState(false)

  const handleSpeechInput = async () => {
    if (isLoading) return

    try {
      setIsListening(true)
      // In production, integrate with actual STT service (Google Cloud Speech-to-Text, etc.)
      // For demo purposes, showing alert to simulate input
      Alert.prompt("Nói hoặc nhập văn bản của bạn:", "", [
        {
          text: "Huỷ",
          onPress: () => setIsListening(false),
          style: "cancel",
        },
        {
          text: "Gửi",
          onPress: (text: string |undefined ) => {
            if (text) {
              onSpeechDetected(text)
            }
            setIsListening(false)
          },
        },
      ])
    } catch (error) {
      console.error("Speech input error:", error)
      setIsListening(false)
    }
  }

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isLoading && styles.disabled, isListening && styles.listening]}
        onPress={handleSpeechInput}
        disabled={isLoading}
      >
        <Text style={styles.buttonText}>{isListening ? "🎤 Đang lắng nghe..." : "🎤 Nói"}</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  button: {
    backgroundColor: "#FF6B9D",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FF6B9D",
  },
  disabled: {
    opacity: 0.5,
  },
  listening: {
    backgroundColor: "#FFD4E5",
    borderColor: "#FF6B9D",
  },
  buttonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FFF",
  },
})
