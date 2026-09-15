import Image from "next/image";
import { siteConfig } from "@/data/site";

export default function Loading() {
  return (
    <div className="flex min-h-[100dvh] flex-col items-center justify-center" role="status" aria-label="Loading">
      <div className="relative">
        <span className="absolute inset-0 -m-5 rounded-full bg-brand-blue/15 animate-pulse-ring" aria-hidden />
        <Image src={siteConfig.brand.logoMark} alt="" width={700} height={349} className="relative h-10 w-auto" />
      </div>
      <div className="mt-6 h-0.5 w-28 overflow-hidden rounded-full bg-muted">
        <div className="h-full w-1/2 gradient-brand animate-marquee" />
      </div>
    </div>
  );
}
