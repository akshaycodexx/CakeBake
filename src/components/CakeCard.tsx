import { Heart, MessageCircle } from 'lucide-react';
import { useState } from 'react';
import type { CakeProduct } from '../types/cake';
import { buildProductOrderLink } from '../utils/whatsapp';

interface CakeCardProps {
  cake: CakeProduct;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onOpenModal: (cake: CakeProduct) => void;
}

export function CakeCard({
  cake,
  isFavorite,
  onToggleFavorite,
  onOpenModal,
}: CakeCardProps) {
  const [imgFailed, setImgFailed] = useState(false);

  const quickOrderUrl = buildProductOrderLink({
    cakeName: cake.name,
    priceInr: cake.priceInr,
    weightKg: cake.defaultWeightKg,
    flavor: cake.flavors[0],
    eggless: cake.egglessAvailable,
    quantity: 1,
  });

  return (
    <article className="cake-card-anim group flex flex-col bg-transparent transition-transform duration-300 ease-out hover:-translate-y-0.5">
      {/* Consistent 4:5 Photography Frame */}
      <div className="relative aspect-[4/5] w-full rounded-2xl overflow-hidden bg-[#F8EDE4]">
        {!imgFailed ? (
          <img
            src={cake.image}
            alt={cake.name}
            loading="lazy"
            referrerPolicy="no-referrer"
            onError={() => setImgFailed(true)}
            onClick={() => onOpenModal(cake)}
            className="w-full h-full object-cover cursor-pointer transition-transform duration-500 ease-out group-hover:scale-105"
          />
        ) : (
          <div
            onClick={() => onOpenModal(cake)}
            className="w-full h-full flex flex-col items-center justify-center p-6 text-center bg-[#F8EDE4] cursor-pointer"
          >
            <span className="font-display text-xl text-[#49251D] font-semibold">
              {cake.name}
            </span>
            <span className="text-xs text-[#8B7168] mt-1">{cake.categoryLabel}</span>
          </div>
        )}

        {/* Favorite Heart Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(cake.id);
          }}
          aria-label={isFavorite ? `Remove ${cake.name} from saved` : `Save ${cake.name}`}
          className="absolute top-3 right-3 w-10 h-10 rounded-full bg-[#FFF8F3]/92 text-[#49251D] flex items-center justify-center shadow-sm hover:scale-105 transition-transform cursor-pointer"
        >
          <Heart
            className={`w-4 h-4 transition-colors ${
              isFavorite ? 'fill-[#E94765] text-[#E94765]' : 'text-[#49251D]/75'
            }`}
          />
        </button>
      </div>

      {/* Editorial Product Copy */}
      <div className="pt-4 flex flex-col flex-1">
        <div className="flex items-center gap-1.5 text-xs text-[#8B7168] truncate">
          <span>{cake.categoryLabel}</span>
          <span aria-hidden="true">·</span>
          <span>{cake.leadTime}</span>
          {cake.egglessAvailable && (
            <>
              <span aria-hidden="true">·</span>
              <span className="text-[#49251D] font-medium">Eggless</span>
            </>
          )}
        </div>

        <div className="mt-1.5 flex items-baseline justify-between gap-3">
          <h3
            onClick={() => onOpenModal(cake)}
            className="font-display text-xl sm:text-[1.35rem] font-semibold text-[#49251D] leading-snug cursor-pointer group-hover:text-[#E94765] transition-colors"
          >
            {cake.name}
          </h3>
          <div className="text-right shrink-0">
            <span className="font-mono-tabular text-sm sm:text-base font-semibold text-[#49251D]">
              ₹{cake.priceInr.toLocaleString('en-IN')}
            </span>
            <span className="block font-mono-tabular text-[11px] text-[#8B7168]">
              {cake.defaultWeightKg} kg
            </span>
          </div>
        </div>

        <p className="mt-1.5 text-sm text-[#6B5048] line-clamp-2 flex-1 leading-relaxed">
          {cake.subtitle}
        </p>

        {/* Balanced Dual Actions */}
        <div className="mt-4 pt-3.5 border-t border-[#49251D]/10 grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => onOpenModal(cake)}
            className="inline-flex items-center justify-center py-2.5 px-3 rounded-full border border-[#49251D]/20 bg-[#FFF8F3] hover:bg-[#F8EDE4] text-[#49251D] text-xs font-medium transition-colors cursor-pointer whitespace-nowrap"
          >
            View Cake
          </button>

          <a
            href={quickOrderUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-full bg-[#E94765] hover:bg-[#C92F4D] text-white text-xs font-medium transition-colors whitespace-nowrap shadow-[0_6px_14px_rgba(233,71,101,0.2)]"
          >
            <MessageCircle className="w-3.5 h-3.5 shrink-0" />
            <span>Order Cake</span>
          </a>
        </div>
      </div>
    </article>
  );
}
