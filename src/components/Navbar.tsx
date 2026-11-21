import { ChevronRight, Instagram, MapPin, Menu, MessageCircle, Phone, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { buildGeneralInquiryLink } from '../utils/whatsapp';

interface NavbarProps {
  activeSection: string;
}

const NAV_ITEMS = [
  { id: 'home', label: 'Home', hint: '3D preview & highlights' },
  { id: 'cakes', label: 'Our Cakes', hint: '17 real cake designs' },
  { id: 'story', label: 'Our Story', hint: 'Baked fresh in Malda' },
  { id: 'custom-cakes', label: 'Custom Cakes', hint: 'Theme & tier inquiries' },
  { id: 'reviews', label: 'Reviews', hint: 'Customer love & ratings' },
  { id: 'contact', label: 'Contact', hint: 'Location & direct order' },
];

function BrandCakeLogo({ size = 30 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      aria-hidden="true"
      className="shrink-0 transition-transform duration-200 group-hover:scale-105"
    >
      {/* Three 2D Candles with Distinct Individual Flames */}
      <path d="M11.5 12.5V9.2" stroke="#49251D" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M11.5 3.8C12.65 5.3 12.85 6.6 11.5 7.4C10.15 6.6 10.35 5.3 11.5 3.8Z"
        fill="#E94765"
      />
      <circle cx="11.5" cy="6.1" r="0.55" fill="#FFD166" />

      <path d="M16 12.5V8.2" stroke="#49251D" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M16 2.3C17.25 4.0 17.45 5.5 16 6.4C14.55 5.5 14.75 4.0 16 2.3Z"
        fill="#E94765"
      />
      <circle cx="16" cy="5.0" r="0.6" fill="#FFD166" />

      <path d="M20.5 12.5V9.2" stroke="#49251D" strokeWidth="1.7" strokeLinecap="round" />
      <path
        d="M20.5 3.8C21.65 5.3 21.85 6.6 20.5 7.4C19.15 6.6 19.35 5.3 20.5 3.8Z"
        fill="#E94765"
      />
      <circle cx="20.5" cy="6.1" r="0.55" fill="#FFD166" />

      {/* Top Tier */}
      <rect x="8.5" y="12.5" width="15" height="6.5" rx="2" stroke="#49251D" strokeWidth="1.75" />

      {/* Bottom Tier & Scalloped Frosting */}
      <rect x="5" y="19" width="22" height="8.5" rx="2.5" stroke="#49251D" strokeWidth="1.75" />
      <path
        d="M6.5 19.6C8.2 21.8 10 21.8 11.5 19.6C13 21.8 14.8 21.8 16 19.6C17.2 21.8 19 21.8 20.5 19.6C22 21.8 23.8 21.8 25.5 19.6"
        stroke="#E94765"
        strokeWidth="1.55"
        strokeLinecap="round"
      />

      {/* Platter Base */}
      <path d="M3 28.5H29" stroke="#49251D" strokeWidth="1.75" strokeLinecap="round" />
    </svg>
  );
}

export function Navbar({ activeSection }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 28);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileMenuOpen(false);
    };
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', onKeyDown);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [mobileMenuOpen]);

  const scrollToSection = (id: string) => {
    setMobileMenuOpen(false);
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  return (
    <>
      <header
        className={`sticky top-0 z-40 transition-colors duration-200 ${
          scrolled
            ? 'bg-[#FFF8F3]/98 border-b border-[#49251D]/10 shadow-[0_4px_20px_rgba(73,37,29,0.04)]'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-6">
          {/* Zone 1: Brand Lockup */}
          <a
            href="#home"
            onClick={(e) => {
              e.preventDefault();
              scrollToSection('home');
            }}
            className="flex items-center gap-2.5 whitespace-nowrap shrink-0 group focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#E94765] rounded"
          >
            <BrandCakeLogo size={30} />
            <span className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#49251D]">
              {BUSINESS_CONFIG.name}
            </span>
          </a>

          {/* Zone 2: Clean Typography Navigation Links */}
          <nav
            aria-label="Main navigation"
            className="hidden lg:flex items-center gap-6 xl:gap-8 text-sm font-medium text-[#351D17]/80"
          >
            {NAV_ITEMS.map((item) => {
              const active = activeSection === item.id;
              return (
                <a
                  key={item.id}
                  href={`#${item.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(item.id);
                  }}
                  data-active={active}
                  className={`nav-link-underline py-1 whitespace-nowrap shrink-0 transition-colors ${
                    active ? 'text-[#49251D] font-semibold' : 'hover:text-[#E94765]'
                  }`}
                >
                  {item.label}
                </a>
              );
            })}
          </nav>

          {/* Zone 3: Actions + Mobile Trigger */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            <a
              href={BUSINESS_CONFIG.instagram}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hidden sm:inline-flex items-center justify-center w-10 h-10 rounded-full text-[#49251D]/75 hover:text-[#E94765] hover:bg-[#F6D8D4]/45 transition-colors"
            >
              <Instagram className="w-[18px] h-[18px]" />
            </a>

            <a
              href={buildGeneralInquiryLink()}
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#E94765] hover:bg-[#C92F4D] text-white text-sm font-medium transition-colors whitespace-nowrap shrink-0 shadow-[0_6px_18px_rgba(233,71,101,0.22)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order a Cake</span>
            </a>

            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
              className="lg:hidden inline-flex items-center justify-center w-10 h-10 rounded-full bg-[#F8EDE4] text-[#49251D] hover:bg-[#F6D8D4] transition-colors cursor-pointer"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Mobile menu"
          className="fixed inset-0 z-50 lg:hidden flex flex-col bg-[#FFF8F3] text-[#351D17]"
        >
          {/* Drawer Header (Pinned) */}
          <div className="shrink-0 flex items-center justify-between gap-3 px-5 py-3.5 border-b border-[#49251D]/10 bg-[#FFF8F3]">
            <div className="flex items-center gap-2.5 min-w-0">
              <BrandCakeLogo size={26} />
              <div className="min-w-0">
                <span className="font-display text-lg font-semibold text-[#49251D] block truncate leading-tight">
                  {BUSINESS_CONFIG.name}
                </span>
                <span className="text-[11px] text-[#8B7168] block truncate">
                  {BUSINESS_CONFIG.tagline} · Rathbari, Malda
                </span>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setMobileMenuOpen(false)}
              aria-label="Close menu"
              className="w-10 h-10 rounded-full bg-[#F8EDE4] hover:bg-[#F6D8D4] text-[#49251D] flex items-center justify-center cursor-pointer shrink-0 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Scrollable Navigation Links & Bakery Card */}
          <div className="flex-1 min-h-0 overflow-y-auto px-5 py-4 space-y-4">
            <div>
              <p className="px-2 mb-2 text-[11px] font-medium uppercase tracking-[0.18em] text-[#8B7168]">
                Explore Bakery
              </p>
              <nav aria-label="Mobile navigation" className="space-y-1.5">
                {NAV_ITEMS.map((item, idx) => {
                  const isActive = activeSection === item.id;
                  return (
                    <a
                      key={item.id}
                      href={`#${item.id}`}
                      onClick={(e) => {
                        e.preventDefault();
                        scrollToSection(item.id);
                      }}
                      className={`flex items-center justify-between gap-3 px-3.5 py-3 rounded-2xl transition-colors ${
                        isActive
                          ? 'bg-[#F8EDE4] text-[#E94765]'
                          : 'hover:bg-[#F8EDE4]/60 text-[#49251D]'
                      }`}
                    >
                      <div className="flex items-baseline gap-3 min-w-0">
                        <span
                          className={`font-mono-tabular text-xs shrink-0 ${
                            isActive ? 'text-[#E94765] font-semibold' : 'text-[#8B7168]'
                          }`}
                        >
                          0{idx + 1}
                        </span>
                        <div className="min-w-0">
                          <span className="font-display text-xl font-semibold block leading-tight">
                            {item.label}
                          </span>
                          <span className="text-xs text-[#6B5048] block truncate mt-0.5">
                            {item.hint}
                          </span>
                        </div>
                      </div>
                      <ChevronRight
                        className={`w-4 h-4 shrink-0 ${
                          isActive ? 'text-[#E94765]' : 'text-[#8B7168]'
                        }`}
                      />
                    </a>
                  );
                })}
              </nav>
            </div>

            {/* Compact Studio Info Strip */}
            <div className="rounded-2xl bg-[#F8EDE4]/75 border border-[#49251D]/10 p-3.5 flex items-center justify-between gap-3">
              <div className="flex items-start gap-2.5 min-w-0">
                <MapPin className="w-4 h-4 text-[#E94765] shrink-0 mt-0.5" />
                <div className="min-w-0">
                  <p className="text-xs font-medium text-[#49251D] truncate">
                    Rathbari, English Bazar, Malda
                  </p>
                  <p className="text-[11px] text-[#6B5048]">
                    Always Open · Made-to-Order Pre-Orders
                  </p>
                </div>
              </div>
              <a
                href={BUSINESS_CONFIG.instagram}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Visit Diti's Cake Creation on Instagram"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#FFF8F3] border border-[#49251D]/12 text-[#49251D] text-xs font-medium shrink-0 hover:border-[#E94765]/40 hover:text-[#E94765] transition-colors"
              >
                <Instagram className="w-3.5 h-3.5" />
                <span>Instagram</span>
              </a>
            </div>
          </div>

          {/* Pinned Bottom Action Bar */}
          <div className="shrink-0 px-5 pt-3 pb-4 border-t border-[#49251D]/10 bg-[#FFF8F3]">
            <div className="grid grid-cols-2 gap-2.5">
              <a
                href={buildGeneralInquiryLink()}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#E94765] hover:bg-[#C92F4D] text-white text-sm font-medium transition-colors shadow-[0_6px_16px_rgba(233,71,101,0.22)]"
              >
                <MessageCircle className="w-4 h-4 shrink-0" />
                <span>WhatsApp</span>
              </a>
              <a
                href={BUSINESS_CONFIG.phoneHref}
                className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-full bg-[#49251D] hover:bg-[#351D17] text-[#FFF8F3] text-sm font-medium transition-colors"
              >
                <Phone className="w-4 h-4 shrink-0" />
                <span>Call Bakery</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
