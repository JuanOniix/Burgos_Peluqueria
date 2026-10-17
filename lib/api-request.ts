export function jsonResponse(body: unknown, status = 200): Response {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

export async function readJsonObject(
  request: Request
): Promise<{ data: Record<string, unknown> } | { error: Response }> {
  const contentLength = Number(request.headers.get("content-length") ?? "0");
  if (contentLength > 10_000) {
    return {
      error: jsonResponse({ error: "La solicitud es demasiado grande." }, 413),
    };
  }

  try {
    const body: unknown = await request.json();
    if (!isJsonObject(body)) {
      return {
        error: jsonResponse(
          { error: "El formato de la solicitud no es válido." },
          400
        ),
      };
    }
    return { data: body };
  } catch {
    return { error: jsonResponse({ error: "El JSON enviado no es válido." }, 400) };
  }
}

function isJsonObject(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export function normalizeCustomerInput(
  nameValue: unknown,
  phoneValue: unknown
): { name: string; phone: string } | null {
  if (typeof nameValue !== "string" || typeof phoneValue !== "string") {
    return null;
  }

  const name = nameValue.trim();
  if (
    name.length < 2 ||
    name.length > 100 ||
    !/^[\p{L}\p{M} .'-]+$/u.test(name)
  ) {
    return null;
  }

  if (!/^[+\d\s()-]+$/.test(phoneValue)) {
    return null;
  }

  const phone = phoneValue.replace(/\D/g, "");
  if (phone.length < 7 || phone.length > 15) {
    return null;
  }

  return { name, phone };
}
