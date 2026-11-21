import { ClipboardList, Scale, Users } from "lucide-react";
import type { GuideId } from "@/content/guides";

type Props = {
  id: GuideId;
  className?: string;
};

/**
 * Icon system for the 3 guides (lucide, uniform strokeWidth={1.75}):
 * law → Scale, living-donor rules → Users, ethics-commission file → ClipboardList.
 */
export function GuideIcon({ id, className = "h-6 w-6" }: Props) {
  switch (id) {
    case "transplant-law-foreign-patients":
      return <Scale className={className} strokeWidth={1.75} aria-hidden="true" />;
    case "who-can-be-a-living-donor":
      return <Users className={className} strokeWidth={1.75} aria-hidden="true" />;
    case "ethics-commission-documents-approval":
      return <ClipboardList className={className} strokeWidth={1.75} aria-hidden="true" />;
    default:
      return <Scale className={className} strokeWidth={1.75} aria-hidden="true" />;
  }
}
