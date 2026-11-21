import { MessageCircle, Phone } from 'lucide-react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import { buildGeneralInquiryLink } from '../utils/whatsapp';

export function FloatingContactBar() {
  return (
    <div
      aria-label="Quick contact actions"
      className="fixed bottom-4 right-4 z-30 flex flex-col gap-2.5 pb-[env(safe-area-inset-bottom)]"
    >
      <a
        href={BUSINESS_CONFIG.phoneHref}
        aria-label={`Call ${BUSINESS_CONFIG.name}`}
        title={`Call ${BUSINESS_CONFIG.phone}`}
        className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#49251D] hover:bg-[#351D17] text-[#FFF8F3] flex items-center justify-center shadow-[0_8px_20px_rgba(73,37,29,0.28)] transition-transform hover:scale-105"
      >
        <Phone className="w-4 h-4 sm:w-5 sm:h-5" />
      </a>

      <a
        href={buildGeneralInquiryLink()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Order on WhatsApp"
        title="Order on WhatsApp"
        className="w-12 h-12 sm:w-13 sm:h-13 rounded-full bg-[#25A25A] hover:bg-[#1E8A4B] text-white flex items-center justify-center shadow-[0_10px_24px_rgba(37,162,90,0.34)] transition-transform hover:scale-105"
      >
        <MessageCircle className="w-5 h-5 sm:w-6 sm:h-6" />
      </a>
    </div>
  );
}
