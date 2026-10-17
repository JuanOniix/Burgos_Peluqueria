"use client";

import { useState, type FormEvent } from "react";
import { MessageCircle } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";
import { services } from "@/data/services";
import { getWhatsAppLink } from "@/lib/whatsapp";

type AppointmentResult = { appointmentCode: string };

function getMinimumDateTime() {
  const minimum = new Date(Date.now() + 30 * 60 * 1000);
  minimum.setSeconds(0, 0);
  return new Date(
    minimum.getTime() - minimum.getTimezoneOffset() * 60_000
  )
    .toISOString()
    .slice(0, 16);
}

function isAppointmentResult(value: unknown): value is AppointmentResult {
  return (
    typeof value === "object" &&
    value !== null &&
    "appointmentCode" in value &&
    typeof value.appointmentCode === "string"
  );
}

export function AppointmentDialog({
  size = "lg",
  className,
  children = "Agenda tu cita",
}: {
  size?: "lg" | "sm";
  className?: string;
  children?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<AppointmentResult | null>(null);
  const [whatsAppLink, setWhatsAppLink] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);
    setError(null);

    const formData = new FormData(event.currentTarget);
    const requestedAt = new Date(String(formData.get("requestedAt")));

    try {
      const response = await fetch("/api/appointments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.get("name"),
          phone: formData.get("phone"),
          serviceSlug: formData.get("serviceSlug"),
          requestedAt: requestedAt.toISOString(),
          note: formData.get("note"),
          privacyConsent: formData.get("privacyConsent") === "on",
        }),
      });
      const payload: unknown = await response.json();

      if (!response.ok || !isAppointmentResult(payload)) {
        const message =
          typeof payload === "object" &&
          payload !== null &&
          "error" in payload &&
          typeof payload.error === "string"
            ? payload.error
            : "No pudimos registrar la solicitud. Inténtalo nuevamente.";
        throw new Error(message);
      }

      const service = services.find(
        (item) => item.slug === String(formData.get("serviceSlug"))
      );
      const message = [
        "Hola, envié una solicitud de cita en la página de Burgos Peluquería.",
        `Código: ${payload.appointmentCode}`,
        `Servicio: ${service?.title ?? "Por confirmar"}`,
        `Fecha solicitada: ${requestedAt.toLocaleString("es-CO")}`,
        `Nombre: ${String(formData.get("name"))}`,
      ].join("\n");
      setResult(payload);
      setWhatsAppLink(getWhatsAppLink(message));
    } catch (submitError) {
      setError(
        submitError instanceof Error
          ? submitError.message
          : "No pudimos registrar la solicitud. Inténtalo nuevamente."
      );
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <>
      <Button
        size={size}
        className={`h-auto rounded-full bg-[#25D366] px-6 py-3.5 text-base font-medium text-white shadow-md hover:bg-[#1ebe5a] hover:text-white ${className ?? ""}`}
        onClick={() => {
          setError(null);
          setResult(null);
          setWhatsAppLink(null);
          setOpen(true);
        }}
      >
        <MessageCircle className="size-5" />
        {children}
      </Button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-lg">
          <div className="space-y-2 pr-8">
            <DialogTitle>
              {result ? "Solicitud registrada" : "Solicita tu cita"}
            </DialogTitle>
            <DialogDescription>
              {result
                ? "La peluquería debe confirmar la disponibilidad por WhatsApp."
                : "Déjanos tus datos y el horario que prefieres. Confirmaremos la disponibilidad por WhatsApp."}
            </DialogDescription>
          </div>

          {result && whatsAppLink ? (
            <div className="space-y-4">
              <p className="rounded-lg bg-muted p-3 text-sm">
                Código de solicitud:{" "}
                <span className="font-medium">{result.appointmentCode}</span>
              </p>
              <a
                href={whatsAppLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-full items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-medium text-white hover:bg-[#1ebe5a]"
              >
                <MessageCircle className="size-4" />
                Confirmar por WhatsApp
              </a>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Nombre</span>
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Teléfono</span>
                <input
                  name="phone"
                  type="tel"
                  required
                  minLength={7}
                  maxLength={20}
                  autoComplete="tel"
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Servicio</span>
                <select
                  name="serviceSlug"
                  required
                  defaultValue={services[0].slug}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                >
                  {services.map((service) => (
                    <option key={service.slug} value={service.slug}>
                      {service.title}
                    </option>
                  ))}
                </select>
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium">Fecha y hora preferidas</span>
                <input
                  name="requestedAt"
                  type="datetime-local"
                  required
                  min={getMinimumDateTime()}
                  className="h-10 w-full rounded-lg border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>

              <label className="block space-y-1.5">
                <span className="text-sm font-medium">
                  Nota <span className="font-normal text-muted-foreground">(opcional)</span>
                </span>
                <textarea
                  name="note"
                  maxLength={500}
                  rows={3}
                  className="w-full resize-y rounded-lg border border-input bg-background px-3 py-2 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </label>

              <label className="flex items-start gap-2 text-xs text-muted-foreground">
                <input
                  name="privacyConsent"
                  type="checkbox"
                  required
                  className="mt-0.5 accent-primary"
                />
                <span>
                  Autorizo el uso de mis datos para gestionar y confirmar esta
                  solicitud de cita.
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
                {submitting ? "Guardando solicitud…" : "Guardar y continuar"}
              </Button>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
