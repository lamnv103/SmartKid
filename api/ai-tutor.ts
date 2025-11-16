import type { NextRequest } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { message, context, conversationHistory, studentName, studentAge } = body

    // Build conversation history for LLM context
    const conversationMessages = conversationHistory.map((msg: any) => ({
      role: msg.role,
      content: msg.content,
    }))

    // Using Vercel AI Gateway which supports multiple providers
    const systemPrompt = `${context}
    
Student Name: ${studentName}
Student Age: ${studentAge}

Guidelines:
- Keep responses SHORT (1-2 sentences maximum)
- Use simple vocabulary appropriate for a ${studentAge}-year-old
- Mix Vietnamese and English in responses
- Be encouraging and playful
- Always end with an emoji that matches the topic
- Ask engaging follow-up questions to keep conversation going
- If the student makes a mistake, gently correct them with examples`

    const response = await fetch("https://api.vercel.ai/chat", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.VERCEL_AI_GATEWAY_TOKEN || ""}`,
      },
      body: JSON.stringify({
        model: "openai/gpt-4-mini", // Fast model for real-time interaction
        messages: [
          { role: "system", content: systemPrompt },
          ...conversationMessages,
          { role: "user", content: message },
        ],
        temperature: 0.7,
        max_tokens: 100,
      }),
    })

    if (!response.ok) {
      // Fallback response if API fails
      const fallbackResponses = [
        "Tuyệt vời! 🎉 Bạn làm rất tốt. Hãy tiếp tục cố gắng!",
        "Hay lắm! 🌟 Bạn thông minh quá!",
        "Nối câu tiếp theo được không? 💭",
        "Bạn nói rất đúng! 👍 Giờ thử cái này xem sao?",
      ]
      const randomFallback = fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)]
      return Response.json({ response: randomFallback })
    }

    const data = await response.json()
    const aiResponse = data.choices[0].message.content

    return Response.json({ response: aiResponse })
  } catch (error) {
    console.error("AI Tutor API error:", error)
    return Response.json(
      { error: "Failed to process AI tutor request", response: "Xin lỗi, tôi gặp lỗi kỹ thuật. Thử lại nhé! 😊" },
      { status: 500 }
    )
  }
}
