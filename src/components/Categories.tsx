import { ArrowUpRight, ChevronLeft, ChevronRight } from 'lucide-react';
import { useRef, type MouseEvent } from 'react';
import { CAKE_CATEGORIES } from '../data/categories';
import type { CakeCategoryId } from '../types/cake';

interface CategoriesProps {
  activeCategory: CakeCategoryId;
  onSelectCategory: (cat: CakeCategoryId) => void;
}

export function Categories({ activeCategory, onSelectCategory }: CategoriesProps) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const dragStateRef = useRef({
    isDown: false,
    startX: 0,
    scrollLeft: 0,
    didDrag: false,
  });

  const handlePick = (cat: CakeCategoryId) => {
    if (dragStateRef.current.didDrag) return;
    onSelectCategory(cat);
    document.getElementById('cakes')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const scrollByStep = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const step = Math.round(el.clientWidth * 0.78);
    el.scrollBy({ left: direction * step, behavior: 'smooth' });
  };

  const onMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    if (!el) return;
    dragStateRef.current = {
      isDown: true,
      startX: e.pageX - el.offsetLeft,
      scrollLeft: el.scrollLeft,
      didDrag: false,
    };
  };

  const onMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = scrollerRef.current;
    const st = dragStateRef.current;
    if (!el || !st.isDown) return;
    const x = e.pageX - el.offsetLeft;
    const walk = x - st.startX;
    if (Math.abs(walk) > 6) {
      st.didDrag = true;
    }
    el.scrollLeft = st.scrollLeft - walk;
  };

  const onMouseUpOrLeave = () => {
    dragStateRef.current.isDown = false;
    window.setTimeout(() => {
      dragStateRef.current.didDrag = false;
    }, 60);
  };

  return (
    <section className="py-14 sm:py-22 bg-[#FFF8F3] border-t border-[#49251D]/8">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-7 sm:mb-10">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C92F4D]">
              A Little Something for Every Occasion
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-4xl lg:text-[2.75rem] font-semibold text-[#49251D] tracking-tight">
              Find Your Perfect Cake
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-4">
            <button
              type="button"
              onClick={() => handlePick('all')}
              className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C92F4D] hover:text-[#49251D] transition-colors cursor-pointer whitespace-nowrap shrink-0"
            >
              <span>View All Cakes</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            <div className="flex lg:hidden items-center gap-1.5">
              <button
                type="button"
                onClick={() => scrollByStep(-1)}
                aria-label="Scroll categories left"
                className="w-9 h-9 rounded-full border border-[#49251D]/20 bg-[#F8EDE4] text-[#49251D] flex items-center justify-center cursor-pointer"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => scrollByStep(1)}
                aria-label="Scroll categories right"
                className="w-9 h-9 rounded-full border border-[#49251D]/20 bg-[#F8EDE4] text-[#49251D] flex items-center justify-center cursor-pointer"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile: Smooth Draggable + Arrow-Controlled Horizontal Strip | Desktop: Editorial Grid */}
        <div
          ref={scrollerRef}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUpOrLeave}
          onMouseLeave={onMouseUpOrLeave}
          className="flex lg:grid lg:grid-cols-12 gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-2 lg:pb-0 snap-x snap-proximity scroll-smooth touch-pan-x cursor-grab active:cursor-grabbing lg:cursor-auto"
        >
          {CAKE_CATEGORIES.map((tile, idx) => {
            const selected = activeCategory === tile.id;
            const colSpanClass =
              idx === 0
                ? 'lg:col-span-7'
                : idx === 1
                  ? 'lg:col-span-5'
                  : idx === 2
                    ? 'lg:col-span-5'
                    : 'lg:col-span-7';

            return (
              <button
                key={tile.id}
                type="button"
                onClick={() => handlePick(tile.id)}
                className={`group relative snap-start shrink-0 w-[78vw] sm:w-[46vw] lg:w-auto ${colSpanClass} h-[250px] sm:h-[300px] lg:h-[340px] rounded-2xl overflow-hidden text-left cursor-pointer focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#E94765] select-none ${
                  selected ? 'ring-2 ring-[#E94765] ring-offset-2 ring-offset-[#FFF8F3]' : ''
                }`}
              >
                <img
                  src={tile.image}
                  alt={tile.title}
                  loading="lazy"
                  draggable={false}
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#24110C]/85 via-[#24110C]/25 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-5 sm:p-6 flex items-end justify-between gap-4">
                  <div>
                    <p className="text-xs text-[#F6D8D4] font-medium mb-1">
                      {tile.countLabel}
                    </p>
                    <h3 className="font-display text-2xl sm:text-[1.75rem] font-semibold text-[#FFF8F3] leading-tight">
                      {tile.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#FFF8F3]/80 mt-1 line-clamp-1">
                      {tile.subtitle}
                    </p>
                  </div>
                  <span className="w-10 h-10 rounded-full bg-[#FFF8F3]/15 group-hover:bg-[#E94765] text-[#FFF8F3] flex items-center justify-center shrink-0 transition-colors">
                    <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}
