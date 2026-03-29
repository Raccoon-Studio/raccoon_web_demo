import WorkHero from "../components/work/WorkHero";
import FeaturedProjects from "../components/work/FeaturedProjects";
import ProjectGrid from "../components/work/ProjectGrid";
import ResultsSection from "../components/work/ResultsSection";
import MethodologySection from "../components/work/MethodologySection";
import TechStackSection from "../components/work/TechStackSection";
import AwardsSection from "../components/work/AwardsSection";
import TrustSection from "../components/work/TrustSection";
import WorkCTA from "../components/work/WorkCTA";

export default function WorkPage() {
  return (
    <section id="work" className="relative bg-dark overflow-hidden">
      {/* BG Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1100px] h-[600px] bg-accent/[0.01] rounded-full blur-[180px]" />
        <div className="absolute bottom-1/4 right-0 w-[500px] h-[400px] bg-cyan/[0.008] rounded-full blur-[140px]" />
        <div className="absolute top-1/2 left-0 w-[400px] h-[350px] bg-violet-500/[0.006] rounded-full blur-[120px]" />
      </div>

      <div className="absolute inset-0 pointer-events-none opacity-[0.015]">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px",
          }}
        />
      </div>

      {/* 1. Hero */}
      <WorkHero />

      {/* 2. Featured Case Studies */}
      <FeaturedProjects />

      {/* 3. Project Grid */}
      <ProjectGrid />

      {/* 4. Industries */}
      <ResultsSection />

      {/* 5. Methodology */}
      <MethodologySection />

      {/* 6. Tech Stack */}
      <TechStackSection />

      {/* 7. Awards */}
      <AwardsSection />

      {/* 8. Trust & Guarantees */}
      <TrustSection />

      {/* 9. CTA */}
      <WorkCTA />
    </section>
  );
}
