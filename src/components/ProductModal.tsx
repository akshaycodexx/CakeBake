import { MessageCircle, Minus, Phone, Plus, X } from 'lucide-react';
import { useEffect, useState } from 'react';
import { BUSINESS_CONFIG } from '../data/businessConfig';
import type { CakeProduct } from '../types/cake';
import { buildProductOrderLink } from '../utils/whatsapp';

interface ProductModalProps {
  cake: CakeProduct | null;
  onClose: () => void;
}

export function ProductModal({ cake, onClose }: ProductModalProps) {
  const [selectedWeight, setSelectedWeight] = useState<number>(1);
  const [selectedFlavor, setSelectedFlavor] = useState<string>('');
  const [eggless, setEggless] = useState<boolean>(true);
  const [quantity, setQuantity] = useState<number>(1);
  const [cakeMessage, setCakeMessage] = useState<string>('');

  useEffect(() => {
    if (cake) {
      setSelectedWeight(cake.defaultWeightKg);
      setSelectedFlavor(cake.flavors[0] ?? 'Classic Vanilla');
      setEggless(cake.egglessAvailable);
      setQuantity(1);
      setCakeMessage('');
    }
  }, [cake]);

  useEffect(() => {
    if (!cake) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [cake, onClose]);

  if (!cake) return null;

  const unitEstimate = Math.round(
    (cake.priceInr / cake.defaultWeightKg) * selectedWeight,
  );
  const totalEstimate = unitEstimate * quantity;

  const whatsappUrl = buildProductOrderLink({
    cakeName: cake.name,
    priceInr: totalEstimate,
    weightKg: selectedWeight,
    flavor: selectedFlavor,
    eggless,
    quantity,
    cakeMessage,
  });

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-cake-title"
      className="fixed inset-0 z-50 bg-[#24110C]/65 flex items-end sm:items-center justify-center p-0 sm:p-6"
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-4xl bg-[#FFF8F3] text-[#351D17] rounded-t-3xl sm:rounded-3xl shadow-2xl flex flex-col md:flex-row max-h-[92dvh] sm:max-h-[88dvh] overflow-hidden"
      >
        {/* Left Image Column */}
        <div className="relative w-full h-48 sm:h-60 md:h-auto md:w-[44%] shrink-0 bg-[#F8EDE4]">
          <img
            src={cake.image}
            alt={cake.name}
            referrerPolicy="no-referrer"
            className="w-full h-full object-cover"
          />
          <button
            type="button"
            onClick={onClose}
            aria-label="Close product modal"
            className="md:hidden absolute top-3 right-3 w-10 h-10 rounded-full bg-[#FFF8F3]/95 text-[#49251D] flex items-center justify-center shadow cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Right Column: Scrollable Form Body + Pinned Action Footer */}
        <div className="flex-1 min-h-0 flex flex-col">
          <div className="flex-1 min-h-0 overflow-y-auto p-5 sm:p-7 space-y-5">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="text-xs text-[#C92F4D] font-medium uppercase tracking-wider">
                  {cake.categoryLabel} · {cake.leadTime}
                </p>
                <h2
                  id="modal-cake-title"
                  className="mt-1 font-display text-2xl sm:text-3xl font-semibold text-[#49251D] leading-tight"
                >
                  {cake.name}
                </h2>
              </div>

              <button
                type="button"
                onClick={onClose}
                aria-label="Close modal"
                className="hidden md:inline-flex w-10 h-10 rounded-full bg-[#F8EDE4] hover:bg-[#F6D8D4] text-[#49251D] items-center justify-center shrink-0 transition-colors cursor-pointer"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="flex items-baseline gap-2.5">
              <span className="font-mono-tabular text-2xl font-semibold text-[#49251D]">
                ₹{totalEstimate.toLocaleString('en-IN')}
              </span>
              <span className="text-xs text-[#8B7168]">
                Estimated for {quantity} × {selectedWeight} kg
              </span>
            </div>

            <p className="text-sm text-[#6B5048] leading-relaxed">
              {cake.description}
            </p>

            {/* Customization Controls */}
            <div className="space-y-4 pt-1">
              <div>
                <label className="block text-xs font-medium text-[#49251D] mb-2">
                  Select Weight
                </label>
                <div className="flex flex-wrap gap-2">
                  {cake.weightsKg.map((w) => (
                    <button
                      key={w}
                      type="button"
                      onClick={() => setSelectedWeight(w)}
                      className={`px-3.5 py-2 rounded-full text-xs font-mono-tabular font-medium transition-colors cursor-pointer ${
                        selectedWeight === w
                          ? 'bg-[#49251D] text-[#FFF8F3]'
                          : 'bg-[#F8EDE4] text-[#49251D] hover:bg-[#F6D8D4]'
                      }`}
                    >
                      {w} kg
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label
                    htmlFor="modal-flavor"
                    className="block text-xs font-medium text-[#49251D] mb-1.5"
                  >
                    Flavour
                  </label>
                  <select
                    id="modal-flavor"
                    value={selectedFlavor}
                    onChange={(e) => setSelectedFlavor(e.target.value)}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8EDE4] border border-[#49251D]/12 text-sm text-[#351D17] focus:outline-none focus:border-[#E94765]"
                  >
                    {cake.flavors.map((fl) => (
                      <option key={fl} value={fl}>
                        {fl}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <span className="block text-xs font-medium text-[#49251D] mb-1.5">
                    Recipe Style
                  </span>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setEggless(true)}
                      className={`py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        eggless
                          ? 'bg-[#49251D] text-[#FFF8F3]'
                          : 'bg-[#F8EDE4] text-[#49251D]'
                      }`}
                    >
                      100% Eggless
                    </button>
                    <button
                      type="button"
                      onClick={() => setEggless(false)}
                      className={`py-2.5 rounded-xl text-xs font-medium transition-colors cursor-pointer ${
                        !eggless
                          ? 'bg-[#49251D] text-[#FFF8F3]'
                          : 'bg-[#F8EDE4] text-[#49251D]'
                      }`}
                    >
                      Classic Sponge
                    </button>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-3.5 pb-1">
                <div className="sm:col-span-8">
                  <label
                    htmlFor="modal-message"
                    className="block text-xs font-medium text-[#49251D] mb-1.5"
                  >
                    Message on Cake (Optional)
                  </label>
                  <input
                    id="modal-message"
                    type="text"
                    maxLength={40}
                    value={cakeMessage}
                    onChange={(e) => setCakeMessage(e.target.value)}
                    placeholder="e.g., Happy Birthday Aarav!"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-[#F8EDE4] border border-[#49251D]/12 text-sm text-[#351D17] placeholder:text-[#8B7168] focus:outline-none focus:border-[#E94765]"
                  />
                </div>

                <div className="sm:col-span-4">
                  <span className="block text-xs font-medium text-[#49251D] mb-1.5">
                    Quantity
                  </span>
                  <div className="flex items-center justify-between px-2 py-1.5 rounded-xl bg-[#F8EDE4] border border-[#49251D]/12">
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      aria-label="Decrease quantity"
                      className="w-8 h-8 rounded-lg hover:bg-[#F6D8D4] flex items-center justify-center text-[#49251D] cursor-pointer"
                    >
                      <Minus className="w-3.5 h-3.5" />
                    </button>
                    <span className="font-mono-tabular text-sm font-medium text-[#49251D]">
                      {quantity}
                    </span>
                    <button
                      type="button"
                      onClick={() => setQuantity((q) => Math.min(10, q + 1))}
                      aria-label="Increase quantity"
                      className="w-8 h-8 rounded-lg hover:bg-[#F6D8D4] flex items-center justify-center text-[#49251D] cursor-pointer"
                    >
                      <Plus className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pinned Bottom Action Bar (Always Visible & Never Clipped) */}
          <div className="shrink-0 bg-[#FFF8F3] border-t border-[#49251D]/10 px-5 sm:px-7 py-4 flex flex-col sm:flex-row gap-2.5 sm:gap-3">
            <a
              href={whatsappUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full bg-[#E94765] hover:bg-[#C92F4D] text-white text-sm font-medium transition-colors shadow-[0_8px_20px_rgba(233,71,101,0.25)]"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Order on WhatsApp</span>
            </a>

            <a
              href={BUSINESS_CONFIG.phoneHref}
              className="inline-flex items-center justify-center gap-2 py-3 px-5 rounded-full border border-[#49251D]/25 hover:bg-[#49251D] hover:text-[#FFF8F3] text-[#49251D] text-sm font-medium transition-colors"
            >
              <Phone className="w-4 h-4" />
              <span>Call Bakery</span>
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
