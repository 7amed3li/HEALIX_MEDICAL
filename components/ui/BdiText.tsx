import React from "react";

/**
 * Isolates Latin brand tokens ("HEALIX MEDICAL", "KVKK", "wa.me") inside `<bdi dir="ltr">`
 * so bidirectional text in Arabic (RTL) never scrambles surrounding punctuation.
 */
export function BdiText({ text }: { text: string }) {
  const parts = text.split(/(HEALIX MEDICAL|HEALIX|KVKK)/g);
  if (parts.length === 1) return <>{text}</>;
  return (
    <>
      {parts.map((part, i) =>
        part === "HEALIX MEDICAL" || part === "HEALIX" || part === "KVKK" ? (
          <bdi key={i} dir="ltr">
            {part}
          </bdi>
        ) : (
          <React.Fragment key={i}>{part}</React.Fragment>
        )
      )}
    </>
  );
}
