"use client"
// Dòng 3: Import các loại từ "react"
import type React from "react"
// Dòng 4: Giữ lại các Component và API của React Native
import { View, Text, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, TextInput } from "react-native"
// Dòng 5: Sửa lỗi: Import Hook (useRef) từ "react"
import { useState, useEffect, useRef } from "react" // Bạn chỉ cần thêm useRef vào đây
import { useAI } from "../context/AIContext"
import { useAuth } from "../context/AuthContext"
import { LottieAnimation } from "../components/LottieAnimation"
import { ConversationBubble } from "../components/ConversationBubble"
import { SpeechInputButton } from "../components/SpeechInputButton"

interface AITutorScreenProps {
  onNavigate: (screen: string) => void
}

export const AITutorScreen: React.FC<AITutorScreenProps> = ({ onNavigate }) => {
  const { user } = useAuth()
  const { messages, isLoading, isSpeaking, addMessage, setLoading, setSpeaking, clearMessages } = useAI()
  const [textInput, setTextInput] = useState("")
  const [conversationContext, setConversationContext] = useState<string>("")
  const scrollViewRef = useRef<ScrollView>(null)

  useEffect(() => {
    const context = `You are a friendly English tutor for a ${user?.age || 8}-year-old student named ${user?.name || "Student"}. 
    Use simple Vietnamese and English words. Be encouraging and playful. Keep responses short (1-2 sentences max). 
    Use emojis to make learning fun. Focus on teaching basic English vocabulary and simple conversations.`
    setConversationContext(context)
  }, [user])

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true })
  }, [messages])

  const handleSendMessage = async (messageText: string) => {
    if (!messageText.trim()) return

    // Add user message to conversation
    addMessage("user", messageText)
    setTextInput("")
    setLoading(true)
    setSpeaking(true)

    try {
      const response = await fetch("/api/ai-tutor", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: messageText,
          context: conversationContext,
          conversationHistory: messages,
          studentName: user?.name,
          studentAge: user?.age,
        }),
      })

      if (!response.ok) throw new Error("AI response failed")

      const data = await response.json()
      addMessage("assistant", data.response)

      // The response is automatically "spoken" by showing the message
      setTimeout(() => setSpeaking(false), 2000)
    } catch (error) {
      console.error("AI tutor error:", error)
      addMessage("assistant", "Xin lỗi, tôi gặp lỗi. Hãy thử lại nhé! 😊")
      setSpeaking(false)
    } finally {
      setLoading(false)
    }
  }

  const handleSpeechInput = (text: string) => {
    setTextInput(text)
    handleSendMessage(text)
  }

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => onNavigate("StudentHome")} style={styles.backButton}>
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <Text style={styles.title}>AI Tutor 🤖</Text>
        <TouchableOpacity
          onPress={() => {
            clearMessages()
          }}
          style={styles.refreshButton}
        >
          <Text style={styles.refreshText}>🔄</Text>
        </TouchableOpacity>
      </View>

      {/* AI Character Animation */}
      <LottieAnimation isAnimating={isLoading} isSpeaking={isSpeaking} />

      {/* Conversation Display */}
      <ScrollView style={styles.conversationContainer} showsVerticalScrollIndicator={false} ref={scrollViewRef}>
        {messages.map((msg) => (
          <ConversationBubble key={msg.id} message={msg.content} role={msg.role} timestamp={msg.timestamp} />
        ))}
        {isLoading && (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#FF6B9D" />
            <Text style={styles.loadingText}>Tutor đang suy nghĩ...</Text>
          </View>
        )}
      </ScrollView>

      {/* Input Area */}
      <View style={styles.inputArea}>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            placeholder="Viết câu hỏi hoặc câu trả lời..."
            placeholderTextColor="#999"
            value={textInput}
            onChangeText={setTextInput}
            editable={!isLoading}
            multiline
          />
          <TouchableOpacity
            style={[styles.sendButton, isLoading && styles.sendButtonDisabled]}
            onPress={() => handleSendMessage(textInput)}
            disabled={isLoading || !textInput.trim()}
          >
            <Text style={styles.sendButtonText}>📤</Text>
          </TouchableOpacity>
        </View>

        {/* Speech Input Button */}
        <SpeechInputButton onSpeechDetected={handleSpeechInput} isLoading={isLoading} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#FFE5F0",
  },
  backButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  backButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#FF6B9D",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  refreshButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  refreshText: {
    fontSize: 16,
  },
  conversationContainer: {
    flex: 1,
    paddingVertical: 12,
  },
  loadingContainer: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 20,
  },
  loadingText: {
    marginTop: 8,
    fontSize: 14,
    color: "#FF6B9D",
    fontWeight: "500",
  },
  inputArea: {
    paddingVertical: 12,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#FFE5F0",
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "flex-end",
    paddingHorizontal: 12,
    gap: 8,
  },
  textInput: {
    flex: 1,
    backgroundColor: "#FFE5F0",
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    maxHeight: 80,
  },
  sendButton: {
    backgroundColor: "#FF6B9D",
    width: 44,
    height: 44,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },
  sendButtonDisabled: {
    opacity: 0.5,
  },
  sendButtonText: {
    fontSize: 20,
  },
})
