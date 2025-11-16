"use client"

import type React from "react"
import { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, ActivityIndicator } from "react-native"
import { useAuth } from "../context/AuthContext"
import type { NavigateFunction } from "../types/navigation";

type Screen = "Login" | "StudentHome" | "Game" | "ParentDashboard" | "Signup"

interface NavigationParams {
  category?: string
  level?: string
  score?: number
  moves?: number
}

interface LoginScreenProps {
  onNavigate: NavigateFunction;
}


export const LoginScreen: React.FC<LoginScreenProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [role, setRole] = useState<"parent" | "student">("student")
  const [isSignup, setIsSignup] = useState(false)
  const [name, setName] = useState("")
  const [age, setAge] = useState("")
  const { login, signup, isLoading, error, clearError } = useAuth()

  const handleLogin = async () => {
    clearError()
    try {
      await login(email, password, role)
      onNavigate(role === "parent" ? "ParentDashboard" : "StudentHome")
    } catch (err) {
      // Error is already set in context
    }
  }

  const handleSignup = async () => {
    clearError()
    try {
      const ageNum = age ? Number.parseInt(age) : undefined
      await signup(name, email, password, role, ageNum)
      onNavigate(role === "parent" ? "ParentDashboard" : "StudentHome")
    } catch (err) {
      // Error is already set in context
    }
  }

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>SmartKid</Text>
        <Text style={styles.subtitle}>Học vừa vui vừa hiệu quả</Text>
      </View>

      {error && (
        <View style={styles.errorContainer}>
          <Text style={styles.errorText}>{error}</Text>
        </View>
      )}

      <View style={styles.roleSelector}>
        <TouchableOpacity
          style={[styles.roleButton, role === "student" && styles.roleButtonActive]}
          onPress={() => setRole("student")}
        >
          <Text style={[styles.roleButtonText, role === "student" && styles.roleButtonTextActive]}>👧 Học sinh</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[styles.roleButton, role === "parent" && styles.roleButtonActive]}
          onPress={() => setRole("parent")}
        >
          <Text style={[styles.roleButtonText, role === "parent" && styles.roleButtonTextActive]}>
            👨‍👩‍👧 Phụ huynh
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        {isSignup && (
          <>
            <Text style={styles.label}>Tên</Text>
            <TextInput
              style={styles.input}
              placeholder="Nhập tên"
              value={name}
              onChangeText={setName}
              placeholderTextColor="#999"
              editable={!isLoading}
            />

            {role === "student" && (
              <>
                <Text style={styles.label}>Tuổi</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Nhập tuổi (3-12)"
                  value={age}
                  onChangeText={setAge}
                  keyboardType="number-pad"
                  placeholderTextColor="#999"
                  editable={!isLoading}
                />
              </>
            )}
          </>
        )}

        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          placeholderTextColor="#999"
          editable={!isLoading}
        />

        <Text style={styles.label}>Mật khẩu</Text>
        <TextInput
          style={styles.input}
          placeholder="Nhập mật khẩu (tối thiểu 6 ký tự)"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          placeholderTextColor="#999"
          editable={!isLoading}
        />

        <TouchableOpacity
          style={[styles.loginButton, isLoading && styles.loginButtonDisabled]}
          onPress={isSignup ? handleSignup : handleLogin}
          disabled={isLoading}
        >
          {isLoading ? (
            <ActivityIndicator color="#FFF" />
          ) : (
            <Text style={styles.loginButtonText}>{isSignup ? "Đăng ký" : "Đăng nhập"}</Text>
          )}
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setIsSignup(!isSignup)}>
          <Text style={styles.signupLink}>
            {isSignup ? "Đã có tài khoản? Đăng nhập" : "Chưa có tài khoản? Đăng ký ngay"}
          </Text>
        </TouchableOpacity>

        {!isSignup && (
          <View style={styles.demoContainer}>
            <Text style={styles.demoTitle}>Demo Credentials:</Text>
            <Text style={styles.demoText}>Student: hoa@smartkid.com / password123</Text>
            <Text style={styles.demoText}>Parent: parent@smartkid.com / password123</Text>
          </View>
        )}
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    alignItems: "center",
  },
  title: {
    fontSize: 48,
    fontWeight: "bold",
    color: "#FF6B9D",
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
  },
  errorContainer: {
    marginHorizontal: 20,
    marginBottom: 16,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: "#FFE5E5",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#FF6B6B",
  },
  errorText: {
    color: "#C92A2A",
    fontSize: 14,
    fontWeight: "500",
  },
  roleSelector: {
    flexDirection: "row",
    paddingHorizontal: 20,
    marginBottom: 30,
    gap: 12,
  },
  roleButton: {
    flex: 1,
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 12,
    backgroundColor: "#F0F0F0",
    alignItems: "center",
    borderWidth: 2,
    borderColor: "transparent",
  },
  roleButtonActive: {
    backgroundColor: "#FFE5F0",
    borderColor: "#FF6B9D",
  },
  roleButtonText: {
    fontSize: 14,
    fontWeight: "600",
    color: "#666",
  },
  roleButtonTextActive: {
    color: "#FF6B9D",
  },
  form: {
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  label: {
    fontSize: 14,
    fontWeight: "600",
    color: "#333",
    marginBottom: 8,
  },
  input: {
    borderWidth: 2,
    borderColor: "#FFD4E5",
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 20,
    fontSize: 16,
    backgroundColor: "#FFF",
  },
  loginButton: {
    backgroundColor: "#FF6B9D",
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 10,
  },
  loginButtonDisabled: {
    opacity: 0.6,
  },
  loginButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  signupLink: {
    color: "#FF6B9D",
    fontSize: 14,
    textAlign: "center",
    marginTop: 20,
    fontWeight: "600",
  },
  demoContainer: {
    marginTop: 24,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: "#F0F8FF",
    borderRadius: 8,
    borderLeftWidth: 4,
    borderLeftColor: "#4D96FF",
  },
  demoTitle: {
    fontSize: 12,
    fontWeight: "600",
    color: "#333",
    marginBottom: 6,
  },
  demoText: {
    fontSize: 12,
    color: "#666",
    marginBottom: 4,
    fontFamily: "monospace",
  },
})
