"use client"

import type React from "react"
import { createContext, useState, useContext } from "react"

export interface ConversationMessage {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

interface AIContextType {
  messages: ConversationMessage[]
  isLoading: boolean
  isSpeaking: boolean
  addMessage: (role: "user" | "assistant", content: string) => void
  clearMessages: () => void
  setLoading: (loading: boolean) => void
  setSpeaking: (speaking: boolean) => void
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export const AIProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [messages, setMessages] = useState<ConversationMessage[]>([
    {
      id: "welcome",
      role: "assistant",
      content: "Xin chào! 👋 Tôi là AI Tutor của bạn. Hôm nay chúng ta sẽ học tiếng Anh cùng nhau nhé!",
      timestamp: new Date(),
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [isSpeaking, setIsSpeaking] = useState(false)

  const addMessage = (role: "user" | "assistant", content: string) => {
    const newMessage: ConversationMessage = {
      id: Math.random().toString(),
      role,
      content,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, newMessage])
  }

  const clearMessages = () => {
    setMessages([
      {
        id: "welcome",
        role: "assistant",
        content: "Xin chào! 👋 Tôi là AI Tutor của bạn. Hôm nay chúng ta sẽ học tiếng Anh cùng nhau nhé!",
        timestamp: new Date(),
      },
    ])
  }

  return (
    <AIContext.Provider
      value={{
        messages,
        isLoading,
        isSpeaking,
        addMessage,
        clearMessages,
        setLoading: setIsLoading,
        setSpeaking: setIsSpeaking,
      }}
    >
      {children}
    </AIContext.Provider>
  )
}

export const useAI = () => {
  const context = useContext(AIContext)
  if (!context) {
    throw new Error("useAI must be used within AIProvider")
  }
  return context
}
