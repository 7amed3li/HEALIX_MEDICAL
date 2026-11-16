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
  "liver-transplantation": "/images/services/liver-transplantation.jpg",
  "kidney-transplantation": "/images/services/kidney-transplantation.jpg",
  "parkinsons-disease": "/images/services/parkinsons-disease.jpg",
  "orthopedic-surgery": "/images/services/orthopedic-surgery.jpg",
  neurosurgery: "/images/services/neurosurgery.jpg",
  "urology-prostate": "/images/services/urology-prostate.jpg",
  endocrinology: "/images/services/endocrinology.jpg",
  gastroenterology: "/images/services/gastroenterology.jpg",
  oncology: "/images/services/oncology.jpg",
  cardiology: "/images/services/cardiology.jpg",
  "rehabilitation-physiotherapy":
    "/images/services/rehabilitation-physiotherapy.jpg",
  hematology: "/images/services/hematology.jpg",
};

export function serviceImage(id: ServiceId): string {
  return serviceImages[id];
}
