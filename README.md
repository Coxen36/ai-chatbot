# AI Chatbot Starter 🤖

A simple AI chatbot built with Next.js, TypeScript, Tailwind CSS, and the OpenAI API.
This project also serves as a reusable starter template for future AI apps.

## ✨ Features

- Chat interface with user & assistant messages
- Uses `gpt-4o-mini` via OpenAI's Chat Completions API
- Clean, minimal UI
- Easy to reuse as a base for other AI projects

## 🧩 Tech Stack

- **Framework**: Next.js (App Router, TypeScript)
- **Styling**: Tailwind CSS
- **AI**: OpenAI Node SDK (`openai`)
- **Deployment**: Vercel (recommended, but can run anywhere with Node.js)

## 🔑 Environment Variables

Create a `.env.local` file in the project root:

```bash
OPENAI_API_KEY=your_openai_api_key_here
