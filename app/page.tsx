"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"

export default function Page() {
  const [copied, setCopied] = useState(false)

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-pink-50 to-purple-50 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 pt-12">
          <h1 className="text-6xl font-bold text-pink-600 mb-4">SmartKid</h1>
          <p className="text-xl text-gray-600">Gamified English Learning Platform</p>
          <p className="text-gray-500 mt-2">Learn English through fun flip card games</p>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          {/* About Section */}
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">About SmartKid</h2>
            <p className="text-gray-600 mb-4">
              SmartKid is an interactive mobile application designed to help young learners (ages 3-12) improve their
              English vocabulary through engaging flip card games.
            </p>
            <ul className="space-y-2 text-gray-600">
              <li className="flex items-start">
                <span className="text-pink-600 mr-3">✓</span>
                <span>Interactive memory card games</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-3">✓</span>
                <span>Multiple categories and difficulty levels</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-3">✓</span>
                <span>Parent monitoring dashboard</span>
              </li>
              <li className="flex items-start">
                <span className="text-pink-600 mr-3">✓</span>
                <span>Achievement badges and progress tracking</span>
              </li>
            </ul>
          </Card>

          {/* Getting Started Section */}
          <Card className="p-8 bg-white shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Getting Started</h2>
            <p className="text-gray-600 mb-4">SmartKid is a React Native app built with Expo. To run the app:</p>
            <ol className="space-y-3 text-gray-600">
              <li className="flex items-start">
                <span className="font-bold text-pink-600 mr-3">1.</span>
                <span>
                  Install dependencies: <code className="bg-gray-100 px-2 py-1 rounded">npm install</code>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-pink-600 mr-3">2.</span>
                <span>
                  Start dev server: <code className="bg-gray-100 px-2 py-1 rounded">npm run dev</code>
                </span>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-pink-600 mr-3">3.</span>
                <span>
                  Press <code className="bg-gray-100 px-2 py-1 rounded">i</code> for iOS or{" "}
                  <code className="bg-gray-100 px-2 py-1 rounded">a</code> for Android
                </span>
              </li>
            </ol>
          </Card>
        </div>

        {/* Demo Credentials */}
        <Card className="p-8 bg-blue-50 border-2 border-blue-200 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Demo Credentials</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {/* Student Account */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Student Account</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email:</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-2 rounded flex-1 text-sm">hoa@smartkid.com</code>
                    <button
                      onClick={() => copyToClipboard("hoa@smartkid.com")}
                      className="px-3 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 text-sm"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Password:</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-2 rounded flex-1 text-sm">password123</code>
                    <button
                      onClick={() => copyToClipboard("password123")}
                      className="px-3 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 text-sm"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Parent Account */}
            <div className="bg-white p-6 rounded-lg">
              <h3 className="font-bold text-lg text-gray-800 mb-4">Parent Account</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Email:</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-2 rounded flex-1 text-sm">parent@smartkid.com</code>
                    <button
                      onClick={() => copyToClipboard("parent@smartkid.com")}
                      className="px-3 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 text-sm"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Password:</p>
                  <div className="flex items-center gap-2">
                    <code className="bg-gray-100 px-3 py-2 rounded flex-1 text-sm">password123</code>
                    <button
                      onClick={() => copyToClipboard("password123")}
                      className="px-3 py-2 bg-pink-600 text-white rounded hover:bg-pink-700 text-sm"
                    >
                      {copied ? "Copied!" : "Copy"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Key Features</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🎮", title: "Flip Card Games", desc: "Memory-based vocabulary learning" },
              { icon: "📚", title: "4 Categories", desc: "Animals, Fruits, Vehicles, Colors" },
              { icon: "⭐", title: "3 Difficulty Levels", desc: "Easy, Medium, Hard" },
              { icon: "🏆", title: "Achievements", desc: "Unlock badges and milestones" },
              { icon: "📊", title: "Progress Tracking", desc: "Detailed analytics dashboard" },
              { icon: "👨‍👩‍👧", title: "Parental Controls", desc: "Monitor child progress" },
              { icon: "⏱️", title: "Time Challenges", desc: "Race against the clock" },
              { icon: "🎯", title: "Scoring System", desc: "Combo multipliers and bonuses" },
            ].map((feature, idx) => (
              <Card key={idx} className="p-6 bg-white text-center hover:shadow-lg transition-shadow">
                <div className="text-4xl mb-3">{feature.icon}</div>
                <h3 className="font-bold text-gray-800 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Tech Stack */}
        <Card className="p-8 bg-gradient-to-r from-pink-50 to-purple-50 mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tech Stack</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Frontend</h3>
              <ul className="space-y-2 text-gray-600">
                <li>React Native</li>
                <li>Expo</li>
                <li>TypeScript</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">State Management</h3>
              <ul className="space-y-2 text-gray-600">
                <li>React Context API</li>
                <li>Custom Hooks</li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-gray-800 mb-3">Styling</h3>
              <ul className="space-y-2 text-gray-600">
                <li>React Native StyleSheet</li>
                <li>Custom Components</li>
              </ul>
            </div>
          </div>
        </Card>

        {/* Footer */}
        <div className="text-center text-gray-600 py-8 border-t border-gray-200">
          <p className="mb-4">SmartKid v1.0.0 - Gamified English Learning Platform</p>
          <p className="text-sm">
            For more information, check the <code className="bg-gray-100 px-2 py-1 rounded">README.md</code> file
          </p>
        </div>
      </div>
    </main>
  )
}
