import Image from "next/image";
import { cn, initials } from "@/lib/utils";

export function AvatarInitials({ name, photo, className, size = 96 }: { name: string; photo?: string; className?: string; size?: number }) {
  if (photo) {
    return (
      <Image src={photo} alt={name} width={size} height={size} className={cn("aspect-square shrink-0 rounded-2xl object-cover", className)} style={{ width: size, height: size }} />
    );
  }
  return (
    <div
      className={cn(
        "flex items-center justify-center rounded-2xl bg-gradient-to-br from-brand-blue via-brand-blue-light to-brand-coral font-display text-2xl font-semibold text-white shadow-inner",
        className
      )}
      style={{ width: size, height: size }}
      aria-hidden
    >
      {initials(name)}
    </div>
  );
}
