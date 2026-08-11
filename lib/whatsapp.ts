import type { CartItem } from "@/lib/cart-context";
import { siteConfig } from "@/lib/config";
import { formatCOP } from "@/lib/utils";

export function getWhatsAppLink(message: string = siteConfig.whatsappDefaultMessage) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}

export function getCartOrderMessage(items: CartItem[]) {
  const lines = items.map(
    (item) =>
      `• ${item.name} x${item.quantity} — ${formatCOP(item.price * item.quantity)}`
  );
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  return [
    "Hola, quisiera hacer este pedido:",
    "",
    ...lines,
    "",
    `Total: ${formatCOP(total)}`,
  ].join("\n");
}

export function getCartWhatsAppLink(items: CartItem[]) {
  return getWhatsAppLink(getCartOrderMessage(items));
}
