import { Instagram, MapPin, MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { CAKE_CATEGORIES } from '../data/categories';
import type { CakeCategoryId } from '../types/cake';
import { buildGeneralInquiryLink } from '../utils/whatsapp';

interface FooterProps {
  onSelectCategory: (cat: CakeCategoryId) => void;
}

export function Footer({ onSelectCategory }: FooterProps) {
  const scrollToSection = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleCategoryClick = (cat: CakeCategoryId) => {
    onSelectCategory(cat);
    scrollToSection('cakes');
  };

  return (
    <footer className="relative overflow-hidden bg-[#49251D] text-[#FFF8F3] pt-16 pb-12">
      {/* Subtle Decorative Line-Art Cake Graphic */}
      <svg
        aria-hidden="true"
        viewBox="0 0 240 240"
        fill="none"
        className="pointer-events-none absolute -right-12 -bottom-10 w-64 h-64 text-[#FFF8F3]/[0.04]"
      >
        <circle cx="120" cy="120" r="105" stroke="currentColor" strokeWidth="2" />
        <path d="M102 72V56M120 72V52M138 72V56" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
        <path d="M102 42C105 46 105 50 102 52C99 50 99 46 102 42Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M120 37C123 41 123 45 120 47C117 45 117 41 120 37Z" stroke="currentColor" strokeWidth="1.8" />
        <path d="M138 42C141 46 141 50 138 52C135 50 135 46 138 42Z" stroke="currentColor" strokeWidth="1.8" />
        <rect x="65" y="105" width="110" height="45" rx="8" stroke="currentColor" strokeWidth="2" />
        <rect x="85" y="72" width="70" height="33" rx="6" stroke="currentColor" strokeWidth="2" />
        <path d="M55 152H185" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>

      <div className="relative max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#FFF8F3]/12">
          {/* Brand Column */}
          <div className="md:col-span-4 space-y-4">
            <div>
              <h3 className="font-display text-3xl font-semibold text-[#FFF8F3]">
                {BUSINESS_CONFIG.name}
              </h3>
              <p className="text-xs tracking-[0.2em] uppercase text-[#F6D8D4] mt-1">
                {BUSINESS_CONFIG.tagline} · {BUSINESS_CONFIG.eyebrowLocation}
              </p>
            </div>
            <p className="text-sm text-[#FFF8F3]/75 leading-relaxed max-w-sm">
              Handcrafted homemade birthday, anniversary, wedding, and custom theme cakes freshly
              baked to order in English Bazar, Malda.
            </p>
            <div className="flex items-center gap-3 pt-1">
              <a
                href={BUSINESS_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-full bg-[#FFF8F3]/10 hover:bg-[#E94765] flex items-center justify-center transition-colors"
              >
                <Instagram className="w-4 h-4" />
              </a>
              <a
                href={buildGeneralInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                className="w-10 h-10 rounded-full bg-[#FFF8F3]/10 hover:bg-[#E94765] flex items-center justify-center transition-colors"
              >
                <MessageCircle className="w-4 h-4" />
              </a>
              <a
                href={BUSINESS_CONFIG.phoneHref}
                aria-label="Call Bakery"
                className="w-10 h-10 rounded-full bg-[#FFF8F3]/10 hover:bg-[#E94765] flex items-center justify-center transition-colors"
              >
                <Phone className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="md:col-span-2 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F6D8D4]">
              Explore
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FFF8F3]/80">
              {[
                { id: 'home', label: 'Home' },
                { id: 'cakes', label: 'Our Cakes' },
                { id: 'story', label: 'Our Story' },
                { id: 'custom-cakes', label: 'Custom Cakes' },
                { id: 'reviews', label: 'Reviews' },
                { id: 'contact', label: 'Contact' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => scrollToSection(item.id)}
                    className="hover:text-[#F6D8D4] transition-colors cursor-pointer"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Categories */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F6D8D4]">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm text-[#FFF8F3]/80">
              {CAKE_CATEGORIES.map((cat) => (
                <li key={cat.id}>
                  <button
                    type="button"
                    onClick={() => handleCategoryClick(cat.id)}
                    className="hover:text-[#F6D8D4] transition-colors cursor-pointer text-left"
                  >
                    {cat.title}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact & Address */}
          <div className="md:col-span-3 space-y-3 text-sm text-[#FFF8F3]/80">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-[#F6D8D4]">
              Visit &amp; Order
            </h4>
            <p className="leading-relaxed">{BUSINESS_CONFIG.address}</p>
            <p className="text-xs text-[#FFF8F3]/65">{BUSINESS_CONFIG.openingHours}</p>
            <p>
              <a
                href={BUSINESS_CONFIG.phoneHref}
                className="font-mono-tabular text-[#FFF8F3] hover:text-[#F6D8D4] transition-colors"
              >
                {BUSINESS_CONFIG.phone}
              </a>
            </p>
            <p>
              <a
                href={BUSINESS_CONFIG.googleMaps}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-xs text-[#F6D8D4] hover:underline"
              >
                <MapPin className="w-3.5 h-3.5" />
                <span>Open in Google Maps</span>
              </a>
            </p>
          </div>
        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#FFF8F3]/60">
          <p>
            &copy; {new Date().getFullYear()} {BUSINESS_CONFIG.name}. Handcrafted in Malda.
          </p>
          <p>Direct WhatsApp &amp; Phone Pre-Orders · Fresh Homemade Cakes</p>
        </div>
      </div>
    </footer>
  );
}
