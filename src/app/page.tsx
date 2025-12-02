"use client";

import { useState } from "react";

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

export default function Home() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const newMessages: ChatMessage[] = [
      ...messages,
      { role: "user", content: input },
    ];

    setMessages(newMessages);
    setInput("");
    setLoading(true);

    // Build full conversation with system prompt
    const apiMessages = [
      {
        role: "system" as const,
        content:
          "You are a friendly AI assistant helping a developer learn AI and startups.",
      },
      ...newMessages,
    ];

    const res = await fetch("/api/ai", {
      method: "POST",
      body: JSON.stringify({ messages: apiMessages }),
    });

    const data = await res.json();

    setMessages((prev) => [
      ...prev,
      { role: "assistant", content: data.reply as string },
    ]);

    setLoading(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      void sendMessage();
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <header className="border-b bg-white">
        <div className="max-w-3xl mx-auto px-4 py-3">
          <h1 className="text-2xl font-bold">AI Chatbot Starter</h1>
          <p className="text-sm text-gray-500">
            Built with Next.js + TypeScript + OpenAI. Reuse this for any AI app.
          </p>
        </div>
      </header>

      <main className="flex-1 flex flex-col">
        <div className="flex-1 max-w-3xl mx-auto w-full px-4 py-4 space-y-3 overflow-y-auto">
          {messages.length === 0 && (
            <p className="text-gray-400 text-sm">
              Start the conversation by typing a message below.
            </p>
          )}

          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex ${
                m.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`rounded-lg px-3 py-2 max-w-[80%] text-sm ${
                  m.role === "user"
                    ? "bg-blue-600 text-white"
                    : "bg-white border text-gray-900"
                }`}
              >
                {m.content}
              </div>
            </div>
          ))}

          {loading && (
            <p className="text-xs text-gray-500 italic">Thinking...</p>
          )}
        </div>

        <div className="border-t bg-white">
          <div className="max-w-3xl mx-auto px-4 py-3 flex gap-2">
            <textarea
              className="flex-1 border rounded px-3 py-2 text-sm resize-none h-16"
              placeholder="Type a message... (Enter to send, Shift+Enter for new line)"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
            />
            <button
              onClick={sendMessage}
              disabled={loading}
              className="px-4 py-2 bg-blue-600 text-white text-sm rounded disabled:opacity-60 h-16"
            >
              {loading ? "Sending..." : "Send"}
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
