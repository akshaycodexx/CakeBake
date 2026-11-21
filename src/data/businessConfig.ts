import type { CustomerReview } from '../types/cake';

export const BUSINESS_CONFIG = {
  name: "Diti's Cake Creation",
  tagline: 'Bake Happiness',
  eyebrowLocation: 'Rathbari, Malda',
  phone: '+91 83378 46351',
  phoneHref: 'tel:+918337846351',
  whatsapp: '918337846351',
  address: 'Rathbari, English Bazar, Malda, West Bengal 732101',
  landmark: 'Near Rathbari More, English Bazar',
  openingHours: 'Always Open · Made-to-Order Homemade Pre-Orders',
  instagramHandle: '@subhashreesamriddha',
  instagram: 'https://www.instagram.com/subhashreesamriddha/',
  googleMaps:
    'https://www.google.com/maps/search/?api=1&query=Rathbari+English+Bazar+Malda+West+Bengal',
  deliveryInfo:
    'Self-pickup from Rathbari & local doorstep delivery across English Bazar and Malda town.',
};

export const CUSTOMER_REVIEWS: CustomerReview[] = [
  {
    id: 'rev-soustam-spiderman',
    customerName: 'Ananya Roy',
    occasion: 'Spider-Man 2-Tier Birthday Cake',
    location: 'Rathbari, Malda',
    rating: 5,
    dateLabel: 'Verified Order',
    cakeImage: '/assets/aistudio/Screenshot_2026-11-21_144029_5123e971.png',
    quote:
      "Ordered the 2-tier Spider-Man cake for Soustam's birthday. The cream was ultra-fresh, not overly sweet, and every child at the party couldn't stop staring at the web details.",
  },
  {
    id: 'rev-rasmalai-tier',
    customerName: 'Subhamoy Sen',
    occasion: 'Royal Saffron Pistachio Rasmalai',
    location: 'English Bazar, Malda',
    rating: 5,
    dateLabel: 'Verified Order',
    cakeImage: '/assets/aistudio/Screenshot_2026-11-21_143905_ddb409ff.png',
    quote:
      'Hands down the best Rasmalai fusion cake in Malda. The cardamom sponge soaked in real saffron milk tasted completely homemade and finished within minutes.',
  },
  {
    id: 'rev-lovebirds-anniversary',
    customerName: 'Riya & Debashish Das',
    occasion: 'Lovebirds Blossom Anniversary',
    location: 'Mokdumpur, Malda',
    rating: 5,
    dateLabel: 'Verified Order',
    cakeImage: '/assets/aistudio/Screenshot_2026-11-21_144108_3095fd09.png',
    quote:
      'Sent a quick WhatsApp message two days before our anniversary and Diti recreated the exact cherry-blossom branch with fondant lovebirds. Fresh and neatly packed.',
  },
  {
    id: 'rev-bullet-truffle',
    customerName: 'Sourav Chatterjee',
    occasion: 'Royal Enfield Bullet Truffle',
    location: 'Jhaljhalia, Malda',
    rating: 5,
    dateLabel: 'Verified Order',
    cakeImage: '/assets/aistudio/Screenshot_2026-11-21_143944_bb5ba5d3.png',
    quote:
      'Surprised my brother with the Bullet dark truffle cake. The hand-molded bike looked incredible on top and the rich chocolate ganache inside was spot on.',
  },
  {
    id: 'rev-blush-rosette',
    customerName: 'Moumita Paul',
    occasion: 'Blush Rosette & Ivory Drip',
    location: 'Station Road, Malda',
    rating: 5,
    dateLabel: 'Verified Order',
    cakeImage: '/assets/aistudio/Screenshot_2026-11-21_144023_42d1ed32.png',
    quote:
      'Loved how delicate the pink buttercream rosettes and white chocolate drip looked. Ordered an eggless strawberry vanilla base and everyone in the family loved it.',
  },
  {
    id: 'rev-sunflower-meadow',
    customerName: 'Priyanka Ghosh',
    occasion: 'Golden Sunflower Meadow',
    location: 'Netaji More, Malda',
    rating: 5,
    dateLabel: 'Verified Order',
    cakeImage: '/assets/aistudio/Screenshot_2026-11-21_144054_88faf1ab.png',
    quote:
      'Picked up directly from Rathbari studio — super responsive on call and WhatsApp. The sunflower piping was gorgeous and stayed fresh till evening celebration.',
  },
];
