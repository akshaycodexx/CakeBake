import { BUSINESS_CONFIG } from '../data/businessConfig';

export function getGoogleMapsDirectionsUrl(): string {
  return BUSINESS_CONFIG.googleMaps;
}

export const DELIVERY_ZONES = [
  'Rathbari & English Bazar',
  'Mokdumpur & Station Road',
  'Jhaljhalia & Netaji More',
  'Mangalbari & Old Malda',
];
