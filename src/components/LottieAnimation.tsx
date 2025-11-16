"use client"

import type React from "react"
import { View, StyleSheet, Animated, Text } from "react-native"
import { useEffect, useRef } from "react"

interface LottieAnimationProps {
  isAnimating: boolean
  isSpeaking: boolean
}

export const LottieAnimation: React.FC<LottieAnimationProps> = ({ isAnimating, isSpeaking }) => {
  const bounceAnim = useRef(new Animated.Value(0)).current
  const pulseAnim = useRef(new Animated.Value(1)).current
  const scaleAnim = useRef(new Animated.Value(1)).current

  useEffect(() => {
    if (isAnimating) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(bounceAnim, {
            toValue: 1,
            duration: 600,
            useNativeDriver: false,
          }),
          Animated.timing(bounceAnim, {
            toValue: 0,
            duration: 600,
            useNativeDriver: false,
          }),
        ])
      ).start()
    } else {
      bounceAnim.setValue(0)
    }
  }, [isAnimating])

  useEffect(() => {
    if (isSpeaking) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(pulseAnim, {
            toValue: 1.2,
            duration: 400,
            useNativeDriver: false,
          }),
          Animated.timing(pulseAnim, {
            toValue: 1,
            duration: 400,
            useNativeDriver: false,
          }),
        ])
      ).start()

      Animated.loop(
        Animated.sequence([
          Animated.timing(scaleAnim, {
            toValue: 1.08,
            duration: 300,
            useNativeDriver: false,
          }),
          Animated.timing(scaleAnim, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
          }),
        ])
      ).start()
    } else {
      pulseAnim.setValue(1)
      scaleAnim.setValue(1)
    }
  }, [isSpeaking])

  const bounceStyle = {
    transform: [
      {
        translateY: bounceAnim.interpolate({
          inputRange: [0, 1],
          outputRange: [0, -16],
        }),
      },
    ],
  }

  const pulseStyle = {
    transform: [{ scale: pulseAnim }],
  }

  const combinedStyle = {
    transform: [
      {
        scaleX: scaleAnim,
      },
      {
        scaleY: scaleAnim,
      },
    ],
  }

  return (
    <View style={[styles.container, isSpeaking && styles.speaking]}>
      <Animated.View style={[styles.animationBox, bounceStyle, pulseStyle, combinedStyle]}>
        <View style={styles.robotContainer}>
          <View style={[styles.ear, styles.earLeft]} />
          <View style={[styles.ear, styles.earRight]} />

          <View style={styles.head}>
            <View style={styles.visor}>
              <View style={styles.eye} />
              <View style={styles.eye} />
            </View>
          </View>

          <View style={styles.body}>
            <View style={styles.mouth} />
          </View>

          <View style={styles.armsContainer}>
            <View style={[styles.arm, styles.armLeft]} />
            <View style={[styles.arm, styles.armRight]} />
          </View>

          <View style={styles.shadow} />
        </View>
      </Animated.View>

      {isSpeaking && (
        <View style={styles.soundWaves}>
          <Animated.View style={[styles.wave, styles.wave1]} />
          <Animated.View style={[styles.wave, styles.wave2]} />
          <Animated.View style={[styles.wave, styles.wave3]} />
        </View>
      )}

      {isAnimating && !isSpeaking && (
        <View style={styles.thinkingIndicator}>
          <View style={styles.dot} />
          <View style={styles.dot} />
          <View style={styles.dot} />
        </View>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 24,
    backgroundColor: "#FFF5F7",
    minHeight: 220,
  },
  speaking: {
    backgroundColor: "#FFD4E5",
  },
  animationBox: {
    width: 200,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
  },
  robotContainer: {
    width: 140,
    height: 160,
    alignItems: "center",
    justifyContent: "flex-start",
    position: "relative",
  },
  ear: {
    position: "absolute",
    width: 18,
    height: 36,
    backgroundColor: "#E0E0E0",
    borderRadius: 9,
    top: 20,
  },
  earLeft: {
    left: 8,
  },
  earRight: {
    right: 8,
  },
  head: {
    width: 108,
    height: 88,
    backgroundColor: "#F5F5F5",
    borderRadius: 22,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 4,
    borderWidth: 2,
    borderColor: "#E8E8E8",
  },
  visor: {
    width: 88,
    height: 40,
    backgroundColor: "#1A1A1A",
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    paddingHorizontal: 14,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
    elevation: 4,
  },
  eye: {
    width: 16,
    height: 20,
    backgroundColor: "#6366F1",
    borderRadius: 8,
  },
  body: {
    width: 96,
    height: 68,
    backgroundColor: "#F9F9F9",
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#E8E8E8",
  },
  mouth: {
    width: 44,
    height: 10,
    backgroundColor: "#D0D0D0",
    borderRadius: 5,
  },
  armsContainer: {
    position: "absolute",
    width: 140,
    height: 90,
    top: 40,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  arm: {
    width: 16,
    height: 56,
    backgroundColor: "#E0E0E0",
    borderRadius: 8,
  },
  armLeft: {
    marginLeft: -12,
  },
  armRight: {
    marginRight: -12,
  },
  shadow: {
    position: "absolute",
    bottom: -16,
    width: 100,
    height: 12,
    backgroundColor: "rgba(0,0,0,0.1)",
    borderRadius: 50,
  },
  soundWaves: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    gap: 8,
    marginTop: 16,
    height: 44,
  },
  wave: {
    width: 4,
    backgroundColor: "#FF6B9D",
    borderRadius: 2,
  },
  wave1: {
    height: 12,
  },
  wave2: {
    height: 28,
  },
  wave3: {
    height: 18,
  },
  thinkingIndicator: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    marginTop: 12,
  },
  dot: {
    width: 10,
    height: 10,
    backgroundColor: "#FF6B9D",
    borderRadius: 5,
  },
})
