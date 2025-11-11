import Breadcrumb from "@/components/layout/breadcrumb";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const faqs = [
  {
    question: "What is a custom wig?",
    answer: "A custom wig is constructed based off of your head measurements to fit you. Custom Wigs are not one size fits all."
  },
  {
    question: "What is the turnaround time for a custom wig?",
    answer: "Please allow 14-21 business days after processing for the completion of your wig. Rush service is not available."
  },
  {
    question: "What is a Ready to Ship Wig?",
    answer: "A Ready to Ship Wig are either machine-made by me or factory made. These wigs are available and ready to ship/pick up within 1-2 days. Ready to Ship Wigs are only available when listed under the 'Ready to Ship' tab."
  },
  {
    question: "Can I ship my hair to you to get a wig made?",
    answer: "You can ship your hair to me, but you are responsible for any shipping fees. Visit the 'Book a Wig Appointment' section to on the homepage to book an appointment."
  },
  {
    question: "How should I wear my hair underneath my wig?",
    answer: "To ensure the most flat and natural application, your hair should be cornrowed (small to medium size). Wig caps are highly suggested but are optional to wear underneath your wig."
  },
  {
    question: "How long will my wig last?",
    answer: "With proper care and maintenance, your wig can last 2+ years. This means minimum heat use, regular washing/conditioning, and no rough handling. For tips on how to care for your wig, visit the 'Hair Care Tips' tab."
  },
  {
    question: "Do your wigs come with a plucked hairline?",
    answer: "All wigs are bleached and plucked for a natural and flawless look."
  },
  {
    question: "Do you ship worldwide?",
    answer: "Yes, free shipping is available on all orders placed over $400. For international orders, extra shipping fees are applied."
  },
  {
    question: "What is your return policy?",
    answer: "Due to sanitary reasons, exchanges and returns are not accepted. Wigs are non-refundable. If there is a mistake on my behalf, I will happily accept the hair back in it's original state in return for your correct order within 3 days of receiving. Bria Janae has the right to decline items if they have been tampered with or sent back past the 3 day period."
  },
  {
    question: "I ordered the wrong size wig, what do I do?",
    answer: "Bria Janae is not responsible for any improperly fitted wigs. Before purchasing wigs, please be sure to properly measure your head. For the most accurate results, you will need to have a flat foundation. If the wrong head circumference is entered, you will be responsible for any reconstruction and shipping fees (if needed)."
  },
  {
    question: "This is my first wig. What type of wig should I get?",
    answer: "For beginners, lace closure wigs are highly recommended. Lace closure wigs are easy to maintain, require less maintenance and can be worn 100% glueless."
  },
  {
    question: "What is the difference between a custom wig and a factory made wig?",
    answer: "Custom wigs are machine made wigs according to your head measurements. One size does not fit all. A factory made wig is a wig that is already constructed/premade by the manufacturer which comes in the sizes S, M, and L."
  }
]


export default function FAQPage() {
  return (
    <div className="container py-12 md:py-24">
      <Breadcrumb />
      <div className="text-center mb-12">
        <h1 className="text-4xl sm:text-6xl font-headline tracking-tight">Frequently Asked Questions</h1>
        <p className="mt-4 max-w-2xl mx-auto text-lg text-muted-foreground">
          Have questions? We have answers.
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <Accordion type="single" collapsible className="w-full">
          {faqs.map((faq, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-lg font-semibold text-left hover:no-underline">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="text-lg text-muted-foreground">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  );
}
