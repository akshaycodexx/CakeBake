import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useEffect, useState } from 'react';
import { CakeGallery } from './components/CakeGallery';
import { Categories } from './components/Categories';
import { ContactCTA } from './components/ContactCTA';
import { CustomOrder } from './components/CustomOrder';
import { FloatingContactBar } from './components/FloatingContactBar';
import { Footer } from './components/Footer';
import { Hero } from './components/Hero';
import { InstagramGallery } from './components/InstagramGallery';
import { LocationSection } from './components/LocationSection';
import { Navbar } from './components/Navbar';
import { OurStory } from './components/OurStory';
import { ProductModal } from './components/ProductModal';
import { SignatureCake } from './components/SignatureCake';
import { Testimonials } from './components/Testimonials';
import { WhyChooseUs } from './components/WhyChooseUs';
import type { CakeCategoryId, CakeFlavorStyleId, CakeProduct } from './types/cake';

gsap.registerPlugin(ScrollTrigger);

const SECTION_IDS = ['home', 'cakes', 'story', 'custom-cakes', 'reviews', 'contact'];

export default function App() {
  const [activeSection, setActiveSection] = useState<string>('home');
  const [activeCategory, setActiveCategory] = useState<CakeCategoryId>('all');
  const [flavorStyleId, setFlavorStyleId] = useState<CakeFlavorStyleId>('strawberry-cream');
  const [selectedCake, setSelectedCake] = useState<CakeProduct | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);

  // Scroll-spy active section tracking
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-38% 0px -48% 0px',
        threshold: 0.05,
      },
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  // Coordinated GSAP ScrollTrigger reveals (respecting prefers-reduced-motion)
  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>('.reveal-section').forEach((section) => {
        gsap.from(section, {
          y: 26,
          opacity: 0,
          duration: 0.72,
          ease: 'power2.out',
          clearProps: 'transform,opacity',
          scrollTrigger: {
            trigger: section,
            start: 'top 86%',
            once: true,
          },
        });
      });
    });

    return () => ctx.revert();
  }, []);

  const handleToggleFavorite = (id: string) => {
    setFavorites((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSelectCake = (cake: CakeProduct) => {
    setSelectedCake(cake);
    setFlavorStyleId(cake.heroStyleId);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#FFF8F3] text-[#351D17]">
      <Navbar activeSection={activeSection} />

      <main className="flex-1">
        <Hero
          flavorStyleId={flavorStyleId}
          onChangeFlavorStyle={setFlavorStyleId}
        />

        <Categories
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
        />

        <CakeGallery
          activeCategory={activeCategory}
          onSelectCategory={setActiveCategory}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
          onSelectCake={handleSelectCake}
        />

        <SignatureCake onDiscoverSignature={handleSelectCake} />

        <OurStory />

        <CustomOrder />

        <WhyChooseUs />

        <Testimonials />

        <InstagramGallery />

        <LocationSection />

        <ContactCTA />
      </main>

      <Footer onSelectCategory={setActiveCategory} />

      <FloatingContactBar />

      <ProductModal cake={selectedCake} onClose={() => setSelectedCake(null)} />
    </div>
  );
}
