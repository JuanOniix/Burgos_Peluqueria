"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { useCart } from "@/lib/cart-context";
import { formatCOP } from "@/lib/utils";
import { getCartWhatsAppLink } from "@/lib/whatsapp";

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const { items, itemCount, subtotal, removeItem, setQuantity } = useCart();

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        aria-label="Ver carrito"
        onClick={() => setOpen(true)}
      >
        <ShoppingBag className="size-5" />
        {itemCount > 0 && (
          <span className="absolute top-0 right-0 flex size-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {itemCount}
          </span>
        )}
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="flex w-full flex-col sm:max-w-sm">
          <SheetHeader>
            <SheetTitle>Tu carrito</SheetTitle>
          </SheetHeader>

          {items.length === 0 ? (
            <div className="flex flex-1 flex-col items-center justify-center gap-2 px-4 text-center text-sm text-muted-foreground">
              <ShoppingBag className="size-8 text-muted-foreground/50" />
              Tu carrito está vacío
            </div>
          ) : (
            <>
              <div className="flex-1 space-y-4 overflow-y-auto px-4">
                {items.map((item) => (
                  <div key={item.id} className="flex gap-3">
                    <div className="relative size-16 shrink-0 overflow-hidden rounded-lg">
                      <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        sizes="64px"
                        className="object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium text-foreground">
                          {item.name}
                        </p>
                        <button
                          type="button"
                          aria-label={`Quitar ${item.name}`}
                          onClick={() => removeItem(item.id)}
                          className="text-muted-foreground hover:text-destructive"
                        >
                          <Trash2 className="size-4" />
                        </button>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {formatCOP(item.price)}
                      </p>
                      <div className="mt-2 flex items-center gap-2">
                        <button
                          type="button"
                          aria-label="Disminuir cantidad"
                          onClick={() => setQuantity(item.id, item.quantity - 1)}
                          className="flex size-6 items-center justify-center rounded-full border border-border hover:bg-muted"
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-4 text-center text-sm">
                          {item.quantity}
                        </span>
                        <button
                          type="button"
                          aria-label="Aumentar cantidad"
                          onClick={() => setQuantity(item.id, item.quantity + 1)}
                          className="flex size-6 items-center justify-center rounded-full border border-border hover:bg-muted"
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <SheetFooter className="border-t border-border">
                <div className="flex items-center justify-between text-sm font-medium">
                  <span className="text-foreground">Subtotal</span>
                  <span className="text-foreground">{formatCOP(subtotal)}</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  El pago se coordina directamente por WhatsApp con Burgos
                  Peluquería.
                </p>
                <Button
                  nativeButton={false}
                  render={
                    <Link
                      href={getCartWhatsAppLink(items)}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setOpen(false)}
                    />
                  }
                  className="w-full rounded-full bg-[#25D366] text-white hover:bg-[#1ebe5a] hover:text-white"
                >
                  <ShoppingBag className="size-4" />
                  Enviar pedido por WhatsApp
                </Button>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
