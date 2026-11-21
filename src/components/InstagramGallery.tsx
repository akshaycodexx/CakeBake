import { Instagram } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { INSTAGRAM_MOMENTS } from '../data/cakes';

export function InstagramGallery() {
  return (
    <section className="reveal-section py-20 sm:py-26 bg-[#F8EDE4]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-10">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C92F4D]">
              {BUSINESS_CONFIG.instagramHandle}
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#49251D] tracking-tight">
              A Peek Into Our Sweet World
            </h2>
          </div>

          <a
            href={BUSINESS_CONFIG.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="self-start sm:self-auto inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#49251D] hover:bg-[#E94765] text-[#FFF8F3] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow Us on Instagram</span>
          </a>
        </div>

        {/* Varied Editorial Photo Mosaic Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 auto-rows-[160px] sm:auto-rows-[210px] gap-3 sm:gap-5">
          {INSTAGRAM_MOMENTS.map((moment) => (
            <a
              key={moment.src}
              href={BUSINESS_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className={`group relative rounded-2xl overflow-hidden bg-[#FFF8F3] ${moment.span}`}
            >
              <img
                src={moment.src}
                alt={moment.alt}
                loading="lazy"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div
                aria-hidden="true"
                className="absolute inset-0 bg-gradient-to-t from-[#24110C]/75 via-transparent to-transparent opacity-80 group-hover:opacity-95 transition-opacity"
              />
              <span className="absolute bottom-3 left-3.5 text-xs font-medium text-[#FFF8F3]">
                {moment.label}
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
