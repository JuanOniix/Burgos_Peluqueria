import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { getWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppFloatingButton() {
  return (
    <Link
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Agenda tu cita por WhatsApp"
      className="group fixed right-5 bottom-5 z-50 flex size-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 sm:right-8 sm:bottom-8"
    >
      <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-75 group-hover:animate-none" />
      <MessageCircle className="relative size-7" />
    </Link>
  );
}
