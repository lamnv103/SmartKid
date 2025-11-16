"use client"

import type React from "react"
import { View, Text, StyleSheet } from "react-native"

interface ProgressRingProps {
  percentage: number
  size?: number
  label?: string
}

export const ProgressRing: React.FC<ProgressRingProps> = ({ percentage, size = 100, label }) => {
  const circumference = 2 * Math.PI * (size / 2 - 8)
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  return (
    <View style={[styles.container, { width: size, height: size }]}>
      <View style={[styles.ring, { width: size, height: size }]}>
        <View
          style={[
            styles.progressFill,
            {
              width: size,
              height: size,
              borderRadius: size / 2,
              borderWidth: 8,
              borderColor: "#FF6B9D",
              borderTopColor: "#FFD4E5",
              borderRightColor: "#FFD4E5",
              borderBottomColor: "#FFD4E5",
              transform: [{ rotate: `${(percentage / 100) * 360}deg` }],
            },
          ]}
        />
      </View>
      <View style={styles.centerContent}>
        <Text style={styles.percentage}>{percentage}%</Text>
        {label && <Text style={styles.label}>{label}</Text>}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
  },
  ring: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
  },
  progressFill: {
    position: "absolute",
  },
  centerContent: {
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
  },
  percentage: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#FF6B9D",
  },
  label: {
    fontSize: 12,
    color: "#666",
    marginTop: 4,
  },
})
