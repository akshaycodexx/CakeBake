import { ArrowRight, MessageCircle, RotateCw } from 'lucide-react';
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { CAKE_FLAVOR_STYLES } from '../data/cakes';
import { CakeScene3D } from '../three/CakeScene3D';
import type { CakeFlavorStyleId } from '../types/cake';
import { buildGeneralInquiryLink } from '../utils/whatsapp';

interface HeroProps {
  flavorStyleId: CakeFlavorStyleId;
  onChangeFlavorStyle: (id: CakeFlavorStyleId) => void;
}

export function Hero({ flavorStyleId, onChangeFlavorStyle }: HeroProps) {
  const heroRef = useRef<HTMLElement | null>(null);
  const [hasInteracted, setHasInteracted] = useState(false);

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced || !heroRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
      tl.from('.hero-stagger', {
        y: 22,
        opacity: 0,
        duration: 0.72,
        stagger: 0.09,
        clearProps: 'transform,opacity',
      }).from(
        '.hero-stage-reveal',
        {
          scale: 0.94,
          opacity: 0,
          duration: 0.85,
          clearProps: 'transform,opacity',
        },
        '-=0.55',
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  const activeStyle =
    CAKE_FLAVOR_STYLES.find((s) => s.id === flavorStyleId) ?? CAKE_FLAVOR_STYLES[0];

  const scrollToCakes = () => {
    document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  return (
    <section
      id="home"
      ref={heroRef}
      className="relative overflow-hidden bg-[#FFF8F3] min-h-[calc(100vh-4.5rem)] flex items-center py-10 sm:py-14 lg:py-16"
    >
      {/* Subtle organic blush arch backdrop behind right composition */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 right-[-10%] w-[520px] h-[520px] sm:w-[680px] sm:h-[680px] rounded-full opacity-55"
        style={{
          background:
            'radial-gradient(circle at 45% 45%, #F6D8D4 0%, rgba(248, 237, 228, 0.55) 55%, rgba(255, 248, 243, 0) 76%)',
        }}
      />

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          {/* Left Editorial Story & Primary CTAs */}
          <div className="lg:col-span-6 space-y-6 lg:pr-6">
            <p className="hero-stagger text-xs font-medium tracking-[0.22em] uppercase text-[#C92F4D]">
              Handcrafted With Love · {BUSINESS_CONFIG.eyebrowLocation}
            </p>

            <h1 className="hero-stagger font-display text-[2.65rem] sm:text-5xl xl:text-[3.85rem] font-semibold leading-[1.06] tracking-tight text-[#49251D] [text-wrap:balance]">
              Every Celebration Deserves a{' '}
              <span className="italic text-[#E94765] font-semibold">Beautiful Cake.</span>
            </h1>

            <p className="hero-stagger text-base sm:text-lg text-[#6B5048] leading-relaxed max-w-xl">
              Freshly baked, beautifully designed, and made to turn your sweetest moments into
              unforgettable memories.
            </p>

            <div className="hero-stagger grid grid-cols-2 sm:flex sm:flex-wrap sm:items-center gap-2 sm:gap-3.5 pt-1">
              <button
                type="button"
                onClick={scrollToCakes}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-2.5 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#E94765] hover:bg-[#C92F4D] text-white text-[11.5px] sm:text-sm font-medium transition-colors shadow-[0_10px_24px_rgba(233,71,101,0.22)] cursor-pointer whitespace-nowrap shrink-0"
              >
                <span>Explore Our Cakes</span>
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
              </button>

              <a
                href={buildGeneralInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-2.5 sm:px-6 py-3 sm:py-3.5 rounded-full border border-[#49251D]/25 bg-[#FFF8F3] hover:bg-[#49251D] hover:text-[#FFF8F3] text-[#49251D] text-[11.5px] sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0"
              >
                <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Order on WhatsApp</span>
              </a>
            </div>

            <p className="hero-stagger text-xs sm:text-sm text-[#8B7168] pt-2">
              Freshly baked · Made to order · Crafted with love · Direct WhatsApp & call orders
            </p>
          </div>

          {/* Right Unboxed Open Three.js Celebration Cake Stage */}
          <div className="lg:col-span-6 hero-stage-reveal flex flex-col items-center">
            <div
              onPointerDown={() => setHasInteracted(true)}
              className="relative w-full h-[350px] sm:h-[440px] lg:h-[520px] flex items-center justify-center"
            >
              {/* Soft blush glow directly behind the 3D cake */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute w-[260px] h-[260px] sm:w-[360px] sm:h-[360px] rounded-full bg-[#F6D8D4]/55 blur-2xl"
              />

              <div className="relative z-10 w-full h-full">
                <CakeScene3D flavorStyleId={flavorStyleId} />
              </div>

              {!hasInteracted && (
                <div className="pointer-events-none absolute bottom-3 left-1/2 -translate-x-1/2 z-20 inline-flex items-center gap-1.5 text-xs text-[#8B7168]">
                  <RotateCw className="w-3.5 h-3.5" />
                  <span>Drag to rotate cake</span>
                </div>
              )}
            </div>

            {/* Minimal Flavor & Glaze Swatch Strip — Clean & Non-Distracting */}
            <div className="mt-2 flex flex-col items-center gap-2.5 w-full">
              <div
                role="radiogroup"
                aria-label="Preview 3D cake frosting finish"
                className="flex flex-wrap items-center justify-center gap-2 sm:gap-3"
              >
                {CAKE_FLAVOR_STYLES.map((style) => {
                  const selected = style.id === flavorStyleId;
                  return (
                    <button
                      key={style.id}
                      type="button"
                      role="radio"
                      aria-checked={selected}
                      onClick={() => onChangeFlavorStyle(style.id)}
                      className={`inline-flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-medium transition-all cursor-pointer whitespace-nowrap shrink-0 ${
                        selected
                          ? 'bg-[#49251D] text-[#FFF8F3] shadow-sm'
                          : 'bg-[#F8EDE4] text-[#49251D]/80 hover:bg-[#F6D8D4]/70'
                      }`}
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-[#49251D]/20 shrink-0"
                        style={{ backgroundColor: style.dripHex }}
                      />
                      <span>{style.label}</span>
                    </button>
                  );
                })}
              </div>
              <p className="text-xs text-[#8B7168] text-center">
                {activeStyle.label} · {activeStyle.subtitle}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
