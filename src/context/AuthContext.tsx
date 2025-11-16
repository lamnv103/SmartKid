"use client"

import type React from "react"
import { createContext, useState, useContext, useEffect } from "react"
import type { User } from "../types"

interface AuthContextType {
  user: User | null
  isLoading: boolean
  error: string | null
  login: (email: string, password: string, role: "parent" | "student") => Promise<void>
  logout: () => void
  signup: (name: string, email: string, password: string, role: "parent" | "student", age?: number) => Promise<void>
  clearError: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

// Mock user database for demonstration
const MOCK_USERS: User[] = [
  {
    id: "1",
    name: "Bé Hoa",
    email: "hoa@smartkid.com",
    role: "student",
    password: "password123",
    age: 5,
  },
  {
    id: "2",
    name: "Phụ huynh Hoa",
    email: "parent@smartkid.com",
    role: "parent",
    password: "password123",
  },
]

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    // In a real app, you would restore the session from AsyncStorage or secure storage
    // For now, this is a placeholder for future implementation
    const restoreSession = async () => {
      // Simulate checking for existing session
      // const savedUser = await AsyncStorage.getItem('user');
      // if (savedUser) setUser(JSON.parse(savedUser));
    }
    restoreSession()
  }, [])

  const validateEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return emailRegex.test(email)
  }

  const validatePassword = (password: string): boolean => {
    return password.length >= 6
  }

  const login = async (email: string, password: string, role: "parent" | "student") => {
    setIsLoading(true)
    setError(null)

    try {
      if (!email || !password) {
        throw new Error("Email và mật khẩu không được để trống")
      }

      if (!validateEmail(email)) {
        throw new Error("Email không hợp lệ")
      }

      if (!validatePassword(password)) {
        throw new Error("Mật khẩu phải có ít nhất 6 ký tự")
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const foundUser = MOCK_USERS.find((u) => u.email === email && u.password === password && u.role === role)

      if (!foundUser) {
        throw new Error("Email hoặc mật khẩu không đúng")
      }

      setUser(foundUser)
      // In a real app, save token to secure storage
      // await AsyncStorage.setItem('user', JSON.stringify(foundUser));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Đăng nhập thất bại"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const logout = () => {
    setUser(null)
    setError(null)
    // In a real app, clear secure storage
    // await AsyncStorage.removeItem('user');
  }

  const signup = async (name: string, email: string, password: string, role: "parent" | "student", age?: number) => {
    setIsLoading(true)
    setError(null)

    try {
      if (!name || !email || !password) {
        throw new Error("Vui lòng điền đầy đủ thông tin")
      }

      if (!validateEmail(email)) {
        throw new Error("Email không hợp lệ")
      }

      if (!validatePassword(password)) {
        throw new Error("Mật khẩu phải có ít nhất 6 ký tự")
      }

      if (role === "student" && (!age || age < 3 || age > 12)) {
        throw new Error("Tuổi học sinh phải từ 3 đến 12 tuổi")
      }

      // Check if email already exists
      if (MOCK_USERS.some((u) => u.email === email)) {
        throw new Error("Email này đã được đăng ký")
      }

      // Simulate API call delay
      await new Promise((resolve) => setTimeout(resolve, 500))

      const newUser: User = {
        id: Math.random().toString(),
        name,
        email,
        role,
        password,
        age: role === "student" ? age : undefined,
      }

      // Add to mock database
      MOCK_USERS.push(newUser)
      setUser(newUser)
      // In a real app, save token to secure storage
      // await AsyncStorage.setItem('user', JSON.stringify(newUser));
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Đăng ký thất bại"
      setError(errorMessage)
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  const clearError = () => {
    setError(null)
  }

  return (
    <AuthContext.Provider value={{ user, isLoading, error, login, logout, signup, clearError }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider")
  }
  return context
}
