"use client";

import { useRef, useState } from "react";
import { MoveHorizontal } from "lucide-react";

export default function BeforeAfter({
  before,
  after,
  alt,
}: {
  before: string;
  after: string;
  alt: string;
}) {
  const [pos, setPos] = useState(50);
  const ref = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = (clientX: number) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(94, Math.max(6, pct)));
  };

  return (
    <div
      ref={ref}
      className="group relative h-[340px] w-full select-none overflow-hidden md:h-[420px]"
      onPointerDown={(e) => {
        dragging.current = true;
        (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
        update(e.clientX);
      }}
      onPointerMove={(e) => dragging.current && update(e.clientX)}
      onPointerUp={() => (dragging.current = false)}
      onPointerLeave={() => (dragging.current = false)}
    >
      <img
        src={after}
        alt={`${alt} - after renovation`}
        className="absolute inset-0 h-full w-full object-cover"
        draggable={false}
      />
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={before}
          alt={`${alt} - before renovation`}
          className="absolute inset-0 h-full w-full max-w-none object-cover grayscale"
          style={{ width: "100%", objectFit: "cover" }}
          draggable={false}
        />
      </div>

      <span className="absolute top-4 left-4 z-10 bg-navy-950/80 px-3 py-1.5 text-[10px] font-bold tracking-[0.25em] text-white uppercase">
        Before
      </span>
      <span className="absolute top-4 right-4 z-10 bg-crimson-500 px-3 py-1.5 text-[10px] font-bold tracking-[0.25em] text-navy-950 uppercase">
        After
      </span>

      <div
        className="absolute inset-y-0 z-10 w-[2px] bg-crimson-500 shadow-[0_0_20px_rgba(196,30,42,0.8)]"
        style={{ left: `${pos}%` }}
      >
        <div className="absolute top-1/2 left-1/2 flex h-11 w-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-crimson-500 bg-navy-950/90 text-crimson-400 shadow-crimson">
          <MoveHorizontal size={20} />
        </div>
      </div>
    </div>
  );
}
