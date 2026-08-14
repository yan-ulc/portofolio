"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Send, Mail, CheckCircle2 } from "lucide-react";
import { Github } from "@/components/icons";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion } from "motion/react";

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  content: z.string().min(10, "Message must be at least 10 characters"),
});

type ContactFormValues = z.infer<typeof contactSchema>;

export function ContactSection() {
  const sendMessage = useMutation(api.messages.sendMessage);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

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
      await sendMessage({
        name: data.name,
        email: data.email,
        content: data.content,
      });
      setIsSuccess(true);
      reset();
      setTimeout(() => setIsSuccess(false), 5000);
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="w-full py-24 px-4 bg-muted/30 border-t border-border/50">
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
            className="flex flex-col gap-8"
          >
            <h3 className="text-3xl font-semibold leading-tight">Let&apos;s talk.</h3>
            <p className="text-muted-foreground text-lg leading-relaxed">
              I am currently open for new opportunities, collaborations, and freelance projects. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
            </p>
            
            <div className="flex flex-col gap-6 mt-4">
              <a href="mailto:muhammad7135@gmail.com" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-full bg-background border flex items-center justify-center group-hover:border-primary transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <span className="font-medium text-lg">muhammad7135@gmail.com</span>
              </a>
              <a href="https://github.com/yan-ulc" target="_blank" rel="noreferrer" className="flex items-center gap-4 text-muted-foreground hover:text-primary transition-colors group">
                <div className="w-12 h-12 rounded-full bg-background border flex items-center justify-center group-hover:border-primary transition-colors">
                  <Github className="w-5 h-5" />
                </div>
                <span className="font-medium text-lg">github.com/yan-ulc</span>
              </a>
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
                <p className="text-muted-foreground text-lg">Thank you for reaching out. I&apos;ll get back to you as soon as possible.</p>
              </motion.div>
            ) : (
              <form className="flex flex-col gap-6" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-sm font-semibold text-foreground/90">Name</label>
                  <Input 
                    id="name" 
                    placeholder="John Doe" 
                    className={`bg-muted/50 h-12 ${errors.name ? "border-destructive" : ""}`}
                    {...register("name")}
                  />
                  {errors.name && (
                    <span className="text-xs text-destructive">{errors.name.message}</span>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="text-sm font-semibold text-foreground/90">Email</label>
                  <Input 
                    id="email" 
                    type="email" 
                    placeholder="john@example.com" 
                    className={`bg-muted/50 h-12 ${errors.email ? "border-destructive" : ""}`}
                    {...register("email")}
                  />
                  {errors.email && (
                    <span className="text-xs text-destructive">{errors.email.message}</span>
                  )}
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="content" className="text-sm font-semibold text-foreground/90">Message</label>
                  <Textarea 
                    id="content" 
                    placeholder="How can I help you?" 
                    className={`min-h-[150px] bg-muted/50 resize-y ${errors.content ? "border-destructive" : ""}`}
                    {...register("content")}
                  />
                  {errors.content && (
                    <span className="text-xs text-destructive">{errors.content.message}</span>
                  )}
                </div>
                
                <Button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="w-full gap-2 mt-4 h-12 text-base transition-all" 
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
  )
}
