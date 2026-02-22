import { lazy, Suspense } from 'react';
import SmoothScroll from './components/layout/SmoothScroll';
import CustomCursor from './components/layout/CustomCursor';
import SoftOverlay from './components/layout/SoftOverlay';
import Navigation from './components/layout/Navigation';
import SectionNav from './components/layout/SectionNav';
import FixedCTA from './components/layout/FixedCTA';
import Footer from './components/layout/Footer';

import HeroSection from './components/acts/HeroSection';
import AwardsSection from './components/acts/AwardsSection';
import BrandStory from './components/acts/BrandStory';
import ConceptSection from './components/acts/ConceptSection';
import FeatureShowcase from './components/acts/FeatureShowcase';
import TechnologySection from './components/acts/TechnologySection';
import IngredientsSection from './components/acts/IngredientsSection';
import TextureSection from './components/acts/TextureSection';
import ShadesSection from './components/acts/ShadesSection';
import HowToUse from './components/acts/HowToUse';
import FragranceSection from './components/acts/FragranceSection';
import ReviewsSection from './components/acts/ReviewsSection';
import SustainabilitySection from './components/acts/SustainabilitySection';
import FaqSection from './components/acts/FaqSection';
import PurchaseSection from './components/acts/PurchaseSection';
import RelatedSection from './components/acts/RelatedSection';

const FloatingProduct = lazy(() => import('./components/three/FloatingProduct'));
const ParticleRose = lazy(() => import('./components/three/ParticleRose'));

function App() {
  return (
    <SmoothScroll>
      <CustomCursor />
      <SoftOverlay />
      <Navigation />
      <SectionNav />

      <main>
        <HeroSection />
        <AwardsSection />
        <BrandStory />
        <ConceptSection />
        <FeatureShowcase />
        <TechnologySection />
        <IngredientsSection />
        <TextureSection />
        <ShadesSection />
        <HowToUse />
        <FragranceSection />
        <ReviewsSection />
        <SustainabilitySection />
        <FaqSection />
        <PurchaseSection />
        <RelatedSection />
      </main>

      <Footer />
      <FixedCTA />
    </SmoothScroll>
  );
}

export default App;
