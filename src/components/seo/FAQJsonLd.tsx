import { JsonLd } from "./JsonLd";

interface FAQJsonLdProps {
  questions: Array<{ question: string; answer: string }>;
}

export function FAQJsonLd({ questions }: FAQJsonLdProps) {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: questions.map((q) => ({
          "@type": "Question",
          name: q.question,
          acceptedAnswer: {
            "@type": "Answer",
            text: q.answer,
          },
        })),
      }}
    />
  );
}
