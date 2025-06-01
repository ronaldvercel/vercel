import HeroSection from "./hero";
import HowItWorksSection from "./howitworks";
import AboutSection from "./aboutsection";
import AccessInstructionsSection from "./accessinstructionsection";
import FeaturedJobsSection from "./featurejobsection";
import TestimonialsSection from "./testimonialssection";
import FAQSection from "./faq";

const Landing = () => {
  return (
    <main>
      <HeroSection />
      <HowItWorksSection />
      <AboutSection />
      <AccessInstructionsSection />
      <FeaturedJobsSection />
      <FAQSection />/
      <TestimonialsSection />
    </main>
  );
};
export default Landing;
