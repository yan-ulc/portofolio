"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Send,
  Mail,
  CheckCircle2,
  AlertCircle,
  Check,
  Copy,
  MapPin,
} from "lucide-react";
import { Github, Linkedin } from "@/components/icons";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .max(120, "Subject cannot exceed 120 characters")
    .optional(),
  content: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const sendMessage = useMutation(api.messages.sendMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactFormValues) => {
    try {
      setIsSubmitting(true);
      setErrorMessage(null);
      await sendMessage({
        name: data.name,
        email: data.email,
        subject: data.subject?.trim() || undefined,
        content: data.content,
      });
      setIsSuccess(true);
      reset();
    } catch (error) {
      console.error("Failed to send message:", error);
      setErrorMessage(
        "Failed to send your message. Please try again or email directly to muhammad7135@gmail.com",
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopyEmail = () => {
    navigator.clipboard.writeText("muhammad7135@gmail.com");
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  return (
    <section
      id="contact"
      className="w-full py-24 px-4 bg-muted/30 border-t border-border/50"
    >
      <div className="container mx-auto max-w-5xl">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl font-bold tracking-tight mb-16 flex items-center gap-4"
        >
          <span className="w-8 h-[2px] bg-primary"></span>
          Get In Touch
        </motion.h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col gap-6"
          >
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 font-mono text-xs font-medium text-emerald-500 w-fit">
              <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
              Available for full-time & freelance projects
            </div>

            <h3 className="text-3xl font-semibold leading-tight">
              Let&apos;s build something great.
            </h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I am currently open for new opportunities, engineering roles,
              collaborations, and consulting projects. Whether you have a
              question or an exciting project idea, I&apos;d love to connect!
            </p>

            <div className="flex flex-col gap-4 mt-2">
              <div className="flex items-center justify-between rounded-xl border bg-background/80 p-3 pr-4 shadow-sm">
                <a
                  href="mailto:muhammad7135@gmail.com"
                  className="flex items-center gap-3 text-muted-foreground hover:text-primary transition-colors"
                >
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <span className="font-medium text-sm sm:text-base">
                    muhammad7135@gmail.com
                  </span>
                </a>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyEmail}
                  className="h-8 gap-1.5 text-xs text-muted-foreground hover:text-foreground"
                >
                  {copiedEmail ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-500" />
                      <span className="text-emerald-500 font-medium">
                        Copied
                      </span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy</span>
                    </>
                  )}
                </Button>
              </div>

              <a
                href="https://github.com/yan-ulc"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border bg-background/80 p-3 shadow-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
                  <Github className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm sm:text-base text-foreground">
                    github.com/yan-ulc
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Source code & repositories
                  </span>
                </div>
              </a>

              <a
                href="https://linkedin.com/in/yan-ulc"
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-3 rounded-xl border bg-background/80 p-3 shadow-sm text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center group-hover:border-primary transition-colors shrink-0">
                  <Linkedin className="w-5 h-5" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm sm:text-base text-foreground">
                    LinkedIn Profile
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Professional network & background
                  </span>
                </div>
              </a>

              <div className="flex items-center gap-3 rounded-xl border bg-background/80 p-3 shadow-sm text-muted-foreground">
                <div className="w-10 h-10 rounded-full bg-background border flex items-center justify-center shrink-0">
                  <MapPin className="w-5 h-5 text-primary" />
                </div>
                <div className="flex flex-col">
                  <span className="font-medium text-sm sm:text-base text-foreground">
                    Banda Aceh, Indonesia
                  </span>
                  <span className="text-xs text-muted-foreground">
                    Available for Remote & Relocation
                  </span>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-background p-8 rounded-2xl border shadow-sm h-fit relative overflow-hidden"
          >
            {isSuccess ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center justify-center text-center gap-4 py-12"
              >
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center text-primary mb-4">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h4 className="text-2xl font-semibold">Message Sent!</h4>
                <p className="text-muted-foreground text-lg max-w-sm">
                  Thank you for reaching out. I&apos;ll get back to you as soon
                  as possible.
                </p>
                <Button
                  variant="outline"
                  onClick={() => setIsSuccess(false)}
                  className="mt-4 gap-2"
                >
                  Send Another Message
                </Button>
              </motion.div>
            ) : (
              <form
                className="flex flex-col gap-5"
                onSubmit={handleSubmit(onSubmit)}
              >
                {errorMessage && (
                  <div className="flex items-center gap-3 rounded-lg border border-destructive/50 bg-destructive/10 p-4 text-sm text-destructive">
                    <AlertCircle className="w-5 h-5 shrink-0" />
                    <span>{errorMessage}</span>
                  </div>
                )}

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="name"
                    className="text-sm font-semibold text-foreground/90"
                  >
                    Name <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="name"
                    placeholder="Your Name"
                    className={`bg-muted/50 h-12 ${
                      errors.name ? "border-destructive" : ""
                    }`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-xs text-destructive">
                      {errors.name.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="email"
                    className="text-sm font-semibold text-foreground/90"
                  >
                    Email <span className="text-destructive">*</span>
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    className={`bg-muted/50 h-12 ${
                      errors.email ? "border-destructive" : ""
                    }`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-xs text-destructive">
                      {errors.email.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="subject"
                    className="text-sm font-semibold text-foreground/90"
                  >
                    Subject{" "}
                    <span className="text-xs font-normal text-muted-foreground">
                      (Optional)
                    </span>
                  </label>
                  <Input
                    id="subject"
                    placeholder="e.g. Project Opportunity, Freelance Inquiry"
                    className={`bg-muted/50 h-12 ${
                      errors.subject ? "border-destructive" : ""
                    }`}
                    {...register("subject")}
                  />
                  {errors.subject && (
                    <span className="text-xs text-destructive">
                      {errors.subject.message}
                    </span>
                  )}
                </div>

                <div className="flex flex-col gap-2">
                  <label
                    htmlFor="content"
                    className="text-sm font-semibold text-foreground/90"
                  >
                    Message <span className="text-destructive">*</span>
                  </label>
                  <Textarea
                    id="content"
                    placeholder="How can I help you?"
                    className={`min-h-[140px] bg-muted/50 resize-y ${
                      errors.content ? "border-destructive" : ""
                    }`}
                    {...register("content")}
                  />
                  {errors.content && (
                    <span className="text-xs text-destructive">
                      {errors.content.message}
                    </span>
                  )}
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full gap-2 mt-2 h-12 text-base transition-all cursor-pointer"
                  size="lg"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                  {!isSubmitting && <Send className="w-4 h-4" />}
                </Button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
