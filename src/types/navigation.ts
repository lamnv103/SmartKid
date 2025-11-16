export type Screen = "Login" | "StudentHome" | "Game" | "ParentDashboard" | "Signup";

export interface NavigationParams {
  category?: string;
  level?: string;
  score?: number;
  moves?: number;
  // ✅ thêm accuracy nhưng để optional (không bắt buộc)
  [key: string]: any; // 👈 dòng này đảm bảo không lỗi khi có thêm thuộc tính khác
}

export type NavigateFunction = (screen: Screen, navigationParams?: NavigationParams) => void;
