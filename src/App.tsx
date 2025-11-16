// import React, { useState, useEffect } from "react";
// import { SafeAreaView, StyleSheet, Text, View } from "react-native";
// import { AuthProvider } from "./context/AuthContext";
// import { GameProvider } from "./context/GameContext";
// import { LoginScreen } from "./screens/LoginScreen";
// import { StudentHomeScreen } from "./screens/StudentHomeScreen";
// import { GameScreen } from "./screens/GameScreen";
// import { ParentDashboardScreen } from "./screens/ParentDashboardScreen";
// import type { Screen, NavigationParams, NavigateFunction } from "./types/navigation";

// export default function App() {
//   const [currentScreen, setCurrentScreen] = useState<Screen | "Splash">("Splash");
//   const [params, setParams] = useState<NavigationParams>({});

//   const handleNavigate: NavigateFunction = (screen, navigationParams) => {
//     setCurrentScreen(screen);
//     if (navigationParams) setParams(navigationParams);
//   };

//   useEffect(() => {
//     if (currentScreen === "Splash") {
//       setTimeout(() => setCurrentScreen("Login"), 2000);
//     }
//   }, [currentScreen]);

//   return (
//     <SafeAreaView style={styles.container}>
//       <AuthProvider>
//         <GameProvider>
//           {currentScreen === "Splash" && (
//             <View style={styles.container}>
//               <Text style={{ fontSize: 18, fontWeight: "bold" }}>Welcome to SmartKid App 👶✨</Text>
//             </View>
//           )}
//           {currentScreen === "Login" && <LoginScreen onNavigate={handleNavigate} />}
//           {currentScreen === "StudentHome" && <StudentHomeScreen onNavigate={handleNavigate} />}
//           {currentScreen === "Game" && (
//             <GameScreen
//               category={params.category || "animals"}
//               level={params.level || "easy"}
//               onNavigate={handleNavigate}
//             />
//           )}
//           {currentScreen === "ParentDashboard" && (
//             <ParentDashboardScreen onNavigate={handleNavigate} />
//           )}
//         </GameProvider>
//       </AuthProvider>
//     </SafeAreaView>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#FFF5F7",
//     justifyContent: "center",
//     alignItems: "center",
//   },
// });
"use client"

import { AuthProvider } from "./context/AuthContext"
import { useState } from "react"
import { View, StyleSheet } from "react-native"
import { SafeAreaProvider } from "react-native-safe-area-context"
import { GameProvider } from "./context/GameContext"
import { AIProvider } from "./context/AIContext"

import { LoginScreen } from "./screens/LoginScreen"
import { StudentHomeScreen } from "./screens/StudentHomeScreen"
import { GameScreen } from "./screens/GameScreen"
import { ParentDashboardScreen } from "./screens/ParentDashboardScreen"
import { AITutorScreen } from "./screens/AITutorScreen"

type Screen = "Login" | "StudentHome" | "Game" | "ParentDashboard" | "Signup" | "AITutor"

interface NavigationParams {
  category?: string
  level?: string
  score?: number
  moves?: number
}

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<Screen>("Login")
  const [params, setParams] = useState<NavigationParams>({})

  const handleNavigate = (screen: Screen, navigationParams?: NavigationParams) => {
    setCurrentScreen(screen)
    if (navigationParams) setParams(navigationParams)
  }

  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        <AuthProvider>
          <GameProvider>
            <AIProvider>
              {currentScreen === "Login" && <LoginScreen onNavigate={handleNavigate} />}
              {currentScreen === "StudentHome" && <StudentHomeScreen onNavigate={handleNavigate} />}
              {currentScreen === "Game" && (
                <GameScreen
                  category={params.category || "animals"}
                  level={params.level || "easy"}
                  onNavigate={handleNavigate}
                />
              )}
              {currentScreen === "ParentDashboard" && (
                <ParentDashboardScreen onNavigate={handleNavigate} />
              )}
              {currentScreen === "AITutor" && <AITutorScreen onNavigate={handleNavigate} />}
            </AIProvider>
          </GameProvider>
        </AuthProvider>
      </View>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF5F7",
  },
})
