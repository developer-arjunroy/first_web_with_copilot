import { NextResponse } from 'next/server'

type Body = {
  input?: string
  mode?: string
}

const OPENAI_KEY = process.env.OPENAI_API_KEY

async function callOpenAI(prompt: string) {
  if (!OPENAI_KEY) throw new Error('OPENAI_API_KEY not set')
  const res = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${OPENAI_KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: 'gpt-4',
      messages: [
        { role: 'system', content: 'You are ExplainOS, an assistant that transforms user input into a structured JSON with the keys: oneLiner (string), bullets (array of strings), explainLike10 (string), actionSteps (array of strings), questions (array of strings). Reply with VALID JSON ONLY.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 800,
      temperature: 0.3
    })
  })

  if (!res.ok) {
    const txt = await res.text()
    throw new Error('OpenAI Error: ' + txt)
  }
  const data = await res.json()
  const text = data?.choices?.[0]?.message?.content
  if (!text) throw new Error('No response text')
  return text
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body
    const { input, mode } = body
    if (!input || input.trim().length === 0) {
      return NextResponse.json({ error: 'input required' }, { status: 400 })
    }

    // Build a clear prompt that asks for JSON
    const prompt = `
Mode: ${mode || 'Beginner'}

Input:
${input}

Instructions:
- Produce a JSON object with keys:
  - oneLiner: short single-sentence summary.
  - bullets: array of 4-8 concise bullet points.
  - explainLike10: a short paragraph explaining like you're talking to a 10-year-old.
  - actionSteps: array of 3-6 concrete next steps the user can take.
  - questions: array of 3-5 short questions to test understanding.
- Keep answers focused, actionable, and concise.
- Return the JSON only (no commentary).
`
    const text = await callOpenAI(prompt)

    // Attempt to parse JSON robustly
    let parsed: any
    try {
      // Some models may wrap the JSON in backticks or text: attempt to extract first JSON object
      const firstBrace = text.indexOf('{')
      const lastBrace = text.lastIndexOf('}')
      const jsonText = firstBrace !== -1 && lastBrace !== -1 ? text.slice(firstBrace, lastBrace + 1) : text
      parsed = JSON.parse(jsonText)
    } catch (e) {
      // If parse fails, return raw for debugging
      return NextResponse.json({ error: 'Failed to parse model output', raw: text }, { status: 502 })
    }

    return NextResponse.json(parsed)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 })
  }
}
