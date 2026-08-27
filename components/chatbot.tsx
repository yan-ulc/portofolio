"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { MessageCircle, X, Send, User, Bot, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ id: string; role: "user" | "assistant"; content: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now().toString(), role: "user" as const, content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: [...messages, userMessage] }),
      });

      if (!response.ok) throw new Error("Failed to fetch response");

      const reader = response.body?.getReader();
      const decoder = new TextDecoder("utf-8");
      
      const assistantMessageId = (Date.now() + 1).toString();
      setMessages((prev) => [...prev, { id: assistantMessageId, role: "assistant" as const, content: "" }]);

      if (reader) {
        let done = false;
        let assistantContent = "";
        
        while (!done) {
          const { value, done: readerDone } = await reader.read();
          done = readerDone;
          if (value) {
            const chunk = decoder.decode(value, { stream: true });
            assistantContent += chunk;
            
            // Basic cleanup for DeepSeek's think tags for better UI
            const displayContent = assistantContent
              .replace(/<think>/g, '💭 Thinking...\n')
              .replace(/<\/think>/g, '\n\n---\n\n');

            setMessages((prev) => prev.map((m) => (m.id === assistantMessageId ? { ...m, content: displayContent } : m)));
          }
        }
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { id: Date.now().toString(), role: "assistant", content: "Sorry, I encountered an error." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="absolute bottom-16 right-0 w-[350px] sm:w-[400px] h-[500px] bg-background border rounded-2xl shadow-2xl flex flex-col overflow-hidden"
            >
              {/* Header */}
              <div className="p-4 border-b bg-muted/50 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center text-primary">
                    <Bot size={18} />
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm">Ryan&apos;s AI Assistant</h3>
                    <p className="text-xs text-muted-foreground">Ask me about Ryan&apos;s experience!</p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => setIsOpen(false)}>
                  <X size={18} />
                </Button>
              </div>

              {/* Chat Messages */}
              <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-4">
                {messages.length === 0 ? (
                  <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground gap-2">
                    <MessageCircle size={32} className="opacity-20" />
                    <p className="text-sm">Hi! I can answer questions about Ryan&apos;s projects and skills.</p>
                  </div>
                ) : (
                  messages.map((m) => (
                    <div
                      key={m.id}
                      className={`flex gap-3 max-w-[85%] ${
                        m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
                      }`}
                    >
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 mt-1 ${
                        m.role === "user" ? "bg-primary text-primary-foreground" : "bg-muted text-muted-foreground"
                      }`}>
                        {m.role === "user" ? <User size={16} /> : <Bot size={16} />}
                      </div>
                      <div className={`p-3 rounded-2xl text-sm overflow-hidden ${
                        m.role === "user" 
                          ? "bg-primary text-primary-foreground rounded-tr-sm whitespace-pre-wrap" 
                          : "bg-muted rounded-tl-sm"
                      }`}>
                        {m.role === "user" ? (
                          m.content
                        ) : (
                          <div className="prose prose-sm dark:prose-invert max-w-none prose-p:leading-relaxed prose-pre:bg-background prose-pre:border">
                            <ReactMarkdown remarkPlugins={[remarkGfm]}>
                              {m.content}
                            </ReactMarkdown>
                          </div>
                        )}
                      </div>
                    </div>
                  ))
                )}
                {isLoading && messages[messages.length - 1]?.role === "user" && (
                  <div className="flex gap-3 max-w-[85%] mr-auto">
                    <div className="w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center shrink-0">
                      <Bot size={16} />
                    </div>
                    <div className="p-3 rounded-2xl bg-muted rounded-tl-sm flex items-center gap-2">
                      <Loader2 size={16} className="animate-spin opacity-50" />
                      <span className="text-xs opacity-50">Thinking...</span>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Input Area */}
              <div className="p-3 border-t bg-background">
                <form onSubmit={handleFormSubmit} className="flex gap-2">
                  <input
                    value={input || ""}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Ask something..."
                    className="flex-1 bg-muted/50 border-none rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary"
                    disabled={isLoading}
                  />
                  <Button 
                    type="submit" 
                    size="icon" 
                    className="rounded-full shrink-0" 
                    disabled={isLoading || !(input || "").trim()}
                  >
                    <Send size={16} className={(input || "").trim() ? "translate-x-[-1px] translate-y-[1px]" : ""} />
                  </Button>
                </form>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            size="icon"
            className="h-14 w-14 rounded-full shadow-lg bg-primary hover:bg-primary/90 text-primary-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
          </Button>
        </motion.div>
      </div>
    </>
  );
}
