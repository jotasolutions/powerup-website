"use server";

import { z } from "zod";

const UploadedFileSchema = z.object({
  key: z.string(),
  etag: z.string().optional(),
  size: z.number().positive(),
  type: z.string(),
  originalName: z.string().optional(),
});

const SubmitAdvisorLeadActionSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(9),
  restaurantName: z.string().min(1),
  role: z.string().min(1),
  files: z.array(UploadedFileSchema).min(1),
  placeId: z.string().optional(),
  imageUrl: z.string().optional(),
});

type SubmitAdvisorLeadActionInput = z.infer<typeof SubmitAdvisorLeadActionSchema>;

type SubmitAdvisorLeadActionResult =
  | { success: true }
  | { success: false; error: string };

function getAdminBaseUrl() {
  const baseUrl = process.env.ADMIN_URL ?? "https://admin.powerup.menu";
  return baseUrl.endsWith("/") ? baseUrl.slice(0, -1) : baseUrl;
}

export async function submitAdvisorLeadAction(
  input: SubmitAdvisorLeadActionInput
): Promise<SubmitAdvisorLeadActionResult> {
  try {
    const payload = SubmitAdvisorLeadActionSchema.parse(input);
    const normalizedBaseUrl = getAdminBaseUrl();

    const finalizeRes = await fetch(`${normalizedBaseUrl}/api/advisor/finalize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ files: payload.files }),
      cache: "no-store",
    });
    const finalizeJson = await finalizeRes.json();

    if (!finalizeRes.ok || !finalizeJson.verified) {
      throw new Error(finalizeJson.error || "finalize_failed");
    }

    const submitRes = await fetch(`${normalizedBaseUrl}/api/advisor/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: payload.name,
        email: payload.email,
        phone: payload.phone,
        restaurantName: payload.restaurantName,
        role: payload.role,
        source_images: finalizeJson.verified,
        placeId: payload.placeId,
        imageUrl: payload.imageUrl,
      }),
      cache: "no-store",
    });
    const submitJson = await submitRes.json();

    if (!submitRes.ok) {
      throw new Error(submitJson.error || "advisor_submit_failed");
    }

    return { success: true };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : "advisor_submit_failed";
    return { success: false, error: message };
  }
}
