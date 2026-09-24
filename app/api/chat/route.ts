import { NextRequest, NextResponse } from "next/server"
import { GoogleGenAI } from "@google/genai"

const MODEL_FALLBACK_CHAIN = ["gemini-3.6-flash", "gemini-3.5-flash", "gemini-3.1-flash-lite"]

async function generateWithFallback(ai: GoogleGenAI, prompt: string) {
  let lastError: any = null

  for (const model of MODEL_FALLBACK_CHAIN) {
    for (let attempt = 0; attempt < 2; attempt++) {
      try {
        return await ai.models.generateContent({ model, contents: prompt })
      } catch (err: any) {
        lastError = err
        const is503 = err?.status === 503 || err?.message?.includes("UNAVAILABLE")
        const is429 = err?.status === 429 || err?.message?.includes("RESOURCE_EXHAUSTED")
        const is404 = err?.status === 404 || err?.message?.includes("NOT_FOUND")

        if (is503 && attempt === 0) {
          await new Promise((r) => setTimeout(r, 1000))
          continue // retry same model once
        }
        if (is429 || is404 || is503) break // move to next model in chain
        throw err // unknown error, don't keep trying
      }
    }
  }

  throw lastError
}

export async function POST(req: NextRequest) {
  try {
    const { message } = await req.json()

    if (!message || typeof message !== "string") {
      return NextResponse.json({ error: "message is required" }, { status: 400 })
    }

    const apiKey = process.env.GEMINI_API_KEY
    if (!apiKey) {
      return NextResponse.json({ error: "GEMINI_API_KEY is not configured" }, { status: 500 })
    }

    const ai = new GoogleGenAI({ apiKey })
    const prompt = `You are Fyntric AI, a finance assistant. Answer in simple English.\n\nUser: ${message}`

    const response = await generateWithFallback(ai, prompt)

    return NextResponse.json({ reply: response?.text || "Sorry, try again!" })
  } catch (err: any) {
    console.error("Gemini API error:", err?.message || err)

    const isQuotaError = err?.status === 429 || err?.message?.includes("RESOURCE_EXHAUSTED")
    if (isQuotaError) {
      return NextResponse.json(
        { error: "Daily free quota reached. Try again later." },
        { status: 429 }
      )
    }

    return NextResponse.json({ error: "Something went wrong talking to Gemini" }, { status: 500 })
  }
}