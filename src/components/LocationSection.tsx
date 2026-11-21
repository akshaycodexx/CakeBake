import { Clock, ExternalLink, MapPin, Navigation, Phone, Truck } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { DELIVERY_ZONES, getGoogleMapsDirectionsUrl } from '../utils/maps';

export function LocationSection() {
  const directionsUrl = getGoogleMapsDirectionsUrl();

  return (
    <section id="contact" className="reveal-section py-20 sm:py-28 bg-[#FFF8F3]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* Bakery Address & Hours */}
          <div className="lg:col-span-5 space-y-6">
            <div>
              <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C92F4D]">
                Visit Our Kitchen Studio
              </p>
              <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold text-[#49251D] tracking-tight">
                Come Say Hello
              </h2>
            </div>

            <div className="space-y-4 pt-2 border-t border-[#49251D]/10 text-sm text-[#6B5048]">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-[#E94765] shrink-0 mt-1" />
                <div>
                  <p className="font-semibold text-[#49251D]">{BUSINESS_CONFIG.name}</p>
                  <p>{BUSINESS_CONFIG.address}</p>
                  <p className="text-xs text-[#8B7168] mt-0.5">{BUSINESS_CONFIG.landmark}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-[#E94765] shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-[#49251D]">Opening Hours</p>
                  <p>{BUSINESS_CONFIG.openingHours}</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Truck className="w-4 h-4 text-[#E94765] shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-[#49251D]">Pickup &amp; Malda Delivery</p>
                  <p>{BUSINESS_CONFIG.deliveryInfo}</p>
                  <p className="text-xs text-[#8B7168] mt-1">
                    Serving: {DELIVERY_ZONES.join(' · ')}
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Phone className="w-4 h-4 text-[#E94765] shrink-0 mt-1" />
                <div>
                  <p className="font-medium text-[#49251D]">Call or WhatsApp</p>
                  <a
                    href={BUSINESS_CONFIG.phoneHref}
                    className="font-mono-tabular text-[#49251D] hover:text-[#E94765] transition-colors"
                  >
                    {BUSINESS_CONFIG.phone}
                  </a>
                </div>
              </div>
            </div>

            <div className="pt-2 grid grid-cols-2 sm:inline-flex gap-2.5 sm:gap-3">
              <a
                href={directionsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-3.5 rounded-full bg-[#49251D] hover:bg-[#C92F4D] text-[#FFF8F3] text-xs sm:text-sm font-medium whitespace-nowrap transition-colors"
              >
                <Navigation className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Get Directions</span>
              </a>

              <a
                href={BUSINESS_CONFIG.phoneHref}
                className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-6 py-3 sm:py-3.5 rounded-full border border-[#49251D]/25 hover:bg-[#F8EDE4] text-[#49251D] text-xs sm:text-sm font-medium whitespace-nowrap transition-colors"
              >
                <Phone className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                <span>Call the Bakery</span>
              </a>
            </div>
          </div>

          {/* Illustrated Malda Neighbourhood Location Card + Google Maps Launcher */}
          <div className="lg:col-span-7">
            <div className="relative rounded-3xl overflow-hidden bg-[#F8EDE4] border border-[#49251D]/10 min-h-[340px] sm:min-h-[400px] p-6 sm:p-10 flex flex-col justify-between">
              {/* Architectural Neighbourhood Vector Grid Visual */}
              <svg
                aria-hidden="true"
                viewBox="0 0 640 360"
                className="absolute inset-0 w-full h-full object-cover opacity-55 pointer-events-none"
              >
                <defs>
                  <pattern id="streetGrid" width="64" height="64" patternUnits="userSpaceOnUse">
                    <path
                      d="M 64 0 L 0 0 0 64"
                      fill="none"
                      stroke="#49251D"
                      strokeOpacity="0.08"
                      strokeWidth="1"
                    />
                  </pattern>
                </defs>
                <rect width="640" height="360" fill="url(#streetGrid)" />
                <path
                  d="M -20 220 Q 190 195 340 165 T 670 110"
                  fill="none"
                  stroke="#E94765"
                  strokeOpacity="0.28"
                  strokeWidth="7"
                  strokeLinecap="round"
                />
                <path
                  d="M 210 -10 L 295 380"
                  fill="none"
                  stroke="#49251D"
                  strokeOpacity="0.14"
                  strokeWidth="6"
                />
                <path
                  d="M 420 20 Q 380 175 450 360"
                  fill="none"
                  stroke="#49251D"
                  strokeOpacity="0.12"
                  strokeWidth="4"
                />
                <circle cx="315" cy="170" r="54" fill="#F6D8D4" fillOpacity="0.55" />
                <circle cx="315" cy="170" r="14" fill="#E94765" />
                <circle cx="315" cy="170" r="5" fill="#FFF8F3" />
              </svg>

              <div className="relative z-10 flex items-center justify-between gap-4">
                <div className="bg-[#FFF8F3]/95 px-4 py-2 rounded-full border border-[#49251D]/10 text-xs font-medium text-[#49251D]">
                  Rathbari More · English Bazar · Malda
                </div>

                <a
                  href={directionsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-[#FFF8F3]/95 hover:bg-[#49251D] text-[#49251D] hover:text-[#FFF8F3] text-xs font-medium border border-[#49251D]/10 transition-colors"
                >
                  <span>Open Google Maps</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>

              <div className="relative z-10 mt-auto max-w-md bg-[#FFF8F3]/96 p-5 sm:p-6 rounded-2xl border border-[#49251D]/10 shadow-sm">
                <p className="text-xs font-medium text-[#C92F4D] uppercase tracking-wider">
                  Self-Pickup &amp; Pre-Order Studio
                </p>
                <p className="mt-1 font-display text-xl sm:text-2xl font-semibold text-[#49251D]">
                  {BUSINESS_CONFIG.name}
                </p>
                <p className="mt-1 text-xs sm:text-sm text-[#6B5048]">
                  {BUSINESS_CONFIG.address}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
