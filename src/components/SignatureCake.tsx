import { ArrowRight } from 'lucide-react';
import { SIGNATURE_CAKE } from '../data/cakes';
import type { CakeProduct } from '../types/cake';

interface SignatureCakeProps {
  onDiscoverSignature: (cake: CakeProduct) => void;
}

export function SignatureCake({ onDiscoverSignature }: SignatureCakeProps) {
  return (
    <section className="reveal-section py-20 sm:py-28 bg-[#F8EDE4]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-center">
          {/* Editorial Feature Photograph */}
          <div className="lg:col-span-6 relative">
            <div className="aspect-[4/5] sm:aspect-[5/4] lg:aspect-[4/5] rounded-3xl overflow-hidden bg-[#FFF8F3] shadow-[0_24px_60px_rgba(73,37,29,0.1)]">
              <img
                src={SIGNATURE_CAKE.image}
                alt={SIGNATURE_CAKE.name}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Subtle Organic Swirl Line Accent */}
            <svg
              aria-hidden="true"
              viewBox="0 0 120 40"
              fill="none"
              className="hidden sm:block absolute -bottom-5 -right-4 w-28 text-[#E94765]/70"
            >
              <path
                d="M4 28C22 10 42 32 62 16C80 2 98 22 116 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
              />
            </svg>
          </div>

          {/* Magazine Editorial Story Column */}
          <div className="lg:col-span-6 space-y-6">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C92F4D]">
              Signature Creation · {SIGNATURE_CAKE.name}
            </p>

            <h2 className="font-display text-3xl sm:text-5xl font-semibold text-[#49251D] leading-[1.08] tracking-tight [text-wrap:balance]">
              A Little Indulgence, <span className="italic font-medium text-[#E94765]">A Lot of Love.</span>
            </h2>

            <p className="text-base sm:text-lg text-[#6B5048] leading-relaxed max-w-xl">
              Layers of soft sponge, velvety cream, and our favourite fresh ingredients — created
              by hand for those moments that deserve something special.
            </p>

            <p className="text-sm text-[#8B7168] leading-relaxed max-w-xl">
              {SIGNATURE_CAKE.description}
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-6">
              <button
                type="button"
                onClick={() => onDiscoverSignature(SIGNATURE_CAKE)}
                className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#49251D] hover:bg-[#C92F4D] text-[#FFF8F3] text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Discover Our Signature</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <span className="font-mono-tabular text-sm text-[#49251D]">
                Starting ₹{SIGNATURE_CAKE.priceInr.toLocaleString('en-IN')} · {SIGNATURE_CAKE.defaultWeightKg} kg
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
