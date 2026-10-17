"use client";

import { useState, type FormEvent } from "react";
import Image from "next/image";
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
import { getWhatsAppLink } from "@/lib/whatsapp";

type SavedOrder = {
  orderCode: string;
  subtotal: number;
  items: { name: string; quantity: number; lineTotal: number }[];
};

function isSavedOrder(value: unknown): value is SavedOrder {
  return (
    typeof value === "object" &&
    value !== null &&
    "orderCode" in value &&
    typeof value.orderCode === "string" &&
    "subtotal" in value &&
    typeof value.subtotal === "number" &&
    "items" in value &&
    Array.isArray(value.items) &&
    value.items.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "name" in item &&
        typeof item.name === "string" &&
        "quantity" in item &&
        typeof item.quantity === "number" &&
        "lineTotal" in item &&
        typeof item.lineTotal === "number"
    )
  );
}

export function CartDrawer() {
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [privacyConsent, setPrivacyConsent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [orderCode, setOrderCode] = useState<string | null>(null);
  const [whatsAppLink, setWhatsAppLink] = useState<string | null>(null);
  const {
    items,
    itemCount,
    subtotal,
    removeItem,
    setQuantity,
    clearCart,
  } = useCart();

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          phone,
          privacyConsent,
          items: items.map((item) => ({
            id: item.id,
            quantity: item.quantity,
          })),
        }),
      });
      const payload: unknown = await response.json();

      if (!response.ok || !isSavedOrder(payload)) {
        const message =
          typeof payload === "object" &&
          payload !== null &&
          "error" in payload &&
          typeof payload.error === "string"
            ? payload.error
            : "No pudimos registrar el pedido. Inténtalo nuevamente.";
        throw new Error(message);
      }

      setOrderCode(payload.orderCode);
      const lines = payload.items.map(
        (item) =>
          `• ${item.name} x${item.quantity} — ${formatCOP(item.lineTotal)}`
      );
      const message = [
        "Hola, quisiera hacer este pedido:",
        "",
        ...lines,
        "",
        `Total: ${formatCOP(payload.subtotal)}`,
        "",
        `Código de pedido: ${payload.orderCode}`,
      ].join("\n");
      setWhatsAppLink(getWhatsAppLink(message));
      clearCart();
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No pudimos registrar el pedido. Inténtalo nuevamente."
      );
    } finally {
      setSubmitting(false);
    }
  }

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

          {orderCode && whatsAppLink ? (
            <div className="flex flex-1 flex-col justify-center gap-4 px-4">
              <div className="space-y-2 text-center">
                <ShoppingBag className="mx-auto size-8 text-primary" />
                <p className="font-medium text-foreground">Pedido registrado</p>
                <p className="text-sm text-muted-foreground">
                  Código: {orderCode}
                </p>
                <p className="text-xs text-muted-foreground">
                  El pago y la recogida se coordinan con la peluquería.
                </p>
              </div>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 items-center justify-center rounded-full bg-[#25D366] px-5 text-sm font-medium text-white hover:bg-[#1ebe5a]"
              >
                Enviar pedido por WhatsApp
              </a>
              <button
                type="button"
                className="text-sm text-muted-foreground underline underline-offset-4"
                onClick={() => {
                  setOrderCode(null);
                  setWhatsAppLink(null);
                  setName("");
                  setPhone("");
                  setPrivacyConsent(false);
                }}
              >
                Cerrar confirmación
              </button>
            </div>
          ) : items.length === 0 ? (
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
                  Guardaremos el pedido y coordinaremos el pago por WhatsApp.
                </p>
                <form onSubmit={handleSubmit} className="space-y-3">
                  <label className="block space-y-1">
                    <span className="text-xs font-medium">Nombre</span>
                    <input
                      value={name}
                      onChange={(event) => setName(event.target.value)}
                      required
                      minLength={2}
                      maxLength={100}
                      autoComplete="name"
                      className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>
                  <label className="block space-y-1">
                    <span className="text-xs font-medium">Teléfono</span>
                    <input
                      value={phone}
                      onChange={(event) => setPhone(event.target.value)}
                      type="tel"
                      required
                      minLength={7}
                      maxLength={20}
                      autoComplete="tel"
                      className="h-9 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                    />
                  </label>
                  <label className="flex items-start gap-2 text-xs text-muted-foreground">
                    <input
                      type="checkbox"
                      required
                      checked={privacyConsent}
                      onChange={(event) =>
                        setPrivacyConsent(event.target.checked)
                      }
                      className="mt-0.5 accent-primary"
                    />
                    <span>
                      Autorizo el uso de mis datos para gestionar este pedido.
                    </span>
                  </label>
                  {error && (
                    <p role="alert" className="text-sm text-destructive">
                      {error}
                    </p>
                  )}
                  <Button
                    type="submit"
                    disabled={submitting}
                    className="w-full rounded-full bg-[#25D366] text-white hover:bg-[#1ebe5a] hover:text-white"
                  >
                    <ShoppingBag className="size-4" />
                    {submitting ? "Guardando pedido…" : "Guardar y enviar pedido"}
                  </Button>
                </form>
              </SheetFooter>
            </>
          )}
        </SheetContent>
      </Sheet>
    </>
  );
}
