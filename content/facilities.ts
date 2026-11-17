export type FacilityBrand =
  | "medical-park"
  | "vm-medical-park"
  | "liv-hospital"
  | "istinye-university"
  | "istanbul-aydin";

export type Facility = {
  id: string;
  name: string;
  brand: FacilityBrand;
  agreement: "mlp" | "liv";
  city: string;
  type: "hospital" | "dental";
  /** Optional official partner logo path under /public/images/facilities/ once provided by the owner. */
  logo?: string;
};

/**
 * Complete registry of the 33 confirmed contracted healthcare facilities
 * (31 under the MLP / Medical Park & University agreement + 2 under the Liv Ulus & Vadistanbul agreement,
 * including 1 dental research and application center).
 */
export const facilities: Facility[] = [
  // B. Separate Liv Ulus – Liv Vadistanbul agreement (2 facilities)
  { id: "liv-ulus", name: "LIV HOSPITAL ULUS", brand: "liv-hospital", agreement: "liv", city: "İstanbul", type: "hospital" },
  { id: "liv-vadistanbul", name: "LIV HOSPITAL VADİSTANBUL", brand: "liv-hospital", agreement: "liv", city: "İstanbul", type: "hospital" },

  // A. AZİZ ALLAM – MLP revised agreement (31 facilities)
  { id: "mp-istanbul-onkoloji", name: "MEDICAL PARK İSTANBUL ONKOLOJİ HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-goztepe", name: "MEDICAL PARK GÖZTEPE HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-tem", name: "MEDICAL PARK TEM HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-gebze-vm", name: "MEDICAL PARK GEBZE VM HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "Kocaeli", type: "hospital" },
  { id: "vm-pendik", name: "VM MEDICAL PARK PENDİK HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-bahcelievler", name: "MEDICAL PARK BAHÇELİEVLER HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-bursa", name: "MEDICAL PARK BURSA HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Bursa", type: "hospital" },
  { id: "mp-antalya", name: "MEDICAL PARK ANTALYA HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Antalya", type: "hospital" },
  { id: "mp-ordu", name: "MEDICAL PARK ORDU HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Ordu", type: "hospital" },
  { id: "mp-trabzon", name: "MEDICAL PARK TRABZON HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Trabzon", type: "hospital" },
  { id: "mp-karadeniz", name: "MEDICAL PARK KARADENİZ HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Trabzon", type: "hospital" },
  { id: "mp-ankara", name: "MEDICAL PARK ANKARA HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Ankara", type: "hospital" },
  { id: "vm-mersin", name: "VM MEDICAL PARK MERSİN HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "Mersin", type: "hospital" },
  { id: "mp-atasehir", name: "MEDICAL PARK ATAŞEHİR HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-izmir", name: "MEDICAL PARK İZMİR HASTANESİ", brand: "medical-park", agreement: "mlp", city: "İzmir", type: "hospital" },
  { id: "liv-ankara", name: "LIV HOSPITAL ANKARA HASTANESİ", brand: "liv-hospital", agreement: "mlp", city: "Ankara", type: "hospital" },
  { id: "liv-gaziantep", name: "LIV HOSPITAL GAZİANTEP HASTANESİ", brand: "liv-hospital", agreement: "mlp", city: "Gaziantep", type: "hospital" },
  { id: "vm-ankara", name: "VM MEDICAL PARK ANKARA HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "Ankara", type: "hospital" },
  { id: "mp-tokat", name: "MEDICAL PARK TOKAT HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Tokat", type: "hospital" },
  { id: "mp-samsun", name: "MEDICAL PARK SAMSUN HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Samsun", type: "hospital" },
  { id: "liv-samsun", name: "LIV HOSPITAL SAMSUN HASTANESİ", brand: "liv-hospital", agreement: "mlp", city: "Samsun", type: "hospital" },
  { id: "vm-maltepe", name: "VM MEDICAL PARK MALTEPE HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "mp-adana", name: "MEDICAL PARK ADANA HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Adana", type: "hospital" },
  { id: "mp-seyhan", name: "MEDICAL PARK SEYHAN HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Adana", type: "hospital" },
  { id: "mp-gebze", name: "MEDICAL PARK GEBZE HASTANESİ", brand: "medical-park", agreement: "mlp", city: "Kocaeli", type: "hospital" },
  { id: "vm-kocaeli", name: "VM MEDICAL PARK KOCAELİ HASTANESİ", brand: "vm-medical-park", agreement: "mlp", city: "Kocaeli", type: "hospital" },
  { id: "istinye-esenyurt", name: "İSTİNYE ÜNİVERSİTESİ TIP FAKÜLTESİ HASTANESİ – ESENYURT EK BİNASI", brand: "istinye-university", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "istinye-topkapi", name: "İSTİNYE ÜNİVERSİTESİ TIP FAKÜLTESİ HASTANESİ – TOPKAPI EK BİNASI", brand: "istinye-university", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "istinye-gop", name: "İSTİNYE ÜNİVERSİTESİ TIP FAKÜLTESİ HASTANESİ – GAZİOSMANPAŞA EK BİNASI", brand: "istinye-university", agreement: "mlp", city: "İstanbul", type: "hospital" },
  { id: "istinye-dental", name: "İSTİNYE ÜNİVERSİTESİ AĞIZ VE DİŞ SAĞLIĞI ARAŞTIRMA VE UYGULAMA MERKEZİ", brand: "istinye-university", agreement: "mlp", city: "İstanbul", type: "dental" },
  { id: "aydin-suam", name: "İSTANBUL AYDIN ÜNİVERSİTESİ SAĞLIK UYGULAMA VE ARAŞTIRMA MERKEZİ", brand: "istanbul-aydin", agreement: "mlp", city: "İstanbul", type: "hospital" },
];
