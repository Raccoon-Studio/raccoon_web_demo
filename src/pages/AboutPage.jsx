import AboutHero from "../components/about/AboutHero";
import StorySection from "../components/about/StorySection";
import ValuesSection from "../components/about/ValuesSection";
import LeadershipSection from "../components/about/LeadershipSection";
import FullTeamSection from "../components/about/FullTeamSection";
import TimelineSection from "../components/about/TimelineSection";
import CultureSection from "../components/about/CultureSection";
import CareersSection from "../components/about/CareersSection";
import AboutCTA from "../components/about/AboutCTA";

export default function AboutPage() {
  return (
    <section id="about" className="relative bg-dark overflow-hidden">
      {/* BG Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-accent/[0.01] rounded-full blur-[180px]" />
        <div className="absolute bottom-1/3 right-0 w-[500px] h-[400px] bg-cyan/[0.008] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[350px] bg-violet-500/[0.006] rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)`,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* 1. Hero */}
      <AboutHero />

      {/* 2. Story + Mission/Vision */}
      <StorySection />

      {/* 3. Values */}
      <ValuesSection />

      {/* 4. Leadership */}
      <LeadershipSection />

      {/* 5. Full Team */}
      <FullTeamSection />

      {/* 6. Timeline */}
      <TimelineSection />

      {/* 7. Culture */}
      <CultureSection />

      {/* 8. Careers */}
      <CareersSection />

      {/* 9. CTA */}
      <AboutCTA />
    </section>
  );
}
