"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import InteractiveCard from "@/components/interactive-card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Download, Copy, Check } from "lucide-react";

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
                  InteractiveColor="#02327a" /* very light neon-cyan */
                  className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors bg-background/50 backdrop-blur-sm relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={copyToClipboard}
                    className="absolute top-2 right-2 h-8 w-8 hover:bg-blue-100 dark:hover:bg-blue-900/20"
                    title="Copy email to clipboard"
                  >
                    {copied ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <Copy className="w-4 h-4 text-blue-600" />
                    )}
                  </Button>
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">
                      Email
                    </h4>
                    <a
                      href={`mailto:${email}`}
                      className="text-muted-foreground hover:text-blue-600 transition-colors"
                    >
                      {email}
                    </a>
                  </div>
                </InteractiveCard>

                <InteractiveCard
                  InteractiveColor="#5c014b" /* very light lavender */
                  className="border-2 hover:border-purple-200 dark:hover:border-purple-800 transition-colors bg-background/50 backdrop-blur-sm"
                >
                  <div className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-6 h-6 text-purple-600" />
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
              InteractiveColor="#6342f5"
              className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-background/50 backdrop-blur-sm"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center text-foreground">
                  <Download className="w-5 h-5" />
                  Resume
                </CardTitle>
              </CardHeader>
              <div className="text-center p-6">
                <p className="text-sm text-muted-foreground mb-4">
                  Download my latest resume to learn more about my experience
                  and skills.
                </p>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
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
