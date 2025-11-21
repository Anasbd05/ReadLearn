import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import Link from "next/link";

export const FAQ = () => {
  return (
    <section id="FAQ" className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12 space-y-4 animate-fade-in">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            Everything you need to know about Fluencywave
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {/* 1 */}
            <AccordionItem
              value="item-1"
              className="bg-background border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                Is it possible to learn a language just by reading it?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                In this case, you might not even need to listen. just read as
                much (and as widely) as possible, and you will gradually get
                very proficient at it and you will build a massive vocabulary.
              </AccordionContent>
            </AccordionItem>
            <AccordionItem
              value="item-1"
              className="bg-background border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                Which languages does Fluencywave support?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                We currently support English, French, Spanish, German and
                Chinese. Each language has a curated library and full
                translation support.
              </AccordionContent>
            </AccordionItem>

            {/* 2 */}
            <AccordionItem
              value="item-2"
              className="bg-background border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                Can I import my own content?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                Yes! Add your own text, create custom stories, notes, or
                learning scripts. Build your personal reading library. Save
                unlimited content — any length.
              </AccordionContent>
            </AccordionItem>

            {/* 3 */}
            <AccordionItem
              value="item-3"
              className="bg-background border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                How does the instant translation work?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                Simply Tap or highlight any word or line in your text to see it
                instantly translated into your language. No need to switch
                between apps or look up words manually.
              </AccordionContent>
            </AccordionItem>

            {/* 4 */}
            <AccordionItem
              value="item-4"
              className="bg-background border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                What is the AI content generator?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                Our AI creates personalized reading material based on topics you
                choose, adjusted to your proficiency level. It is perfect for
                practicing specific vocabulary or exploring new subjects.
              </AccordionContent>
            </AccordionItem>

            {/* 5 */}
            <AccordionItem
              value="item-5"
              className="bg-background border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                How does the vocabulary tracking work?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                Every word you clicked on is saved to your personal vocabulary
                list. You can review them anytime.
              </AccordionContent>
            </AccordionItem>

            {/* 6 */}
            <AccordionItem
              value="item-6"
              className="bg-background border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                Can I switch between languages?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                Yes! Both plans give you access to all 5 languages, and you can
                switch between them anytime.
              </AccordionContent>
            </AccordionItem>

            {/* 7 */}
            <AccordionItem
              value="item-7"
              className="bg-background border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                Is my data safe?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                Absolutely. I take privacy seriously — all data is encrypted and
                securely stored.
              </AccordionContent>
            </AccordionItem>

            {/* 8 */}
            <AccordionItem
              value="item-8"
              className="bg-background border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                Can I cancel my subscription?
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                Yes, you can cancel your subscription at any time. Simply send
                us{" "}
                <Link
                  href="mailto:anastrying05@gmail.com"
                  className="font-bold hover:underline"
                >
                  an email
                </Link>{" "}
                and we will take care of the rest , When cancelling it will
                cancel at the end of your current billing period; you can still
                use the features until the end of your billing period.
              </AccordionContent>
            </AccordionItem>

            {/* 9 */}
            <AccordionItem
              value="item-9"
              className="bg-background border border-border rounded-lg px-6 shadow-sm hover:shadow-md transition-shadow"
            >
              <AccordionTrigger className="text-left text-lg font-semibold hover:text-primary">
                I have another question
              </AccordionTrigger>
              <AccordionContent className="text-base text-muted-foreground leading-relaxed pt-2">
                Cool, send us{" "}
                <Link
                  href="mailto:anastrying05@gmail.com"
                  className="font-bold hover:underline"
                >
                  an email
                </Link>
                .
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </div>
      </div>
    </section>
  );
};
