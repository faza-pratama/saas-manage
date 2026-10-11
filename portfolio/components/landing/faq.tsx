"use client";

import * as React from "react";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import * as AccordionPrimitive from "@radix-ui/react-accordion";

const Accordion = AccordionPrimitive.Root;
const AccordionItem = AccordionPrimitive.Item;
const AccordionTrigger = AccordionPrimitive.Trigger;
const AccordionContent = AccordionPrimitive.Content;

const faqs = [
  {
    question: "What's included in the free trial?",
    answer: "Our 14-day free trial gives you full access to all Pro features — unlimited projects, tasks, team members, advanced analytics, and priority support. No credit card required to start.",
  },
  {
    question: "Can I change plans later?",
    answer: "Yes, you can upgrade or downgrade your plan at any time. Upgrades take effect immediately, while downgrades take effect at the start of your next billing cycle. We'll prorate any difference.",
  },
  {
    question: "How does per-user billing work?",
    answer: "On the Pro plan, you're billed monthly for each active team member in your workspace. Adding or removing members automatically adjusts your next invoice. Inactive members don't count toward your bill.",
  },
  {
    question: "Is my data secure?",
    answer: "Absolutely. We use bank-grade encryption (AES-256 at rest, TLS 1.3 in transit), SOC 2 Type II certified infrastructure, and regular third-party security audits. Your data is never sold or shared with third parties.",
  },
  {
    question: "Can I import data from other tools?",
    answer: "Yes! We support imports from Jira, Asana, Trello, ClickUp, Notion, and CSV files. The import process preserves project structure, task history, assignees, and due dates.",
  },
  {
    question: "What integrations are available?",
    answer: "NexaFlow integrates with GitHub, GitLab, Slack, Microsoft Teams, Figma, Google Drive, and 50+ other tools via native integrations and Zapier. Custom webhooks and API access are available on Pro and Enterprise plans.",
  },
  {
    question: "Do you offer discounts for nonprofits or education?",
    answer: "Yes! We offer a 50% discount for qualified nonprofit organizations and educational institutions. Contact our sales team with your organization details to apply.",
  },
  {
    question: "What's your cancellation policy?",
    answer: "You can cancel anytime from your workspace settings. Your access continues until the end of your current billing period. We don't charge cancellation fees or lock you into contracts.",
  },
];

export function FAQ() {
  return (
    <section id="faq" className="py-20 lg:py-32 bg-muted/30">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Everything you need to know about NexaFlow. Can&apos;t find your answer?{" "}
            <a href="/auth/signup" className="text-primary hover:underline font-medium">
              Contact us
            </a>
            .
          </p>
        </div>

        <Accordion type="single" collapsible className="space-y-4">
          {faqs.map((faq, index) => (
            <AccordionItem key={index} value={index.toString()}>
              <AccordionTrigger className={cn(
                "flex w-full items-center justify-between py-4 text-left text-lg font-medium transition-colors hover:underline [&[data-state=open]>svg]:rotate-180"
              )}>
                {faq.question}
                <ChevronDown className="h-5 w-5 text-muted-foreground transition-transform duration-200 flex-shrink-0 ml-4" />
              </AccordionTrigger>
              <AccordionContent className="pb-4 text-muted-foreground leading-relaxed">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}