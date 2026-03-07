import type { BrandShape } from "@/lib/apps";

type BrandIconProps = {
  shape: BrandShape;
  className?: string;
  decorative?: boolean;
  label?: string;
};

const sharedStyles = "inline-block shrink-0";

export function BrandIcon({
  shape,
  className,
  decorative = true,
  label,
}: BrandIconProps) {
  if (shape === "triangle") {
    return (
      <span
        className={`${sharedStyles} bg-gradient-to-br from-green-800 to-green-600 ${className ?? "h-8 w-8"}`}
        style={{ clipPath: "polygon(50% 8%, 8% 92%, 92% 92%)" }}
        aria-hidden={decorative}
        aria-label={decorative ? undefined : label}
      />
    );
  }

  return (
    <span
      className={`${sharedStyles} rounded-full bg-gradient-to-br from-green-800 to-green-600 ${className ?? "h-8 w-8"}`}
      aria-hidden={decorative}
      aria-label={decorative ? undefined : label}
    />
  );
}
