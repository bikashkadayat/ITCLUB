import Image from "next/image";
import { PortraitPlaceholder } from "./mini-art";
import { cn } from "@/lib/utils";

/**
 * A member portrait. Real photographs are used wherever the club has supplied
 * one; otherwise a studio-style silhouette stands in, which never invents a
 * face for a real person.
 */
export function AvatarInitials({ name, photo, className, size = 96 }: { name: string; photo?: string; className?: string; size?: number }) {
  if (photo) {
    return (
      <Image src={photo} alt={name} width={size} height={size} className={cn("aspect-square shrink-0 rounded-2xl object-cover", className)} style={{ width: size, height: size }} />
    );
  }
  return (
    <div className={cn("shrink-0 overflow-hidden rounded-2xl", className)} style={{ width: size, height: size }} aria-hidden>
      <PortraitPlaceholder />
    </div>
  );
}
