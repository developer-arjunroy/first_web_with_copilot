# First Web with Copilot - AI-enabled MVP

This repository contains a minimal fullstack Next.js starter app that demonstrates a simple AI-powered chat (frontend + server API route). It's intended as an MVP you can iterate on to build a startup product.

Features
- Next.js fullstack app (React frontend + API routes)
- Simple chat UI to send prompts
- Server API route that proxies requests to the OpenAI Chat Completions API (uses OPENAI_API_KEY)

Prerequisites
- Node.js 18+
- An OpenAI API key

Getting started
1. Clone the repo
2. Create a .env.local file in the project root with:

```
OPENAI_API_KEY=sk-...your-key-here...
```

3. Install and run:

```bash
npm install
npm run dev
```

4. Open http://localhost:3000 and try the chat UI.

Security note
- This example uses a server-side proxy to keep your OpenAI key secret. Never commit your API key.

Next steps (suggestions)
- Add user authentication and per-user conversation storage (e.g., Prisma + PostgreSQL)
- Add rate limiting and usage billing
- Improve prompt engineering and streaming responses

