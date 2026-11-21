import { MessageCircle, Upload } from 'lucide-react';
import { useState, type ChangeEvent, type FormEvent } from 'react';
import { CUSTOM_OCCASIONS } from '../data/cakes';
import { buildCustomOrderLink } from '../utils/whatsapp';

export function CustomOrder() {
  const [customerName, setCustomerName] = useState('');
  const [phone, setPhone] = useState('');
  const [occasion, setOccasion] = useState('Birthday');
  const [flavor, setFlavor] = useState('Belgian Chocolate Truffle');
  const [size, setSize] = useState('1.5 kg');
  const [dateNeeded, setDateNeeded] = useState('');
  const [details, setDetails] = useState('');
  const [referenceFileName, setReferenceFileName] = useState('');
  const [validationError, setValidationError] = useState('');
  const [submittedUrl, setSubmittedUrl] = useState('');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    setReferenceFileName(file ? file.name : '');
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!customerName.trim() || !phone.trim()) {
      setValidationError('Please enter your name and phone number before sending on WhatsApp.');
      return;
    }
    setValidationError('');

    const url = buildCustomOrderLink({
      customerName: customerName.trim(),
      phone: phone.trim(),
      occasion,
      flavor,
      size,
      dateNeeded,
      details: details.trim(),
      hasReferencePhoto: Boolean(referenceFileName),
    });

    setSubmittedUrl(url);
    const link = document.createElement('a');
    link.href = url;
    link.target = '_blank';
    link.rel = 'noopener noreferrer';
    link.click();
  };

  return (
    <section
      id="custom-cakes"
      className="reveal-section py-20 sm:py-28 bg-[#F8EDE4]"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="max-w-2xl mb-12">
          <p className="text-xs font-medium tracking-[0.22em] uppercase text-[#C92F4D]">
            Bespoke Cake Studio
          </p>
          <h2 className="mt-2 font-display text-3xl sm:text-5xl font-semibold text-[#49251D] tracking-tight">
            Dream It. <span className="italic text-[#E94765]">We&apos;ll Bake It.</span>
          </h2>
          <p className="mt-3 text-sm sm:text-base text-[#6B5048] leading-relaxed">
            Have something special in mind? Tell us your idea, and we&apos;ll create a cake
            that&apos;s uniquely yours.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Left: Occasion Inspiration Mosaic */}
          <div className="lg:col-span-5 grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-2 gap-3.5 sm:gap-4">
            {CUSTOM_OCCASIONS.map((item) => (
              <button
                key={item.title}
                type="button"
                onClick={() => setOccasion(item.title)}
                className={`group relative aspect-square rounded-2xl overflow-hidden text-left cursor-pointer transition-all ${
                  occasion === item.title
                    ? 'ring-2 ring-[#E94765] ring-offset-2 ring-offset-[#F8EDE4]'
                    : ''
                }`}
              >
                <img
                  src={item.image}
                  alt={item.title}
                  loading="lazy"
                  referrerPolicy="no-referrer"
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-gradient-to-t from-[#24110C]/85 via-[#24110C]/20 to-transparent"
                />
                <div className="absolute inset-x-0 bottom-0 p-3.5">
                  <p className="font-display text-base sm:text-lg font-semibold text-[#FFF8F3] leading-tight">
                    {item.title}
                  </p>
                  <p className="text-[11px] text-[#FFF8F3]/80 mt-0.5 line-clamp-1">
                    {item.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>

          {/* Right: Validated Custom Inquiry Form */}
          <form
            onSubmit={handleSubmit}
            className="lg:col-span-7 bg-[#FFF8F3] rounded-3xl p-6 sm:p-9 shadow-[0_14px_40px_rgba(73,37,29,0.06)] space-y-5"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="custom-name"
                  className="block text-xs font-medium text-[#49251D] mb-1.5"
                >
                  Your Name *
                </label>
                <input
                  id="custom-name"
                  type="text"
                  required
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                  placeholder="Enter your name"
                  className="w-full px-4 py-3 rounded-xl bg-[#F8EDE4]/70 border border-[#49251D]/12 text-sm text-[#351D17] placeholder:text-[#8B7168] focus:outline-none focus:border-[#E94765]"
                />
              </div>

              <div>
                <label
                  htmlFor="custom-phone"
                  className="block text-xs font-medium text-[#49251D] mb-1.5"
                >
                  Phone Number *
                </label>
                <input
                  id="custom-phone"
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98..."
                  className="w-full px-4 py-3 rounded-xl bg-[#F8EDE4]/70 border border-[#49251D]/12 text-sm text-[#351D17] placeholder:text-[#8B7168] focus:outline-none focus:border-[#E94765]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label
                  htmlFor="custom-occasion"
                  className="block text-xs font-medium text-[#49251D] mb-1.5"
                >
                  Occasion
                </label>
                <select
                  id="custom-occasion"
                  value={occasion}
                  onChange={(e) => setOccasion(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#F8EDE4]/70 border border-[#49251D]/12 text-sm text-[#351D17] focus:outline-none focus:border-[#E94765]"
                >
                  <option value="Birthday">Birthday</option>
                  <option value="Wedding">Wedding</option>
                  <option value="Anniversary">Anniversary</option>
                  <option value="Baby Shower">Baby Shower</option>
                  <option value="Graduation">Graduation</option>
                  <option value="Theme Cake">Custom Theme Cake</option>
                  <option value="Superbike & Hobby">Superbike &amp; Hobby</option>
                  <option value="Signature Rasmalai">Signature Rasmalai</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="custom-flavor"
                  className="block text-xs font-medium text-[#49251D] mb-1.5"
                >
                  Cake Flavour
                </label>
                <select
                  id="custom-flavor"
                  value={flavor}
                  onChange={(e) => setFlavor(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#F8EDE4]/70 border border-[#49251D]/12 text-sm text-[#351D17] focus:outline-none focus:border-[#E94765]"
                >
                  <option value="Royal Rasmalai Saffron">Royal Rasmalai Saffron</option>
                  <option value="Belgian Chocolate Truffle">Belgian Chocolate Truffle</option>
                  <option value="Strawberry Whipped Cream">Strawberry Whipped Cream</option>
                  <option value="Red Velvet Cream Cheese">Red Velvet Cream Cheese</option>
                  <option value="Butterscotch Praline">Butterscotch Praline</option>
                  <option value="Fresh Pineapple Cream">Fresh Pineapple Cream</option>
                </select>
              </div>

              <div>
                <label
                  htmlFor="custom-size"
                  className="block text-xs font-medium text-[#49251D] mb-1.5"
                >
                  Cake Size
                </label>
                <select
                  id="custom-size"
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                  className="w-full px-3.5 py-3 rounded-xl bg-[#F8EDE4]/70 border border-[#49251D]/12 text-sm text-[#351D17] focus:outline-none focus:border-[#E94765]"
                >
                  <option value="0.5 kg">0.5 kg (4–6 guests)</option>
                  <option value="1 kg">1 kg (8–12 guests)</option>
                  <option value="1.5 kg">1.5 kg (15–18 guests)</option>
                  <option value="2 kg (2-Tier)">2 kg (2-Tier)</option>
                  <option value="3 kg+ (Grand Tier)">3 kg+ (Grand Tier)</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="custom-date"
                  className="block text-xs font-medium text-[#49251D] mb-1.5"
                >
                  Date Needed
                </label>
                <input
                  id="custom-date"
                  type="date"
                  value={dateNeeded}
                  onChange={(e) => setDateNeeded(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-[#F8EDE4]/70 border border-[#49251D]/12 text-sm text-[#351D17] focus:outline-none focus:border-[#E94765]"
                />
              </div>

              <div>
                <label
                  htmlFor="custom-photo"
                  className="block text-xs font-medium text-[#49251D] mb-1.5"
                >
                  Inspiration Photo (Optional)
                </label>
                <label
                  htmlFor="custom-photo"
                  className="flex items-center gap-2.5 w-full px-4 py-3 rounded-xl bg-[#F8EDE4]/70 border border-dashed border-[#49251D]/25 text-sm text-[#6B5048] hover:border-[#E94765] cursor-pointer truncate"
                >
                  <Upload className="w-4 h-4 text-[#E94765] shrink-0" />
                  <span className="truncate">
                    {referenceFileName || 'Choose cake photo'}
                  </span>
                </label>
                <input
                  id="custom-photo"
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="sr-only"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="custom-details"
                className="block text-xs font-medium text-[#49251D] mb-1.5"
              >
                Design Details &amp; Cake Message
              </label>
              <textarea
                id="custom-details"
                rows={3}
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                placeholder="Share theme colors, fondant toppers, Eggless preference, and name inscription..."
                className="w-full px-4 py-3 rounded-xl bg-[#F8EDE4]/70 border border-[#49251D]/12 text-sm text-[#351D17] placeholder:text-[#8B7168] focus:outline-none focus:border-[#E94765]"
              />
            </div>

            {referenceFileName && (
              <p className="text-xs text-[#8B7168]">
                Note: After opening WhatsApp with your details, simply tap the paperclip icon inside
                WhatsApp to attach <strong className="text-[#49251D]">{referenceFileName}</strong>.
              </p>
            )}

            {validationError && (
              <p role="alert" className="text-xs text-[#C92F4D] font-medium">
                {validationError}
              </p>
            )}

            <button
              type="submit"
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-[#E94765] hover:bg-[#C92F4D] text-white text-sm font-medium transition-colors shadow-[0_10px_22px_rgba(233,71,101,0.25)] cursor-pointer"
            >
              <MessageCircle className="w-4 h-4" />
              <span>Send Custom Inquiry on WhatsApp</span>
            </button>

            {submittedUrl && (
              <p className="text-xs text-[#6B5048]">
                Inquiry ready!{' '}
                <a
                  href={submittedUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline text-[#C92F4D] font-medium"
                >
                  Click here if WhatsApp did not open automatically.
                </a>
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}
