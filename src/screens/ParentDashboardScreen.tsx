"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, FlatList } from "react-native"
import { useAuth } from "../context/AuthContext"
import type { NavigateFunction } from "../types/navigation";

interface ParentDashboardScreenProps {
  onNavigate: NavigateFunction;
}
interface StudentData {
  id: string
  name: string
  age: number
  totalPoints: number
  gamesPlayed: number
  averageScore: number
  favoriteCategory: string
  playTimeLimit: number
  playTimeUsed: number
  weeklyProgress: number[]
  categoryStats: { [key: string]: { played: number; avgScore: number } }
  achievements: string[]
  lastPlayedDate: string
}

const MOCK_STUDENTS: StudentData[] = [
  {
    id: "1",
    name: "Bé Hoa",
    age: 5,
    totalPoints: 450,
    gamesPlayed: 12,
    averageScore: 85,
    favoriteCategory: "Động vật",
    playTimeLimit: 60,
    playTimeUsed: 35,
    weeklyProgress: [60, 75, 80, 85, 82, 88, 85],
    categoryStats: {
      animals: { played: 5, avgScore: 88 },
      fruits: { played: 4, avgScore: 82 },
      vehicles: { played: 2, avgScore: 78 },
      colors: { played: 1, avgScore: 85 },
    },
    achievements: ["first-game", "5-games", "high-score"],
    lastPlayedDate: "2025-10-24",
  },
  {
    id: "2",
    name: "Bé Minh",
    age: 7,
    totalPoints: 680,
    gamesPlayed: 18,
    averageScore: 92,
    favoriteCategory: "Trái cây",
    playTimeLimit: 90,
    playTimeUsed: 45,
    weeklyProgress: [70, 80, 85, 90, 88, 92, 95],
    categoryStats: {
      animals: { played: 6, avgScore: 90 },
      fruits: { played: 7, avgScore: 94 },
      vehicles: { played: 3, avgScore: 88 },
      colors: { played: 2, avgScore: 92 },
    },
    achievements: ["first-game", "5-games", "10-games", "high-score", "perfect-week"],
    lastPlayedDate: "2025-10-24",
  },
]

const ACHIEVEMENT_BADGES: { [key: string]: { emoji: string; name: string; description: string } } = {
  "first-game": { emoji: "🎮", name: "Bắt đầu", description: "Chơi trò chơi đầu tiên" },
  "5-games": { emoji: "⭐", name: "Năm trò chơi", description: "Chơi 5 trò chơi" },
  "10-games": { emoji: "🌟", name: "Mười trò chơi", description: "Chơi 10 trò chơi" },
  "high-score": { emoji: "🏆", name: "Điểm cao", description: "Đạt điểm cao" },
  "perfect-week": { emoji: "🔥", name: "Tuần hoàn hảo", description: "Chơi mỗi ngày trong tuần" },
}

export const ParentDashboardScreen: React.FC<ParentDashboardScreenProps> = ({ onNavigate }) => {
  const { user, logout } = useAuth()
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"overview" | "detailed">("overview")

  const currentStudent = MOCK_STUDENTS.find((s) => s.id === selectedStudent)

  const calculateInsights = (student: StudentData) => {
    const avgWeeklyScore = Math.round(student.weeklyProgress.reduce((a, b) => a + b, 0) / student.weeklyProgress.length)
    const trend = student.weeklyProgress[6] - student.weeklyProgress[0]
    const bestCategory = Object.entries(student.categoryStats).sort(([, a], [, b]) => b.avgScore - a.avgScore)[0]

    return { avgWeeklyScore, trend, bestCategory }
  }

  const renderCategoryChart = (stats: { [key: string]: { played: number; avgScore: number } }) => {
    return Object.entries(stats).map(([category, data]) => (
      <View key={category} style={styles.categoryChartItem}>
        <View style={styles.categoryChartHeader}>
          <Text style={styles.categoryChartLabel}>{category}</Text>
          <Text style={styles.categoryChartScore}>{data.avgScore}%</Text>
        </View>
        <View style={styles.categoryChartBar}>
          <View style={[styles.categoryChartFill, { width: `${data.avgScore}%` }]} />
        </View>
        <Text style={styles.categoryChartPlayed}>{data.played} trò chơi</Text>
      </View>
    ))
  }

  const renderAchievements = (achievements: string[]) => {
    return (
      <View style={styles.achievementsContainer}>
        <Text style={styles.achievementsTitle}>Huy hiệu đạt được</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievementId) => {
            const badge = ACHIEVEMENT_BADGES[achievementId]
            return (
              <View key={achievementId} style={styles.achievementBadge}>
                <Text style={styles.achievementEmoji}>{badge.emoji}</Text>
                <Text style={styles.achievementName}>{badge.name}</Text>
              </View>
            )
          })}
        </View>
      </View>
    )
  }

  if (selectedStudent === null) {
    return (
      <ScrollView style={styles.container}>
        <View style={styles.header}>
          <View>
            <Text style={styles.greeting}>Xin chào, {user?.name}!</Text>
            <Text style={styles.subGreeting}>Theo dõi tiến trình con em</Text>
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

        <Text style={styles.sectionTitle}>Chọn con em</Text>
        <FlatList
          data={MOCK_STUDENTS}
          keyExtractor={(item) => item.id}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <TouchableOpacity style={styles.studentCard} onPress={() => setSelectedStudent(item.id)}>
              <View style={styles.studentCardContent}>
                <Text style={styles.studentName}>{item.name}</Text>
                <Text style={styles.studentAge}>Tuổi: {item.age}</Text>
                <Text style={styles.studentLastPlayed}>Lần cuối: {item.lastPlayedDate}</Text>
              </View>
              <View style={styles.studentStats}>
                <View style={styles.studentStatItem}>
                  <Text style={styles.statValue}>{item.totalPoints}</Text>
                  <Text style={styles.statLabel}>Điểm</Text>
                </View>
                <View style={styles.studentStatItem}>
                  <Text style={styles.statValue}>{item.gamesPlayed}</Text>
                  <Text style={styles.statLabel}>Trò chơi</Text>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
    )
  }

  if (!currentStudent) return null

  const insights = calculateInsights(currentStudent)

  return (
    <ScrollView style={styles.container}>
      <View style={styles.detailHeader}>
        <TouchableOpacity style={styles.backButton} onPress={() => setSelectedStudent(null)}>
          <Text style={styles.backButtonText}>← Quay lại</Text>
        </TouchableOpacity>
        <View>
          <Text style={styles.studentDetailName}>{currentStudent.name}</Text>
          <Text style={styles.studentDetailAge}>Tuổi: {currentStudent.age}</Text>
        </View>
      </View>

      <View style={styles.viewModeToggle}>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === "overview" && styles.viewModeButtonActive]}
          onPress={() => setViewMode("overview")}
        >
          <Text style={[styles.viewModeButtonText, viewMode === "overview" && styles.viewModeButtonTextActive]}>
            Tổng quan
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.viewModeButton, viewMode === "detailed" && styles.viewModeButtonActive]}
          onPress={() => setViewMode("detailed")}
        >
          <Text style={[styles.viewModeButtonText, viewMode === "detailed" && styles.viewModeButtonTextActive]}>
            Chi tiết
          </Text>
        </TouchableOpacity>
      </View>

      {viewMode === "overview" ? (
        <>
          <View style={styles.statsGrid}>
            <View style={styles.statBox}>
              <Text style={styles.statBoxValue}>{currentStudent.totalPoints}</Text>
              <Text style={styles.statBoxLabel}>Tổng điểm</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statBoxValue}>{currentStudent.gamesPlayed}</Text>
              <Text style={styles.statBoxLabel}>Trò chơi</Text>
            </View>
            <View style={styles.statBox}>
              <Text style={styles.statBoxValue}>{currentStudent.averageScore}%</Text>
              <Text style={styles.statBoxLabel}>Trung bình</Text>
            </View>
          </View>

          <View style={styles.insightsContainer}>
            <Text style={styles.insightsTitle}>Thống kê tuần này</Text>
            <View style={styles.insightItem}>
              <Text style={styles.insightLabel}>Điểm trung bình:</Text>
              <Text style={styles.insightValue}>{insights.avgWeeklyScore}%</Text>
            </View>
            <View style={styles.insightItem}>
              <Text style={styles.insightLabel}>Xu hướng:</Text>
              <Text style={[styles.insightValue, insights.trend > 0 ? styles.trendPositive : styles.trendNegative]}>
                {insights.trend > 0 ? "↑" : "↓"} {Math.abs(insights.trend)} điểm
              </Text>
            </View>
            {insights.bestCategory && (
              <View style={styles.insightItem}>
                <Text style={styles.insightLabel}>Chủ đề tốt nhất:</Text>
                <Text style={styles.insightValue}>{insights.bestCategory[0]}</Text>
              </View>
            )}
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Chủ đề yêu thích</Text>
            <Text style={styles.infoValue}>{currentStudent.favoriteCategory}</Text>
          </View>

          <View style={styles.infoSection}>
            <Text style={styles.infoTitle}>Thời gian chơi hôm nay</Text>
            <View style={styles.progressBar}>
              <View
                style={[
                  styles.progressFill,
                  { width: `${(currentStudent.playTimeUsed / currentStudent.playTimeLimit) * 100}%` },
                ]}
              />
            </View>
            <Text style={styles.progressText}>
              {currentStudent.playTimeUsed} / {currentStudent.playTimeLimit} phút
            </Text>
          </View>

          {renderAchievements(currentStudent.achievements)}
        </>
      ) : (
        <>
          <View style={styles.detailedSection}>
            <Text style={styles.detailedTitle}>Hiệu suất theo chủ đề</Text>
            {renderCategoryChart(currentStudent.categoryStats)}
          </View>

          <View style={styles.detailedSection}>
            <Text style={styles.detailedTitle}>Tiến trình hàng tuần</Text>
            <View style={styles.weeklyChartContainer}>
              {currentStudent.weeklyProgress.map((score, index) => (
                <View key={index} style={styles.weeklyChartBar}>
                  <View style={[styles.weeklyChartFill, { height: `${(score / 100) * 100}%` }]} />
                  <Text style={styles.weeklyChartLabel}>T{index + 1}</Text>
                </View>
              ))}
            </View>
          </View>

          <View style={styles.detailedSection}>
            <Text style={styles.detailedTitle}>Thống kê chi tiết</Text>
            <View style={styles.detailedStatItem}>
              <Text style={styles.detailedStatLabel}>Tổng điểm:</Text>
              <Text style={styles.detailedStatValue}>{currentStudent.totalPoints}</Text>
            </View>
            <View style={styles.detailedStatItem}>
              <Text style={styles.detailedStatLabel}>Trò chơi đã chơi:</Text>
              <Text style={styles.detailedStatValue}>{currentStudent.gamesPlayed}</Text>
            </View>
            <View style={styles.detailedStatItem}>
              <Text style={styles.detailedStatLabel}>Điểm trung bình:</Text>
              <Text style={styles.detailedStatValue}>{currentStudent.averageScore}%</Text>
            </View>
            <View style={styles.detailedStatItem}>
              <Text style={styles.detailedStatLabel}>Huy hiệu:</Text>
              <Text style={styles.detailedStatValue}>{currentStudent.achievements.length}</Text>
            </View>
          </View>

          {renderAchievements(currentStudent.achievements)}
        </>
      )}

      <TouchableOpacity style={styles.settingsButton}>
        <Text style={styles.settingsButtonText}>⚙️ Cài đặt giới hạn thời gian</Text>
      </TouchableOpacity>
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
  studentCard: {
    marginHorizontal: 20,
    marginBottom: 12,
    paddingVertical: 16,
    paddingHorizontal: 16,
    backgroundColor: "#FFE5F0",
    borderRadius: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFD4E5",
  },
  studentCardContent: {
    flex: 1,
  },
  studentName: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  studentAge: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  studentLastPlayed: {
    fontSize: 11,
    color: "#999",
    marginTop: 2,
  },
  studentStats: {
    flexDirection: "row",
    gap: 12,
  },
  studentStatItem: {
    alignItems: "center",
  },
  statValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B9D",
  },
  statLabel: {
    fontSize: 11,
    color: "#666",
  },
  detailHeader: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 16,
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
  },
  backButton: {
    paddingVertical: 8,
  },
  backButtonText: {
    fontSize: 16,
    fontWeight: "600",
    color: "#FF6B9D",
  },
  studentDetailName: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  studentDetailAge: {
    fontSize: 14,
    color: "#666",
    marginTop: 4,
  },
  viewModeToggle: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 8,
  },
  viewModeButton: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 12,
    borderRadius: 8,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  viewModeButtonActive: {
    backgroundColor: "#FFE5F0",
    borderColor: "#FF6B9D",
  },
  viewModeButtonText: {
    fontSize: 13,
    fontWeight: "600",
    color: "#666",
  },
  viewModeButtonTextActive: {
    color: "#FF6B9D",
  },
  statsGrid: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 12,
  },
  statBox: {
    flex: 1,
    backgroundColor: "#FFD4E5",
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  statBoxValue: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#FF6B9D",
  },
  statBoxLabel: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
  insightsContainer: {
    marginHorizontal: 20,
    marginBottom: 20,
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: "#F0F8FF",
    borderRadius: 12,
    borderLeftWidth: 4,
    borderLeftColor: "#4D96FF",
  },
  insightsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 10,
  },
  insightItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  insightLabel: {
    fontSize: 13,
    color: "#666",
  },
  insightValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#333",
  },
  trendPositive: {
    color: "#6BCB77",
  },
  trendNegative: {
    color: "#FF6B6B",
  },
  infoSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  infoTitle: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#FF6B9D",
  },
  progressBar: {
    height: 8,
    backgroundColor: "#FFE5F0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 8,
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#FF6B9D",
  },
  progressText: {
    fontSize: 12,
    color: "#666",
  },
  achievementsContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  achievementsTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  achievementsGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
  },
  achievementBadge: {
    width: "30%",
    backgroundColor: "#FFE5F0",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    borderWidth: 2,
    borderColor: "#FFD4E5",
  },
  achievementEmoji: {
    fontSize: 28,
    marginBottom: 4,
  },
  achievementName: {
    fontSize: 11,
    fontWeight: "600",
    color: "#333",
    textAlign: "center",
  },
  detailedSection: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  detailedTitle: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
  },
  categoryChartItem: {
    marginBottom: 16,
  },
  categoryChartHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
  },
  categoryChartLabel: {
    fontSize: 13,
    fontWeight: "600",
    color: "#333",
    textTransform: "capitalize",
  },
  categoryChartScore: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FF6B9D",
  },
  categoryChartBar: {
    height: 8,
    backgroundColor: "#FFE5F0",
    borderRadius: 4,
    overflow: "hidden",
    marginBottom: 4,
  },
  categoryChartFill: {
    height: "100%",
    backgroundColor: "#FF6B9D",
  },
  categoryChartPlayed: {
    fontSize: 11,
    color: "#999",
  },
  weeklyChartContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "flex-end",
    height: 120,
    backgroundColor: "#FFE5F0",
    borderRadius: 12,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  weeklyChartBar: {
    alignItems: "center",
    flex: 1,
  },
  weeklyChartFill: {
    width: 24,
    backgroundColor: "#FF6B9D",
    borderRadius: 4,
    marginBottom: 4,
  },
  weeklyChartLabel: {
    fontSize: 11,
    fontWeight: "600",
    color: "#666",
  },
  detailedStatItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#FFD4E5",
  },
  detailedStatLabel: {
    fontSize: 13,
    color: "#666",
  },
  detailedStatValue: {
    fontSize: 13,
    fontWeight: "bold",
    color: "#FF6B9D",
  },
  settingsButton: {
    marginHorizontal: 20,
    marginBottom: 30,
    paddingVertical: 12,
    backgroundColor: "#FF6B9D",
    borderRadius: 12,
    alignItems: "center",
  },
  settingsButtonText: {
    color: "#FFF",
    fontSize: 14,
    fontWeight: "600",
  },
})
