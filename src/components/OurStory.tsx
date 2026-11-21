import { ArrowRight } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';

export function OurStory() {
  const scrollToLocation = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section id="story" className="reveal-section py-20 sm:py-28 bg-[#FFF8F3] overflow-hidden">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Story Copy */}
          <div className="lg:col-span-6 order-2 lg:order-1 space-y-6">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C92F4D]">
              Made by Hand, Made with Heart
            </p>

            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#49251D] leading-[1.08] tracking-tight [text-wrap:balance]">
              A Little Love in Every Layer.
            </h2>

            <p className="text-base sm:text-lg text-[#6B5048] leading-relaxed max-w-xl">
              Every cake we make begins with imagination, fresh ingredients, and a little extra
              love. From everyday sweet cravings to the biggest celebrations, we bake to make your
              moments unforgettable.
            </p>

            <p className="text-sm text-[#8B7168] leading-relaxed max-w-xl">
              At {BUSINESS_CONFIG.name} in {BUSINESS_CONFIG.eyebrowLocation}, every sponge is
              baked fresh to pre-order in small home batches — never factory-frozen — with hand-piped
              buttercream florals, Bengali & English calligraphy ribbons, and bespoke 3D toppers.
            </p>

            {/* Small Artisanal Handwritten Signature Graphic */}
            <div className="pt-1 flex items-center gap-4">
              <svg
                width="136"
                height="40"
                viewBox="0 0 136 40"
                fill="none"
                aria-hidden="true"
                className="text-[#49251D]/80"
              >
                <path
                  d="M6 26C14 10 22 6 22 22C22 30 30 14 38 14C44 14 42 26 50 24C58 22 64 12 72 18C78 22 86 14 96 18C106 22 118 16 130 14"
                  stroke="currentColor"
                  strokeWidth="1.7"
                  strokeLinecap="round"
                />
                <path
                  d="M24 32C54 29 88 29 124 31"
                  stroke="#E94765"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                />
              </svg>
              <span className="text-xs text-[#8B7168] tracking-wide">
                Home Kitchen Atelier · {BUSINESS_CONFIG.eyebrowLocation}
              </span>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={scrollToLocation}
                className="inline-flex items-center gap-2 text-sm font-medium text-[#C92F4D] hover:text-[#49251D] transition-colors cursor-pointer"
              >
                <span>Get to Know Us</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Authentic Handcrafted Cake Decoration Photograph */}
          <div className="lg:col-span-6 order-1 lg:order-2 relative">
            <div
              aria-hidden="true"
              className="absolute -inset-4 sm:-inset-6 rounded-[2.5rem] bg-[#F6D8D4]/45 -rotate-2"
            />
            <div className="relative aspect-[4/4] sm:aspect-[5/4] rounded-3xl overflow-hidden bg-[#F8EDE4] shadow-lg">
              <img
                src="/assets/aistudio/Screenshot_2026-11-21_144036_8f96c9c3.png"
                alt="Handcrafted two-tier saffron yellow anniversary cake with crimson fondant roses at Diti's Cake Creation"
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
