export interface User {
  id: string
  name: string
  email: string
  role: "parent" | "student"
  password: string
  age?: number
}

export interface StudentProfile {
  id: string
  name: string
  age: number
  level: "easy" | "medium" | "hard"
  totalPoints: number
  gamesPlayed: number
  lastPlayedDate: string
}

export interface GameCard {
  id: string
  vietnameseName: string
  englishName: string
  image: string
  category: string
  pronunciation: string
}

export interface GameSession {
  id: string
  studentId: string
  category: string
  level: "easy" | "medium" | "hard"
  score: number
  correctAnswers: number
  totalCards: number
  duration: number
  date: string
}

export interface ParentStats {
  studentId: string
  studentName: string
  totalPoints: number
  gamesPlayed: number
  averageScore: number
  favoriteCategory: string
  playTimeLimit: number
  playTimeUsed: number
}
