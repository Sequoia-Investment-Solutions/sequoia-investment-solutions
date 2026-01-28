import { Quote } from "lucide-react";

const testimonials = [
  {
    quote: "Sequoia has transformed how we manage our clients' investments. The reporting alone saves us hours each week, and the performance speaks for itself.",
    author: "Sarah Mitchell",
    role: "IFA Director",
    company: "Mitchell & Associates",
  },
  {
    quote: "What sets Sequoia apart is their genuine understanding of adviser needs. They're not just an investment manager—they're a true partner in growing our business.",
    author: "James Thornton",
    role: "Senior Adviser",
    company: "Thornton Wealth Planning",
  },
  {
    quote: "The model portfolio service has allowed us to offer institutional-quality investments to all our clients, regardless of portfolio size. It's been a game-changer.",
    author: "Emma Richardson",
    role: "Managing Partner",
    company: "Richardson Financial",
  },
];

export function Testimonials() {
  return (
    <section className="py-20 lg:py-28 hero-gradient">
      <div className="container">
        <div className="text-center mb-14">
          <h2 className="text-3xl md:text-4xl font-bold text-primary-foreground mb-4">
            Trusted by Leading Advisers
          </h2>
          <p className="text-lg text-primary-foreground/70 max-w-2xl mx-auto">
            Hear from advisers who have partnered with Sequoia to deliver better outcomes for their clients.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((testimonial, index) => (
            <div 
              key={testimonial.author}
              className="p-6 lg:p-8 rounded-xl bg-background/5 backdrop-blur-sm border border-background/10"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <Quote className="h-8 w-8 text-accent mb-4" />
              <blockquote className="text-primary-foreground/90 leading-relaxed mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="border-t border-background/10 pt-4">
                <p className="font-semibold text-primary-foreground">
                  {testimonial.author}
                </p>
                <p className="text-sm text-primary-foreground/60">
                  {testimonial.role}, {testimonial.company}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
