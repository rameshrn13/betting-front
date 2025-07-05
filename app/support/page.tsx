"use client";

import { motion } from "framer-motion";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { HelpCircle, MessageCircle, Mail, Phone } from "lucide-react";

const faqs = [
  {
    question: "How do I deposit money?",
    answer:
      'You can deposit money using various payment methods including UPI, Net Banking, and Credit/Debit cards. Go to the Wallet section and click on "Deposit" to get started.',
  },
  {
    question: "What is the minimum withdrawal amount?",
    answer:
      "The minimum withdrawal amount is ₹1,000. Withdrawals are processed within 24 hours and sent to your registered bank account or UPI ID.",
  },
  {
    question: "How does the Aviator game work?",
    answer:
      "Aviator is a multiplier game where you bet and watch the multiplier increase. Cash out before the plane flies away to win. The longer you wait, the higher the potential winnings, but also the higher the risk.",
  },
  {
    question: "Is my money safe?",
    answer:
      "Yes, we use industry-standard security measures to protect your funds. All transactions are encrypted and we maintain separate accounts for operational and player funds.",
  },
  {
    question: "What happens if I lose my internet connection during a game?",
    answer:
      "Our system automatically protects your bets in case of disconnection. For Aviator, if you have auto-cashout enabled, it will still work. For other games, your bet will be processed based on the last confirmed action.",
  },
  {
    question: "How do I verify game fairness?",
    answer:
      "Each game round has a unique hash that can be verified. Visit our Fair Play page to learn more about our provably fair system and how to verify results.",
  },
];

export default function SupportPage() {
  return (
    <motion.div
      className="min-h-screen bg-background p-6"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-7xl mx-auto space-y-8">
        <motion.div
          className="text-center space-y-4"
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold flex items-center justify-center gap-2">
            <HelpCircle className="w-10 h-10" />
            Help & Support
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Get help with your account, games, or transactions
          </p>
        </motion.div>

        {/* Contact Options */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[
            {
              icon: <MessageCircle className="w-5 h-5" />,
              title: "Live Chat",
              desc: "24/7 instant support",
              button: "Start Chat",
            },
            {
              icon: <Mail className="w-5 h-5" />,
              title: "Email Support",
              desc: "Response within 24 hours",
              button: "support@NexusBet.com",
            },
            {
              icon: <Phone className="w-5 h-5" />,
              title: "Phone Support",
              desc: "Available 9 AM - 6 PM",
              button: "+1 (800) 123-4567",
            },
          ].map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {item.icon}
                    {item.title}
                  </CardTitle>
                  <CardDescription>{item.desc}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    className="w-full"
                    variant={index === 0 ? "default" : "outline"}
                  >
                    {item.button}
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Send us a message</CardTitle>
              <CardDescription>
                Fill out the form below and we'll get back to you as soon as
                possible
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input placeholder="Your name" />
                  <Input type="email" placeholder="your@email.com" />
                </div>
                <Input placeholder="What's this about?" />
                <Textarea
                  placeholder="Describe your issue in detail..."
                  className="min-h-[100px]"
                />
                <Button className="w-full">Send Message</Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* FAQs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Card>
            <CardHeader>
              <CardTitle>Frequently Asked Questions</CardTitle>
              <CardDescription>
                Quick answers to common questions
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {faqs.map((faq, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{faq.question}</AccordionTrigger>
                    <AccordionContent>{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </motion.div>
  );
}
