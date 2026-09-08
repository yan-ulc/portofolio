import { Chatbot } from "@/components/chatbot";
import { ConvexClientProvider } from "@/components/convex-client-provider";
import { Navbar } from "@/components/navbar";
import { ThemeProvider } from "@/components/theme-provider";
import type { Metadata } from "next";
import { Fira_Code, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta-sans",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira-code",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Muhammad Ryan — Full-Stack Engineer & Machine Learning Engineer",
  description:
    "Portfolio of Muhammad Ryan, a fresh Computer Engineering graduate focused on full-stack development, machine learning, AI, NLP, LLM applications, and MLOps.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${jakartaSans.variable} ${firaCode.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <ConvexClientProvider>
            <Navbar />
            <main className="relative flex-1">{children}</main>
            <Chatbot />
          </ConvexClientProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
