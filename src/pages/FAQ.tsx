import React from "react";

const faqs = [
  {
    q: "Is Ravlo really free?",
    a: "Yes! Ravlo is a side project and will always be free to use.",
  },
  {
    q: "Do you store my LinkedIn data or posts?",
    a: "No, nothing you write or generate is stored or sent to any server.",
  },
  {
    q: "Can I use Ravlo on mobile?",
    a: "Yes, Ravlo is fully responsive and works great on mobile devices.",
  },
  {
    q: "Who built Ravlo?",
    a: "Ravlo was built by Ashutosh Rai as a personal side project.",
  },
  {
    q: "How do I contact support?",
    a: "Email ashusomehow@gmail.com or use the Contact link in the footer.",
  },
];

const FAQ = () => (
  <div className="max-w-2xl mx-auto py-12 px-4">
    <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
    <div className="space-y-4">
      {faqs.map((faq, i) => (
        <details key={i} className="border rounded p-4 group transition-shadow hover:shadow-md">
          <summary className="font-semibold cursor-pointer group-open:text-primary transition-colors">{faq.q}</summary>
          <div className="mt-2 text-muted-foreground">{faq.a}</div>
        </details>
      ))}
    </div>
  </div>
);

export default FAQ; 