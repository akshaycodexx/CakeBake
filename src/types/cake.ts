export type CakeCategoryId =
  | 'all'
  | 'birthday'
  | 'wedding'
  | 'custom'
  | 'treats';

export type SortOption = 'featured' | 'price-asc' | 'price-desc';

export type CakeFlavorStyleId =
  | 'strawberry-cream'
  | 'dark-truffle'
  | 'saffron-rasmalai'
  | 'blush-rose';

export interface CakeFlavorStyle {
  id: CakeFlavorStyleId;
  label: string;
  subtitle: string;
  creamHex: string;
  dripHex: string;
  spongeHex: string;
  rosetteHex: string;
  accentBerry: 'strawberry' | 'chocolate' | 'pistachio' | 'rose';
}

export interface CategoryTile {
  id: Exclude<CakeCategoryId, 'all'>;
  title: string;
  subtitle: string;
  image: string;
  countLabel: string;
}

export interface CakeProduct {
  id: string;
  name: string;
  subtitle: string;
  category: Exclude<CakeCategoryId, 'all'>;
  categoryLabel: string;
  priceInr: number;
  defaultWeightKg: number;
  weightsKg: number[];
  flavors: string[];
  egglessAvailable: boolean;
  leadTime: string;
  image: string;
  description: string;
  featured?: boolean;
  heroStyleId: CakeFlavorStyleId;
}

export interface CustomOrderPayload {
  customerName: string;
  phone: string;
  occasion: string;
  flavor: string;
  size: string;
  dateNeeded: string;
  details: string;
  hasReferencePhoto: boolean;
}

export interface CustomerReview {
  id: string;
  customerName: string;
  occasion: string;
  quote: string;
  rating?: number;
  cakeImage?: string;
  location?: string;
  dateLabel?: string;
}
