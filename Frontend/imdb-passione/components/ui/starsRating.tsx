"use client";
 
import { useRef, useState } from "react";
 
type StarRatingProps = {
  value: number; // 0 a 5, de 0.5 em 0.5
  onChange: (value: number) => void;
  size?: number; // tamanho da fonte em px
};
 
export default function StarRating({
  value,
  onChange,
  size = 32,
}: StarRatingProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [hover, setHover] = useState<number | null>(null);
  const display = hover ?? value;
 
  // converte a posição do mouse/dedo em nota (0.5 a 5)
  function valueFromPointer(clientX: number) {
    const rect = ref.current!.getBoundingClientRect();
    const ratio = (clientX - rect.left) / rect.width;
    return Math.min(5, Math.max(0.5, Math.ceil(ratio * 10) / 2));
  }
 
  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    if (e.key === "ArrowRight" || e.key === "ArrowUp") {
      e.preventDefault();
      onChange(Math.min(5, value + 0.5));
    }
    if (e.key === "ArrowLeft" || e.key === "ArrowDown") {
      e.preventDefault();
      onChange(Math.max(0, value - 0.5));
    }
  }
 
  return (
    <div className="flex items-center gap-3">
      <div
        ref={ref}
        role="slider"
        tabIndex={0}
        aria-label="Nota"
        aria-valuemin={0}
        aria-valuemax={5}
        aria-valuenow={value}
        aria-valuetext={`${value} de 5`}
        onKeyDown={handleKeyDown}
        onPointerMove={(e) => {
          if (e.pointerType === "mouse") setHover(valueFromPointer(e.clientX));
        }}
        onPointerLeave={() => setHover(null)}
        onClick={(e) => {
          const next = valueFromPointer(e.clientX);
          onChange(next === value ? 0 : next); // clicar de novo zera
        }}
        className="relative w-fit cursor-pointer select-none rounded-md leading-none outline-none focus-visible:ring-2 focus-visible:ring-purple-500"
        style={{ fontSize: size }}
      >
        {/* fundo: 5 estrelas cinza */}
        <span className="text-zinc-700">★★★★★</span>
 
        {/* frente: 5 estrelas roxas cortadas na largura da nota */}
        <span
          aria-hidden="true"
          className="absolute left-0 top-0 overflow-hidden whitespace-nowrap text-purple-500"
          style={{ width: `${(display / 5) * 100}%` }}
        >
          ★★★★★
        </span>
      </div>
 
      <span className="min-w-8 text-sm tabular-nums text-zinc-300">
        {display.toFixed(1)}
      </span>
    </div>
  );
}