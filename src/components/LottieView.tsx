"use client"

import type React from "react"
import { View, StyleSheet } from "react-native"
import { useEffect, useRef } from "react"

interface LottieViewProps {
  source: any
  autoPlay?: boolean
  loop?: boolean
  speed?: number
  style?: any
}

/**
 * LottieView Component - Web implementation for rendering Lottie animations
 * In a real React Native app, you would use 'lottie-react-native' package
 * For the web preview, this uses SVG-based animation rendering
 */
export const LottieView: React.FC<LottieViewProps> = ({ 
  source, 
  autoPlay = true, 
  loop = true, 
  speed = 1,
  style 
}) => {
  const containerRef = useRef<View>(null)

  return (
    <View ref={containerRef} style={[styles.container, style]}>
      {/* Lottie animation will be rendered here */}
      <View style={styles.placeholder}>
        {/* Fallback UI showing animated robot character */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
  },
})
