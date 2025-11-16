"use client"

import type React from "react"
import { View, Text, StyleSheet } from "react-native"

interface ConversationBubbleProps {
  message: string
  role: "user" | "assistant"
  timestamp: Date
}

export const ConversationBubble: React.FC<ConversationBubbleProps> = ({ message, role, timestamp }) => {
  const isUser = role === "user"
  const timeStr = timestamp.toLocaleTimeString("vi-VN", { hour: "2-digit", minute: "2-digit" })

  return (
    <View style={[styles.container, isUser && styles.userContainer]}>
      <View style={[styles.bubble, isUser ? styles.userBubble : styles.assistantBubble]}>
        <Text style={[styles.text, isUser && styles.userText]}>{message}</Text>
      </View>
      <Text style={styles.timestamp}>{timeStr}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    marginHorizontal: 16,
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  userContainer: {
    justifyContent: "flex-end",
  },
  bubble: {
    maxWidth: "75%",
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 16,
  },
  assistantBubble: {
    backgroundColor: "#E8D5FF",
    borderBottomLeftRadius: 4,
  },
  userBubble: {
    backgroundColor: "#FF6B9D",
    borderBottomRightRadius: 4,
  },
  text: {
    fontSize: 14,
    color: "#333",
  },
  userText: {
    color: "#FFF",
    fontWeight: "500",
  },
  timestamp: {
    fontSize: 12,
    color: "#999",
    marginTop: 4,
    marginHorizontal: 8,
  },
})
