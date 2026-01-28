import { Layout } from "@/components/layout/Layout";
import { Hero } from "@/components/home/Hero";
import { WhySequoia } from "@/components/home/WhySequoia";
import { FundCards } from "@/components/home/FundCards";
import { Testimonials } from "@/components/home/Testimonials";
import { CTASection } from "@/components/home/CTASection";

const Index = () => {
  return (
    <Layout>
      <Hero />
      <WhySequoia />
      <FundCards />
      <Testimonials />
      <CTASection />
    </Layout>
  );
};

export default Index;
