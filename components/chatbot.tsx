"use client";

import { Button } from "@/components/ui/button";
import {
  Bot,
  Check,
  Copy,
  Loader2,
  MessageCircle,
  Send,
  Sparkles,
  Trash2,
  User,
  X,
} from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useEffect, useRef, useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

const starterPrompts = [
  "Tell me about Ryan's projects 🚀",
  "What is Ryan's core tech stack? 💻",
  "What did Ryan build during his internship? 🏛️",
  "How can I contact Ryan for collaboration? 📬",
];

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<
    { id: string; role: "user" | "assistant"; content: string }[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const triggerChat = async (userPrompt: string) => {
    if (!userPrompt.trim() || isLoading) return;

    const userMessage = {
      id: Date.now().toString(),
      role: "user" as const,
      content: userPrompt,
    };

    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: nextMessages }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");

      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [
        ...prev,
        { id: assistantMessageId, role: "assistant" as const, content: "" },
      ]);

      if (reader) {
        let done = false;
        let assistantContent = "";

        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            assistantContent += chunk;

            // Basic cleanup for think tags
            const displayContent = assistantContent
              .replace(/<think>/g, "💭 *Thinking...*\n\n")
              .replace(/<\/think>/g, "\n\n---\n\n");

            setMessages((prev) =>
              prev.map((m) =>
                m.id === assistantMessageId
                  ? { ...m, content: displayContent }
                  : m,
              ),
            );
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          id: Date.now().toString(),
          role: "assistant",
          content:
            "Sorry, I encountered an issue connecting to the AI service. Please feel free to email Ryan directly at [muhammad7135@gmail.com](mailto:muhammad7135@gmail.com).",
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await triggerChat(input);
  };

  const handleCopyMessage = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleClearChat = () => {
    if (isLoading) return;
    setMessages([]);
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 24, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.96 }}
              transition={{ duration: 0.22, ease: "easeOut" }}
              className="fixed sm:absolute bottom-0 right-0 sm:bottom-16 w-full sm:w-[420px] h-[85vh] sm:h-[540px] max-h-[92vh] bg-background border border-border/80 rounded-t-3xl sm:rounded-2xl shadow-2xl flex flex-col overflow-hidden z-50"
            >
              {/* Header */}
              <div className="p-4 border-b border-border/60 bg-muted/40 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                    <Bot size={19} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm leading-tight text-foreground">
                        Ryan&apos;s AI Assistant
                      </h3>
                      <span className="flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.2 text-[10px] font-mono text-emerald-500 font-medium">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                        Online
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground">
                      Ask anything about Ryan&apos;s background &amp; work
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1">
                  {messages.length > 0 && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
                      onClick={handleClearChat}
                      title="Clear chat history"
                    >
                      <Trash2 size={15} />
                    </Button>
                  )}
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 rounded-full text-muted-foreground hover:text-foreground cursor-pointer"
                    onClick={() => setIsOpen(false)}
                    title="Close chat window"
                  >
                    <X size={18} />
                  </Button>
                </div>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {messages.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center p-2 gap-4">
                    <div className="w-12 h-12 rounded-2xl bg-primary/10 border border-primary/20 flex items-center justify-center text-primary">
                      <Sparkles size={24} />
                    </div>
                    <div className="max-w-xs flex flex-col gap-1">
                      <p className="text-sm font-semibold text-foreground">
                        Hi! I&apos;m Ryan&apos;s AI Assistant.
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        I can answer questions about Ryan&apos;s full-stack &amp;
                        AI projects, tech stack, and background.
                      </p>
                    </div>

                    <div className="flex flex-col gap-2 w-full mt-2">
                      <span className="font-mono text-[11px] text-muted-foreground/80 uppercase tracking-wider text-left">
                        Suggested Prompts:
                      </span>
                      {starterPrompts.map((prompt) => (
                        <button
                          key={prompt}
                          type="button"
                          onClick={() => triggerChat(prompt)}
                          className="text-left text-xs p-2.5 rounded-xl border border-border/80 bg-muted/30 hover:bg-muted hover:border-primary/40 text-foreground transition-all flex items-center justify-between group cursor-pointer"
                        >
                          <span>{prompt}</span>
                          <Send
                            size={12}
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-primary"
                          />
                        </button>
                      ))}
                    </div>
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex gap-3 max-w-[88%] ${
                        m.role === "user"
                          ? "ml-auto flex-row-reverse"
                          : "mr-auto"
                      }`}
                    >
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                          m.role === "user"
                            ? "bg-primary text-primary-foreground"
                            : "bg-muted text-muted-foreground border border-border/60"
                        }`}
                      >
                        {m.role === "user" ? (
                          <User size={14} />
                        ) : (
                          <Bot size={14} />
                        )}
                      </div>

                      <div className="flex flex-col gap-1">
                        <div
                          className={`p-3 rounded-2xl text-sm overflow-hidden ${
                            m.role === "user"
                              ? "bg-primary text-primary-foreground rounded-tr-sm whitespace-pre-wrap font-medium"
                              : "bg-muted/70 border border-border/50 text-foreground rounded-tl-sm"
                          }`}
                        >
                          {m.role === "user" ? (
                            m.content
                          ) : (
                            <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-background/90 prose-pre:border prose-pre:rounded-xl">
                              <ReactMarkdown remarkPlugins={[remarkGfm]}>
                                {m.content}
                              </ReactMarkdown>
                            </div>
                          )}
                        </div>

                        {m.role === "assistant" && m.content && (
                          <div className="flex items-center gap-1 self-end text-[11px] text-muted-foreground px-1">
                            <button
                              type="button"
                              onClick={() =>
                                handleCopyMessage(m.id, m.content)
                              }
                              className="inline-flex items-center gap-1 hover:text-foreground transition-colors cursor-pointer py-0.5 px-1 rounded"
                              title="Copy response"
                            >
                              {copiedId === m.id ? (
                                <>
                                  <Check
                                    size={12}
                                    className="text-emerald-500"
                                  />
                                  <span className="text-emerald-500">
                                    Copied
                                  </span>
                                </>
                              ) : (
                                <>
                                  <Copy size={12} />
                                  <span>Copy</span>
                                </>
                              )}
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}

                {isLoading &&
                  messages[messages.length - 1]?.role === "user" && (
                    <div className="flex gap-3 max-w-[85%] mr-auto">
                      <div className="w-7 h-7 rounded-full bg-muted border border-border/60 text-muted-foreground flex items-center justify-center shrink-0">
                        <Bot size={14} />
                      </div>
                      <div className="p-3 rounded-2xl bg-muted/70 border border-border/50 rounded-tl-sm flex items-center gap-2">
                        <Loader2
                          size={15}
                          className="animate-spin text-primary"
                        />
                        <span className="text-xs text-muted-foreground">
                          Thinking...
                        </span>
                      </div>
                    </div>
                  )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t border-border/60 bg-background">
                <form onSubmit={handleFormSubmit} className="flex gap-2">
                  <input
                    ref={inputRef}
                    value={input || ""}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask about Ryan's work..."
                    className="flex-1 bg-muted/50 border border-border/60 rounded-full px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-primary"
                    disabled={isLoading}
                  />
                  <Button
                    type="submit"
                    size="icon"
                    className="rounded-full shrink-0 h-10 w-10 cursor-pointer"
                    disabled={isLoading || !(input || "").trim()}
                  >
                    <Send
                      size={16}
                      className={
                        (input || "").trim()
                          ? "translate-x-[-1px] translate-y-[1px]"
                          : ""
                      }
                    />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          animate={{ y: [0, -4, 0] }}
          transition={{ duration: 3.6, repeat: Infinity, ease: "easeInOut" }}
          variants={{ hover: { scale: 1.08, y: -2 } }}
          whileTap={{ scale: 0.95 }}
          whileHover="hover"
          className="group relative"
        >
          <motion.span
            aria-hidden="true"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -inset-1 rounded-full bg-[conic-gradient(from_0deg,transparent_0deg,transparent_250deg,rgba(255,255,255,0.9)_310deg,transparent_360deg)] opacity-0 blur-[2px] transition-opacity duration-300 group-hover:opacity-100"
          />
          <motion.span
            aria-hidden="true"
            animate={{ rotate: -360 }}
            transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
            className="pointer-events-none absolute -inset-2 rounded-full border border-white/0 opacity-0 blur-[1px] transition-opacity duration-300 group-hover:border-white/35 group-hover:opacity-100"
          />
          <motion.div
            initial={{ opacity: 0, y: 6, scale: 0.9 }}
            whileHover={{ opacity: 1, y: 0, scale: 1 }}
            className="pointer-events-none absolute bottom-16 right-0 rounded-2xl rounded-br-sm border border-border bg-background px-3 py-2 text-xs font-semibold text-foreground shadow-lg opacity-0 transition-opacity duration-200 group-hover:opacity-100"
          >
            Ask me
          </motion.div>
          <Button
            size="icon"
            className="relative h-14 w-14 rounded-full border border-foreground/15 bg-foreground text-background shadow-xl hover:bg-foreground/90 cursor-pointer"
            aria-label={isOpen ? "Close AI assistant" : "Open AI assistant"}
            onClick={() => {
              setIsOpen(!isOpen);
            }}
          >
            <motion.span
              variants={{
                hover: {
                  rotate: [0, -10, 8, 0],
                  scale: [1, 1.12, 1.04, 1],
                  filter: "drop-shadow(0 0 8px rgba(255,255,255,0.75))",
                },
              }}
              transition={{ duration: 0.55, ease: "easeOut" }}
              className="relative flex h-full w-full items-center justify-center rounded-full shadow-[inset_0_0_16px_rgba(255,255,255,0.22),0_0_22px_rgba(148,163,184,0.28)]"
            >
              <motion.span
                aria-hidden="true"
                animate={{ scale: [1, 1.16, 1], opacity: [0.5, 0.15, 0.5] }}
                transition={{
                  duration: 2.8,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute inset-1 rounded-full bg-white/20 blur-md"
              />
              {isOpen ? (
                <X size={22} className="relative" />
              ) : (
                <Bot size={23} className="relative" />
              )}
            </motion.span>
          </Button>
        </motion.div>
      </div>
    </>
  );
}
