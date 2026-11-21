import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { buildGeneralInquiryLink } from '../utils/whatsapp';

export function ContactCTA() {
  return (
    <section className="reveal-section py-20 sm:py-24 bg-[#F6D8D4]/55 border-t border-[#49251D]/8">
      <div className="max-w-4xl mx-auto px-5 sm:px-8 text-center">
        <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C92F4D]">
          Ready to Celebrate
        </p>

        <h2 className="mt-3 font-display text-3xl sm:text-5xl font-semibold text-[#49251D] tracking-tight [text-wrap:balance]">
          Something Sweet Is Waiting.
        </h2>

        <p className="mt-4 text-base sm:text-lg text-[#6B5048] max-w-2xl mx-auto leading-relaxed">
          Found your favourite? Let&apos;s make it yours. Place your order directly on WhatsApp or
          give our kitchen a call to plan your celebration cake.
        </p>

        <div className="mt-8 grid grid-cols-2 sm:flex sm:flex-wrap items-center justify-center gap-2.5 sm:gap-4 max-w-md sm:max-w-none mx-auto">
          <a
            href={buildGeneralInquiryLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#E94765] hover:bg-[#C92F4D] text-white text-xs sm:text-sm font-medium transition-colors shadow-[0_12px_26px_rgba(233,71,101,0.28)] whitespace-nowrap"
          >
            <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Chat on WhatsApp</span>
          </a>

          <a
            href={BUSINESS_CONFIG.phoneHref}
            className="inline-flex items-center justify-center gap-1.5 sm:gap-2.5 px-3 sm:px-7 py-3.5 sm:py-4 rounded-full bg-[#49251D] hover:bg-[#351D17] text-[#FFF8F3] text-xs sm:text-sm font-medium transition-colors whitespace-nowrap"
          >
            <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
            <span>Call Us Now</span>
          </a>
        </div>

        <p className="mt-6 text-xs sm:text-sm text-[#6B5048]">
          {BUSINESS_CONFIG.phone} · {BUSINESS_CONFIG.openingHours} · Pickup at Rathbari &amp; Malda
          Delivery
        </p>
      </div>
    </section>
  );
}
