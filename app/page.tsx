import Introduction from "@/components/Introduction/Introduction";
import ModernTimeline from "@/components/CV/ModernTimeline/ModernTimeline";
import About from "@/components/About/About";
import SoftwareExperience from "@/components/SoftwareExperience/SoftwareExperience";
import FeaturedWork from "@/components/FeaturedWork/FeaturedWork";
import Contact from "@/components/Homepage/Contact";

export default function HomePage() {
  return (
    <>
      <Introduction />
      <FeaturedWork />
      <About />
      <ModernTimeline />
      <SoftwareExperience />
      <Contact />
    </>
  );
}
