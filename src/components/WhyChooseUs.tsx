import { CakeSlice, Heart, Leaf, Truck } from 'lucide-react';

const PILLARS = [
  {
    icon: Leaf,
    title: 'Fresh Ingredients',
    description: 'Quality ingredients in every bite.',
  },
  {
    icon: Heart,
    title: 'Baked with Love',
    description: 'Handcrafted fresh for every order.',
  },
  {
    icon: CakeSlice,
    title: 'Custom Designs',
    description: 'Your imagination, our creation.',
  },
  {
    icon: Truck,
    title: 'On-Time Delivery',
    description: 'Sweet surprises delivered on time.',
  },
];

export function WhyChooseUs() {
  return (
    <section className="reveal-section py-14 sm:py-16 bg-[#FFF8F3] border-y border-[#49251D]/10">
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 divide-y lg:divide-y-0 lg:divide-x divide-[#49251D]/10">
          {PILLARS.map((pillar) => {
            const Icon = pillar.icon;
            return (
              <div
                key={pillar.title}
                className="flex flex-col items-start px-3 sm:px-6 py-5 lg:py-2"
              >
                <Icon className="w-5 h-5 text-[#E94765] mb-3" strokeWidth={1.75} />
                <h3 className="font-display text-lg sm:text-xl font-semibold text-[#49251D]">
                  {pillar.title}
                </h3>
                <p className="mt-1 text-xs sm:text-sm text-[#8B7168]">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
