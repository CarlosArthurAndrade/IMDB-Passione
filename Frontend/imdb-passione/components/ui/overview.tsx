"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const COLLAPSED_HEIGHT = 96;

export default function Overview({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [open, setOpen] = useState(false);
  const [fullHeight, setFullHeight] = useState<number | null>(null); // null = ainda não medido

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el) return;
    const measure = () => setFullHeight(el.scrollHeight);
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [text]);

  const measured = fullHeight !== null;
  const needsToggle = measured && fullHeight > COLLAPSED_HEIGHT;
  // fechado se: não medi ainda OU o texto é longo, e o usuário não abriu
  const collapsed = !open && (!measured || needsToggle);

  const targetHeight = collapsed
    ? COLLAPSED_HEIGHT
    : measured
    ? fullHeight
    : COLLAPSED_HEIGHT;

  return (
    <div className="w-full px-4 pt-3">
      <motion.div
        initial={{ height: COLLAPSED_HEIGHT }}
        animate={{ height: targetHeight }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="overflow-hidden"
        style={
          collapsed
            ? {
                maskImage:
                  "linear-gradient(to bottom, black 60%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, black 60%, transparent 100%)",
              }
            : undefined
        }
      >
        <p ref={ref} className="text-sm md:text-md leading-6 text-black dark:text-white/75 text-pretty">
          {text}
        </p>
      </motion.div>

      {needsToggle && (
        <button
            onClick={() => setOpen((v) => !v)}
            className="mt-2 text-xs font-semibold text-purple-900 underline underline-offset-2
                        decoration-purple-900/40 transition-colors
                        hover:text-purple-950 hover:decoration-purple-950
                        dark:text-purple-400 dark:no-underline dark:hover:text-purple-300"
            >
            {open ? "Ver menos" : "Ver mais"}
        </button>
      )}
    </div>
  );
}