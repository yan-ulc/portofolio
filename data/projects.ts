export type ProjectCategory = "AI / Productivity" | "AI / Education" | "Collaboration / Productivity" | "Machine Learning / NLP" | "MLOps / Machine Learning Engineering" | "Generative AI / RAG" | "AI Product" | "Full-Stack" | "Machine Learning" | "MLOps";

export interface Project {
  slug: string;
  title: string;
  description: string;
  category: ProjectCategory;
  technologies: string[];
  github?: string;
  liveUrl?: string;
  demo?: string;
  featured?: boolean;
  hasIframe?: boolean;
  metrics?: Record<string, string>;
}

export const projects: Project[] = [
  {
    slug: "flow-ai",
    title: "Flow AI",
    description: "An AI-powered personal management platform designed to help users organize time, manage money, and make better day-to-day decisions.",
    category: "AI / Productivity",
    technologies: ["Next.js", "TypeScript", "AI", "LLMs", "Backend", "Database"],
    liveUrl: "https://flow-ai-time-and-money-management.vercel.app/",
    featured: true,
  },
  {
    slug: "thinkit-ai",
    title: "ThinkIT AI",
    description: "An AI-powered collaborative learning platform where groups can discuss topics, ask questions, and use AI assistance as part of the learning process.",
    category: "AI / Education",
    technologies: ["Next.js", "TypeScript", "AI", "Backend"],
    liveUrl: "https://thinkit.cubix.codes/",
    featured: true,
  },
  {
    slug: "roastle-ai",
    title: "Roastle AI",
    description: "An AI-powered habit tracking platform designed to help users build consistent routines and gain useful insights from their daily progress.",
    category: "AI / Productivity",
    technologies: ["Next.js", "TypeScript", "AI", "LLMs"],
    liveUrl: "https://roastle-kzegejcax-yan-ulcs-projects.vercel.app/landing",
    featured: true,
    hasIframe: false,
  },
  {
    slug: "colabo-board",
    title: "Colabo Board",
    description: "A collaborative digital workspace that turns the simplicity of sticky notes into a shared environment for organizing ideas, tasks, and discussions.",
    category: "Collaboration / Productivity",
    technologies: ["Next.js", "TypeScript", "Backend", "Database"],
    liveUrl: "https://colabo-board-rivr.vercel.app/",
    featured: true,
  },
  {
    slug: "pdf-chatbot",
    title: "PDF Chatbot",
    description: "An AI-powered document assistant that allows users to interact with PDF content through natural-language questions.",
    category: "Generative AI / RAG",
    technologies: ["Next.js", "TypeScript", "AI", "LLMs", "RAG"],
    liveUrl: "https://chat-pdf-omega-flax.vercel.app/",
    featured: true,
  },
  {
    slug: "indo-harassment-detection",
    title: "Indonesian Sexual Harassment Detection",
    description: "Transformer-based text classification research comparing IndoBERT and XLM-RoBERTa for detecting sexual harassment in Indonesian social media content.",
    category: "Machine Learning / NLP",
    technologies: ["Python", "PyTorch", "Hugging Face Transformers", "IndoBERT", "XLM-RoBERTa", "Scikit-learn"],
    metrics: {
      "Accuracy": "92.50%",
      "F1 Score": "92.61%"
    },
    featured: true,
  }
];
