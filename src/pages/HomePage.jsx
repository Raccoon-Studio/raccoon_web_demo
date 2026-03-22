import Hero from "../components/home/Hero";
import ServiceMarquee from "../components/home/ServiceMarquee";
import Services from "../components/home/Services";
import HowWeWork from "../components/home/HowWeWork";
import Portfolio from "../components/home/Portfolio";
import TechStack from "../components/home/TechStack";
import Testimonials from "../components/home/Testimonials";
import Stats from "../components/home/Stats";
import CTA from "../components/home/CTA";

export default function HomePage() {
  return (
    <main>
      <Hero />
      <ServiceMarquee />
      <Services />
      <HowWeWork />
      <Portfolio />
      <TechStack />
      <Testimonials />
      <Stats />
      <CTA />
    </main>
  );
}
