# ExplainOS (MVP)

ExplainOS transforms pasted text or topics into structured, actionable knowledge using OpenAI.

Quick start:
1. Copy `.env.example` to `.env.local` and set `OPENAI_API_KEY`.
2. Install deps: `npm install`
3. Run dev server: `npm run dev`
4. Open http://localhost:3000

Notes:
- The API route expects an OpenAI API key in environment.
- This scaffold focuses on the UI + AI integration. Authentication and DB persistence can be added next.
