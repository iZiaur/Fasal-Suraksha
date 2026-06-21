import Navbar from '../components/Navbar';
import Hero from '../components/Hero';
import HowItWorks from '../components/HowItWorks';
import Mission from '../components/Mission';
import LiveMonitoring from '../components/LiveMonitoring';
import ImpactInnovation from '../components/ImpactInnovation';
import CoveragePlans from '../components/CoveragePlans';
import CrisisSection from '../components/CrisisSection';
import TeamSection from '../components/TeamSection';
import TechStackSection from '../components/TechStackSection';
import CTAFooter from '../components/CTAFooter';

export default function LandingPage() {
  return (
    <>
      <Navbar />
      <Hero />
      <CrisisSection />
      <HowItWorks />
      <Mission />
      <LiveMonitoring />
      <ImpactInnovation />
      <CoveragePlans />
      <TechStackSection />
      <TeamSection />
      <CTAFooter />
    </>
  );
}
