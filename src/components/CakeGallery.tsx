import { Search, SlidersHorizontal, X } from 'lucide-react';
import { useMemo, useState } from 'react';
import { CAKE_PRODUCTS } from '../data/cakes';
import type { CakeCategoryId, CakeProduct, SortOption } from '../types/cake';
import { CakeCard } from './CakeCard';

interface CakeGalleryProps {
  activeCategory: CakeCategoryId;
  onSelectCategory: (cat: CakeCategoryId) => void;
  favorites: string[];
  onToggleFavorite: (id: string) => void;
  onSelectCake: (cake: CakeProduct) => void;
}

const FILTER_TABS: Array<{ id: CakeCategoryId; label: string }> = [
  { id: 'all', label: 'All Cakes' },
  { id: 'birthday', label: 'Birthday' },
  { id: 'wedding', label: 'Wedding & Anniversary' },
  { id: 'custom', label: 'Custom Themes' },
  { id: 'treats', label: 'Classics & Loaves' },
];

export function CakeGallery({
  activeCategory,
  onSelectCategory,
  favorites,
  onToggleFavorite,
  onSelectCake,
}: CakeGalleryProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [showAll, setShowAll] = useState(false);

  const filteredCakes = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    const list = CAKE_PRODUCTS.filter((cake) => {
      const catMatch = activeCategory === 'all' || cake.category === activeCategory;
      const searchMatch =
        !q ||
        cake.name.toLowerCase().includes(q) ||
        cake.subtitle.toLowerCase().includes(q) ||
        cake.flavors.some((f) => f.toLowerCase().includes(q)) ||
        cake.categoryLabel.toLowerCase().includes(q);
      return catMatch && searchMatch;
    });

    if (sortBy === 'price-asc') {
      return [...list].sort((a, b) => a.priceInr - b.priceInr);
    }
    if (sortBy === 'price-desc') {
      return [...list].sort((a, b) => b.priceInr - a.priceInr);
    }
    return list;
  }, [activeCategory, searchQuery, sortBy]);

  const visibleCakes =
    showAll || activeCategory !== 'all' || searchQuery.trim() !== ''
      ? filteredCakes
      : filteredCakes.slice(0, 8);

  const hasMoreToReveal =
    !showAll &&
    activeCategory === 'all' &&
    searchQuery.trim() === '' &&
    filteredCakes.length > 8;

  return (
    <section id="cakes" className="reveal-section py-14 sm:py-24 bg-[#FFF8F3]">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Heading */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-3 sm:gap-6 mb-5 sm:mb-8">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-[#C92F4D]">
              Fresh From Our Oven
            </p>
            <h2 className="mt-1.5 font-display text-3xl sm:text-4xl lg:text-5xl font-semibold text-[#49251D] tracking-tight">
              Made to Make You Smile.
            </h2>
            <p className="mt-2 text-sm sm:text-base text-[#8B7168] max-w-xl">
              Every photograph below is a real cake handcrafted in our Malda kitchen. Tap any cake
              to customize weight, flavour, or inscription and order straight on WhatsApp.
            </p>
          </div>

          <p className="font-mono-tabular text-xs sm:text-sm text-[#8B7168] shrink-0">
            Showing {visibleCakes.length} of {filteredCakes.length} creations
          </p>
        </div>

        {/* Category Filter + Search + Sort Bar */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-3 sm:gap-4 pb-5 sm:pb-7 border-b border-[#49251D]/10">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar lg:flex-wrap -mx-1 px-1 py-0.5">
            {FILTER_TABS.map((tab) => {
              const active = activeCategory === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => onSelectCategory(tab.id)}
                  className={`px-3.5 sm:px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-colors cursor-pointer whitespace-nowrap shrink-0 ${
                    active
                      ? 'bg-[#49251D] text-[#FFF8F3]'
                      : 'bg-[#F8EDE4] text-[#49251D]/80 hover:bg-[#F6D8D4]/75'
                  }`}
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <div className="relative flex-1 sm:w-64">
              <Search className="w-4 h-4 text-[#8B7168] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="search"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cake or flavour..."
                aria-label="Search cakes by name or flavour"
                className="w-full pl-10 pr-8 py-2.5 rounded-full bg-[#F8EDE4] border border-[#49251D]/10 text-sm text-[#351D17] placeholder:text-[#8B7168] focus:outline-none focus:border-[#E94765]"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  aria-label="Clear search"
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#8B7168] hover:text-[#49251D] cursor-pointer"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            <div className="relative inline-flex items-center">
              <SlidersHorizontal className="w-3.5 h-3.5 text-[#8B7168] absolute left-3.5 pointer-events-none" />
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                aria-label="Sort cakes"
                className="pl-9 pr-8 py-2.5 rounded-full bg-[#F8EDE4] border border-[#49251D]/10 text-sm text-[#49251D] focus:outline-none focus:border-[#E94765] cursor-pointer"
              >
                <option value="featured">Featured Designs</option>
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Product Grid — 2 Columns on Mobile, 3 Columns on Tablet, 4 Columns on Wide Desktop */}
        {visibleCakes.length === 0 ? (
          <div className="py-16 text-center">
            <p className="font-display text-2xl text-[#49251D]">
              No matching cakes found for "{searchQuery}"
            </p>
            <p className="text-sm text-[#8B7168] mt-1.5">
              Try a different keyword, or describe your custom design idea in the inquiry section
              below.
            </p>
            <button
              type="button"
              onClick={() => {
                setSearchQuery('');
                onSelectCategory('all');
              }}
              className="mt-5 px-5 py-2.5 rounded-full bg-[#49251D] text-[#FFF8F3] text-sm font-medium cursor-pointer"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="mt-6 sm:mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 sm:gap-y-10">
            {visibleCakes.map((cake) => (
              <CakeCard
                key={cake.id}
                cake={cake}
                isFavorite={favorites.includes(cake.id)}
                onToggleFavorite={onToggleFavorite}
                onOpenModal={onSelectCake}
              />
            ))}
          </div>
        )}

        {/* View More / Collapse */}
        {(hasMoreToReveal || (showAll && activeCategory === 'all' && !searchQuery)) && (
          <div className="mt-12 text-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="px-7 py-3.5 rounded-full border border-[#49251D]/25 hover:bg-[#49251D] hover:text-[#FFF8F3] text-[#49251D] text-sm font-medium transition-colors cursor-pointer"
            >
              {showAll
                ? 'Show Fewer Cakes'
                : `View More Cakes (${filteredCakes.length - 8} more designs)`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
