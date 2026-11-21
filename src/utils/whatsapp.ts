import { BUSINESS_CONFIG } from '../data/businessConfig';
import type { CustomOrderPayload } from '../types/cake';

export function buildWhatsAppLink(message: string): string {
  return `https://wa.me/${BUSINESS_CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function buildGeneralInquiryLink(): string {
  return buildWhatsAppLink(
    "Hi! I would like to know more about your cakes and ordering options at Diti's Cake Creation.",
  );
}

export interface ProductOrderDetails {
  cakeName: string;
  priceInr: number;
  weightKg: number;
  flavor: string;
  eggless: boolean;
  quantity: number;
  cakeMessage?: string;
}

export function buildProductOrderLink(details: ProductOrderDetails): string {
  const lines = [
    `Hi! I would like to order *${details.cakeName}* (${details.weightKg} kg).`,
    `• Flavour: ${details.flavor}`,
    `• Preference: ${details.eggless ? '100% Eggless' : 'Classic Sponge'}`,
    `• Quantity: ${details.quantity}`,
    `• Estimated Price: ₹${details.priceInr.toLocaleString('en-IN')}`,
  ];

  if (details.cakeMessage && details.cakeMessage.trim()) {
    lines.push(`• Message on Cake: "${details.cakeMessage.trim()}"`);
  }

  lines.push('Please let me know availability and delivery details in Malda.');
  return buildWhatsAppLink(lines.join('\n'));
}

export function buildCustomOrderLink(payload: CustomOrderPayload): string {
  const lines = [
    `Hello ${BUSINESS_CONFIG.name}! I'd like to inquire about a *Custom Cake Order*:`,
    `• Name: ${payload.customerName}`,
    `• Phone: ${payload.phone}`,
    `• Occasion: ${payload.occasion}`,
    `• Preferred Flavour: ${payload.flavor}`,
    `• Approximate Size: ${payload.size}`,
    `• Date Needed: ${payload.dateNeeded || 'Flexible'}`,
    `• Design Idea: ${payload.details || 'Would love to discuss options'}`,
  ];

  if (payload.hasReferencePhoto) {
    lines.push(
      '• Reference Photo: I have a cake inspiration image ready and will attach it right here after sending this message.',
    );
  }

  return buildWhatsAppLink(lines.join('\n'));
}
