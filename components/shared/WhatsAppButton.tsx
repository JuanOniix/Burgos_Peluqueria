import Link from "next/link";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { getWhatsAppLink } from "@/lib/whatsapp";

export function WhatsAppButton({
  message,
  size = "lg",
  className,
  children = "Agenda tu cita por WhatsApp",
}: {
  message?: string;
  size?: "default" | "lg" | "sm";
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <Button
      size={size}
      nativeButton={false}
      className={cn(
        "h-auto rounded-full bg-[#25D366] px-6 py-3.5 text-base font-medium text-white shadow-md hover:bg-[#1ebe5a] hover:text-white",
        className
      )}
      render={
        <Link
          href={getWhatsAppLink(message)}
          target="_blank"
          rel="noopener noreferrer"
        />
      }
    >
      <MessageCircle className="size-5" />
      {children}
    </Button>
  );
}
