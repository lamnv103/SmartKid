"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native"
import { useAuth } from "../context/AuthContext"

interface StudentHomeScreenProps {
  onNavigate: (screen: string, params?: any) => void
}

const CATEGORIES = [
  { id: "1", name: "Động vật", emoji: "🐾", color: "#FFB6D9" },
  { id: "2", name: "Trái cây", emoji: "🍎", color: "#FFD93D" },
  { id: "3", name: "Phương tiện", emoji: "🚗", color: "#6BCB77" },
  { id: "4", name: "Màu sắc", emoji: "🌈", color: "#4D96FF" },
]

const LEVELS = [
  { id: "easy", name: "Dễ", emoji: "⭐", color: "#FFE5F0" },
  { id: "medium", name: "Trung bình", emoji: "⭐⭐", color: "#FFD4E5" },
  { id: "hard", name: "Khó", emoji: "⭐⭐⭐", color: "#FFC2D1" },
]

export const StudentHomeScreen: React.FC<StudentHomeScreenProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth()
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

  const handleStartGame = (level: string) => {
    if (selectedCategory) {
      onNavigate("Game", { category: selectedCategory, level })
      setSelectedCategory(null)
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Xin chào, {user?.name}! 👋</Text>
          <Text style={styles.subGreeting}>Hôm nay bạn muốn học gì?</Text>
        </View>
        <TouchableOpacity
          style={styles.logoutButton}
          onPress={() => {
            logout()
            onNavigate("Login")
          }}
        >
          <Text style={styles.logoutText}>Đăng xuất</Text>
        </TouchableOpacity>
      </View>

      {selectedCategory === null ? (
        <>
          <Text style={styles.sectionTitle}>Chọn chủ đề học</Text>
          <TouchableOpacity
            style={[styles.categoryCard, { backgroundColor: "#C9B1FF" }]}
            onPress={() => onNavigate("AITutor")}
          >
            <Text style={styles.categoryEmoji}>🤖</Text>
            <Text style={styles.categoryName}>AI Tutor</Text>
          </TouchableOpacity>

          <FlatList
            data={CATEGORIES}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.categoryCard, { backgroundColor: item.color }]}
                onPress={() => setSelectedCategory(item.id)}
              >
                <Text style={styles.categoryEmoji}>{item.emoji}</Text>
                <Text style={styles.categoryName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      ) : (
        <>
          <TouchableOpacity style={styles.backButton} onPress={() => setSelectedCategory(null)}>
            <Text style={styles.backButtonText}>← Quay lại</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Chọn độ khó</Text>
          <FlatList
            data={LEVELS}
            keyExtractor={(item) => item.id}
            scrollEnabled={false}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[styles.levelCard, { backgroundColor: item.color }]}
                onPress={() => handleStartGame(item.id)}
              >
                <Text style={styles.levelEmoji}>{item.emoji}</Text>
                <Text style={styles.levelName}>{item.name}</Text>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 40,
    paddingBottom: 30,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  greeting: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  subGreeting: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  logoutButton: {
    backgroundColor: "#FF6B9D",
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 8,
  },
  logoutText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    paddingHorizontal: 20,
    marginBottom: 16,
  },
  categoryCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    paddingVertical: 24,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  categoryEmoji: {
    fontSize: 48,
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  backButton: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingVertical: 10,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B9D",
  },
  levelCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    paddingVertical: 20,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  levelEmoji: {
    fontSize: 32,
    marginBottom: 8,
  },
  levelName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
})
