"use client";

import { useState } from "react";
import Image from "next/image";
import { MoveHorizontal } from "lucide-react";

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeAlt,
  afterAlt,
  beforeLabel = "Antes",
  afterLabel = "Después",
}: {
  beforeSrc: string;
  afterSrc: string;
  beforeAlt: string;
  afterAlt: string;
  beforeLabel?: string;
  afterLabel?: string;
}) {
  const [value, setValue] = useState(50);

  return (
    <div className="relative aspect-[4/3] w-full touch-none rounded-2xl select-none sm:aspect-[16/10]">
      <div className="absolute inset-0 overflow-hidden rounded-2xl">
        <Image src={beforeSrc} alt={beforeAlt} fill className="object-cover" />
      </div>

      <div
        className="absolute inset-0 overflow-hidden rounded-2xl"
        style={{ clipPath: `inset(0 ${100 - value}% 0 0)` }}
      >
        <Image src={afterSrc} alt={afterAlt} fill className="object-cover" />
      </div>

      <span className="absolute top-4 left-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium tracking-wide text-white uppercase">
        {beforeLabel}
      </span>
      <span className="absolute top-4 right-4 rounded-full bg-black/50 px-3 py-1 text-xs font-medium tracking-wide text-white uppercase">
        {afterLabel}
      </span>

      <div
        className="absolute inset-y-0 z-10 w-0.5 bg-white/90"
        style={{ left: `${value}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white text-foreground shadow-lg">
          <MoveHorizontal className="size-5" />
        </div>
      </div>

      <input
        type="range"
        min={0}
        max={100}
        value={value}
        onChange={(event) => setValue(Number(event.target.value))}
        aria-label="Deslizar para comparar antes y después"
        className="absolute inset-0 h-full w-full cursor-ew-resize appearance-none bg-transparent opacity-0"
      />
    </div>
  );
}
