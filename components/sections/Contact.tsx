"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mail, MapPin, Download } from "lucide-react";

export default function Contact() {
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
            Let's collaborate on your next project or discuss opportunities
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
                <Card className="border-2 hover:border-blue-200 dark:hover:border-blue-800 transition-colors bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-6 h-6 text-blue-600" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">
                      Email
                    </h4>
                    <a
                      href="mailto:ARCHITAGRAWAL000@GMAIL.COM"
                      className="text-muted-foreground hover:text-blue-600 transition-colors"
                    >
                      ARCHITAGRAWAL000@GMAIL.COM
                    </a>
                  </CardContent>
                </Card>

                <Card className="border-2 hover:border-purple-200 dark:hover:border-purple-800 transition-colors bg-background/50 backdrop-blur-sm">
                  <CardContent className="p-6 text-center">
                    <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/20 rounded-lg flex items-center justify-center mx-auto mb-4">
                      <MapPin className="w-6 h-6 text-purple-600" />
                    </div>
                    <h4 className="font-semibold mb-2 text-foreground">
                      Location
                    </h4>
                    <p className="text-muted-foreground">USA</p>
                  </CardContent>
                </Card>
              </div>
            </div>

            <Card className="border-2 border-dashed border-gray-300 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-700 transition-colors bg-background/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 justify-center text-foreground">
                  <Download className="w-5 h-5" />
                  Resume
                </CardTitle>
              </CardHeader>
              <CardContent className="text-center">
                <p className="text-sm text-muted-foreground mb-4">
                  Download my latest resume to learn more about my experience
                  and skills.
                </p>
                <Button
                  className="bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700 text-white"
                  asChild
                >
                  <a
                    href="https://drive.google.com/file/d/1S1zcEHA_JoC5-1vRWfdOzW6_JfP9-QQw/view?usp=sharing"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    Download Resume
                  </a>
                </Button>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
