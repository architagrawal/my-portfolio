"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveCard from "@/components/interactive-card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Download, Copy, Check } from "lucide-react";

// ... imports ...
export default function Contact() {
  const [copied, setCopied] = useState(false);
  const email = "ARCHITAGRAWAL000@GMAIL.COM";

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  return (
    <section id="contact" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
           viewport={{ once: true }}
           className="text-center mb-12"
         >
           <h2 className="text-3xl sm:text-4xl font-bold mb-4 text-foreground">
             Get In Touch
           </h2>
           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
             Let&apos;s collaborate on your next project or discuss opportunities
           </p>
         </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div>
              <h3 className="text-2xl font-semibold mb-6 text-center text-foreground">
                Contact Information
              </h3>
              <div className="grid sm:grid-cols-2 gap-6">
                <InteractiveCard
                  InteractiveColor="hsl(var(--primary))"
                  className="border-2 hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm relative rounded-none"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 h-8 w-8 hover:bg-primary/20 text-muted-foreground hover:text-primary rounded-none"
                    title="Copy email to clipboard"
                    aria-label={copied ? "Email copied" : "Copy email to clipboard"}
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-secondary" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </Button>
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-primary/10 border border-primary/20 flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-primary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">
                      Email
                    </h4>
                    <a
                      href={`mailto:${email}`}
                      className="text-muted-foreground hover:text-primary transition-colors font-tech text-sm"
                    >
                      {email}
                    </a>
                  </div>
                </InteractiveCard>

                <InteractiveCard
                  InteractiveColor="hsl(var(--secondary))"
                  className="border-2 hover:border-secondary/50 transition-colors bg-background/50 backdrop-blur-sm rounded-none"
                >
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-secondary/10 border border-secondary/20 flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-6 h-6 text-secondary" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">
                      Location
                    </h4>
                    <p className="text-muted-foreground">USA</p>
                  </div>
                </InteractiveCard>
              </div>
            </div>

            <InteractiveCard
              InteractiveColor="hsl(var(--primary))"
              className="border-2 border-dashed border-border hover:border-primary/50 transition-colors bg-background/50 backdrop-blur-sm rounded-none"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center text-foreground">
                  <Download className="w-5 h-5 text-primary" />
                  Resume
                </CardTitle>
              </CardHeader>
              <div className="text-center p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Download my latest resume to learn more about my experience
                  and skills.
                </p>
                <Button
                  className="bg-primary hover:bg-primary/90 text-primary-foreground rounded-none"
                  asChild
                >
                  <a
                    href="/Archit_Agrawal_Resume.pdf"
                    download="Archit_Agrawal_Resume.pdf"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </InteractiveCard>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
