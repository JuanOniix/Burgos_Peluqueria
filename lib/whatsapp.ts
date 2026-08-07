import { siteConfig } from "@/lib/config";

export function getWhatsAppLink(message: string = siteConfig.whatsappDefaultMessage) {
  const encoded = encodeURIComponent(message);
  return `https://wa.me/${siteConfig.whatsappNumber}?text=${encoded}`;
}
