import type { ServiceId } from "@/content/services";

/**
 * Anatomical render for each specialty (Design v2 – owner reference direction).
 *
 * Imagery is keyed by the stable service id so the translated content files
 * stay free of presentation concerns. Each render shows the organ in rich red
 * tones over a semi-transparent blue body silhouette on a soft light-blue
 * background, matching the owner's approved reference mockup.
 */
export const serviceImages: Record<ServiceId, string> = {
  "liver-transplantation": "/images/services/liver-transplantation.webp",
  "kidney-transplantation": "/images/services/kidney-transplantation.webp",
  "parkinsons-disease": "/images/services/parkinsons-disease.webp",
  "orthopedic-surgery": "/images/services/orthopedic-surgery.webp",
  neurosurgery: "/images/services/neurosurgery.webp",
  "urology-prostate": "/images/services/urology-prostate.webp",
  endocrinology: "/images/services/endocrinology.webp",
  gastroenterology: "/images/services/gastroenterology.webp",
  oncology: "/images/services/oncology.webp",
  cardiology: "/images/services/cardiology.webp",
  "rehabilitation-physiotherapy":
    "/images/services/rehabilitation-physiotherapy.webp",
  hematology: "/images/services/hematology.webp",
};

export function serviceImage(id: ServiceId): string {
  return serviceImages[id];
}
