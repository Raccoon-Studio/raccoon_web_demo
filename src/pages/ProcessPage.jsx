import ProcessHero from "../components/process/ProcessHero";
import ProcessPhilosophy from "../components/process/ProcessPhilosophy";
import ProcessStats from "../components/process/ProcessStats";
import ProcessTimeline from "../components/process/ProcessTimeline";
import ProcessCommunication from "../components/process/ProcessCommunication";
import ProcessToolchain from "../components/process/ProcessToolchain";
import ProcessQA from "../components/process/ProcessQA";
import ProcessPostLaunch from "../components/process/ProcessPostLaunch";
import ProcessPricing from "../components/process/ProcessPricing";
import ProcessFAQ from "../components/process/ProcessFAQ";
import ProcessCTA from "../components/process/ProcessCTA";

export default function ProcessPage() {
  return (
    <main className="bg-dark text-text-primary mt-20">
      <ProcessHero />
      <ProcessPhilosophy />
      <ProcessStats />
      <ProcessTimeline />
      <ProcessCommunication />
      <ProcessToolchain />
      <ProcessQA />
      <ProcessPostLaunch />
      <ProcessPricing />
      <ProcessFAQ />
      <ProcessCTA />
    </main>
  );
}
