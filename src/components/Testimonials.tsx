import { CheckCircle2, MessageCircle, PenLine, Quote, Star, X } from 'lucide-react';
import { type FormEvent, useEffect, useMemo, useState } from 'react';
import { BUSINESS_CONFIG, CUSTOMER_REVIEWS } from '../data/businessConfig';
import type { CustomerReview } from '../types/cake';
import { buildWhatsAppLink } from '../utils/whatsapp';

const STORAGE_KEY = 'diti_cake_customer_reviews_v1';

export function Testimonials() {
  const [userReviews, setUserReviews] = useState<CustomerReview[]>([]);
  const [showAll, setShowAll] = useState(false);
  const [isWriting, setIsWriting] = useState(false);
  const [submittedNotice, setSubmittedNotice] = useState(false);

  const [customerName, setCustomerName] = useState('');
  const [occasion, setOccasion] = useState('');
  const [location, setLocation] = useState('');
  const [rating, setRating] = useState(5);
  const [quote, setQuote] = useState('');

  useEffect(() => {
    try {
      const saved = window.localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as CustomerReview[];
        if (Array.isArray(parsed)) {
          setUserReviews(parsed);
        }
      }
    } catch {
      // Ignore storage read issues in restricted environments
    }
  }, []);

  const allReviews = useMemo(
    () => [...userReviews, ...CUSTOMER_REVIEWS],
    [userReviews],
  );

  const averageRating = useMemo(() => {
    if (allReviews.length === 0) return '5.0';
    const sum = allReviews.reduce((acc, r) => acc + (r.rating ?? 5), 0);
    return (sum / allReviews.length).toFixed(1);
  }, [allReviews]);

  const displayedReviews = showAll ? allReviews : allReviews.slice(0, 3);

  const reviewShareUrl = buildWhatsAppLink(
    `Hi ${BUSINESS_CONFIG.name}! We loved our cake and would like to share a review and celebration photo.`,
  );

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !quote.trim()) return;

    const newReview: CustomerReview = {
      id: `user-rev-${Date.now()}`,
      customerName: customerName.trim(),
      occasion: occasion.trim() || 'Custom Celebration Cake',
      location: location.trim() || 'Malda',
      rating,
      dateLabel: 'Just Now',
      quote: quote.trim(),
    };

    const nextUserReviews = [newReview, ...userReviews];
    setUserReviews(nextUserReviews);
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextUserReviews));
    } catch {
      // Ignore storage write errors
    }

    setCustomerName('');
    setOccasion('');
    setLocation('');
    setRating(5);
    setQuote('');
    setIsWriting(false);
    setSubmittedNotice(true);
  };

  return (
    <section id="reviews" className="reveal-section py-20 sm:py-24 bg-[#FFF8F3] scroll-mt-16">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Section Header + Rating Summary */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-10">
          <div>
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C92F4D]">
              Customer Reviews · Malda
            </p>
            <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold text-[#49251D] tracking-tight">
              Loved Across Celebrations
            </h2>
            <div className="mt-3 flex flex-wrap items-center gap-3">
              <div className="inline-flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 fill-[#E94765] text-[#E94765]"
                  />
                ))}
              </div>
              <span className="font-mono-tabular text-sm font-semibold text-[#49251D]">
                {averageRating} / 5.0
              </span>
              <span className="text-xs sm:text-sm text-[#6B5048]">
                ({allReviews.length} customer reviews from Rathbari &amp; English Bazar)
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:inline-flex gap-2.5 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => {
                setIsWriting((prev) => !prev);
                setSubmittedNotice(false);
              }}
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 rounded-full bg-[#49251D] hover:bg-[#C92F4D] text-[#FFF8F3] text-xs sm:text-sm font-medium whitespace-nowrap transition-colors cursor-pointer"
            >
              {isWriting ? (
                <>
                  <X className="w-4 h-4 shrink-0" />
                  <span>Close Form</span>
                </>
              ) : (
                <>
                  <PenLine className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span>Write a Review</span>
                </>
              )}
            </button>

            <a
              href={reviewShareUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-1.5 sm:gap-2 px-3 sm:px-5 py-3 rounded-full border border-[#49251D]/20 hover:bg-[#F8EDE4] text-[#49251D] text-xs sm:text-sm font-medium whitespace-nowrap transition-colors"
            >
              <MessageCircle className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0 text-[#E94765]" />
              <span>WhatsApp Photo</span>
            </a>
          </div>
        </div>

        {/* Submission Success Notice */}
        {submittedNotice && (
          <div className="mb-8 rounded-2xl bg-[#F8EDE4] border border-[#E94765]/30 px-5 py-4 flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 text-sm text-[#49251D]">
              <CheckCircle2 className="w-5 h-5 text-[#E94765] shrink-0" />
              <span>
                Thank you for sharing your celebration experience! Your review is now displayed below.
              </span>
            </div>
            <button
              type="button"
              onClick={() => setSubmittedNotice(false)}
              aria-label="Dismiss notice"
              className="text-[#8B7168] hover:text-[#49251D] cursor-pointer"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}

        {/* Interactive Review Composer */}
        {isWriting && (
          <form
            onSubmit={handleSubmit}
            className="mb-10 rounded-3xl bg-[#F8EDE4] border border-[#49251D]/12 p-5 sm:p-8 space-y-5"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div>
                <h3 className="font-display text-2xl font-semibold text-[#49251D]">
                  Share Your Cake Experience
                </h3>
                <p className="text-xs sm:text-sm text-[#6B5048]">
                  Ordered a birthday, wedding, or custom cake? Leave a quick note for Malda families.
                </p>
              </div>
              <div className="flex items-center gap-1.5 pt-1 sm:pt-0">
                <span className="text-xs font-medium text-[#49251D] mr-1">Rating:</span>
                {[1, 2, 3, 4, 5].map((starVal) => (
                  <button
                    key={starVal}
                    type="button"
                    onClick={() => setRating(starVal)}
                    aria-label={`Rate ${starVal} stars`}
                    className="p-0.5 cursor-pointer transition-transform hover:scale-110"
                  >
                    <Star
                      className={`w-5 h-5 ${
                        starVal <= rating
                          ? 'fill-[#E94765] text-[#E94765]'
                          : 'text-[#49251D]/25'
                      }`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="rev-name"
                  className="block text-xs font-medium text-[#49251D] mb-1.5"
                >
                  Your Name *
                </label>
                <input
                  id="rev-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="e.g. Ananya Roy"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8F3] border border-[#49251D]/15 text-sm text-[#351D17] placeholder:text-[#8B7168]/70 focus:outline-none focus:border-[#E94765]"
                />
              </div>

              <div>
                <label
                  htmlFor="rev-occasion"
                  className="block text-xs font-medium text-[#49251D] mb-1.5"
                >
                  Cake / Occasion
                </label>
                <input
                  id="rev-occasion"
                  type="text"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  placeholder="e.g. Royal Rasmalai Birthday"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8F3] border border-[#49251D]/15 text-sm text-[#351D17] placeholder:text-[#8B7168]/70 focus:outline-none focus:border-[#E94765]"
                />
              </div>

              <div>
                <label
                  htmlFor="rev-location"
                  className="block text-xs font-medium text-[#49251D] mb-1.5"
                >
                  Area in Malda
                </label>
                <input
                  id="rev-location"
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Rathbari, Malda"
                  className="w-full px-4 py-2.5 rounded-xl bg-[#FFF8F3] border border-[#49251D]/15 text-sm text-[#351D17] placeholder:text-[#8B7168]/70 focus:outline-none focus:border-[#E94765]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="rev-quote"
                className="block text-xs font-medium text-[#49251D] mb-1.5"
              >
                Your Review *
              </label>
              <textarea
                id="rev-quote"
                required
                rows={3}
                value={quote}
                onChange={(e) => setQuote(e.target.value)}
                placeholder="Tell us about the taste, design, freshness, or delivery..."
                className="w-full px-4 py-3 rounded-xl bg-[#FFF8F3] border border-[#49251D]/15 text-sm text-[#351D17] placeholder:text-[#8B7168]/70 focus:outline-none focus:border-[#E94765] resize-none"
              />
            </div>

            <div className="flex flex-wrap items-center justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsWriting(false)}
                className="px-5 py-2.5 rounded-full text-xs sm:text-sm font-medium text-[#6B5048] hover:text-[#49251D] cursor-pointer"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full bg-[#E94765] hover:bg-[#C92F4D] text-white text-xs sm:text-sm font-medium transition-colors cursor-pointer shadow-[0_6px_16px_rgba(233,71,101,0.24)]"
              >
                Post Review
              </button>
            </div>
          </form>
        )}

        {/* Reviews Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6">
          {displayedReviews.map((review) => {
            const starCount = review.rating ?? 5;
            return (
              <article
                key={review.id}
                className="rounded-3xl bg-[#F8EDE4]/80 border border-[#49251D]/10 p-6 sm:p-7 flex flex-col justify-between gap-6 transition-transform duration-300 hover:-translate-y-0.5"
              >
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-0.5" aria-label={`${starCount} out of 5 stars`}>
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`w-3.5 h-3.5 ${
                            i < starCount
                              ? 'fill-[#E94765] text-[#E94765]'
                              : 'text-[#49251D]/20'
                          }`}
                        />
                      ))}
                    </div>
                    <Quote className="w-4 h-4 text-[#E94765]/40 shrink-0" aria-hidden="true" />
                  </div>

                  <p className="mt-3 text-[11px] font-medium uppercase tracking-[0.14em] text-[#C92F4D]">
                    {review.occasion}
                  </p>

                  <p className="mt-2.5 text-sm sm:text-[15px] text-[#351D17] leading-relaxed">
                    &ldquo;{review.quote}&rdquo;
                  </p>
                </div>

                <div className="pt-4 border-t border-[#49251D]/10 flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0">
                    {review.cakeImage ? (
                      <img
                        src={review.cakeImage}
                        alt={review.occasion}
                        loading="lazy"
                        referrerPolicy="no-referrer"
                        className="w-11 h-11 rounded-xl object-cover shrink-0 bg-[#F6D8D4]"
                      />
                    ) : (
                      <div className="w-11 h-11 rounded-xl bg-[#F6D8D4] text-[#49251D] font-display text-lg font-semibold flex items-center justify-center shrink-0">
                        {review.customerName.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0">
                      <p className="font-display text-lg font-semibold text-[#49251D] truncate leading-tight">
                        {review.customerName}
                      </p>
                      <p className="text-xs text-[#6B5048] truncate">
                        {review.location || 'Malda'}
                      </p>
                    </div>
                  </div>
                  {review.dateLabel && (
                    <span className="font-mono-tabular text-[11px] text-[#8B7168] shrink-0">
                      {review.dateLabel}
                    </span>
                  )}
                </div>
              </article>
            );
          })}
        </div>

        {/* Expand / Collapse All Reviews */}
        {allReviews.length > 3 && (
          <div className="mt-8 flex justify-center">
            <button
              type="button"
              onClick={() => setShowAll((prev) => !prev)}
              className="px-7 py-3 rounded-full border border-[#49251D]/25 hover:border-[#49251D] hover:bg-[#F8EDE4] text-[#49251D] text-sm font-medium transition-colors cursor-pointer"
            >
              {showAll ? 'Show Fewer Reviews' : `Read All ${allReviews.length} Customer Reviews`}
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
