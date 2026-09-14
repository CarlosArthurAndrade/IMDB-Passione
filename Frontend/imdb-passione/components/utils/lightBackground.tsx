"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";

// Camada 1: manchas grandes e bem desfocadas — dão a base de cor e volume
const softLayerGradients = `
  radial-gradient(ellipse 30vw 7vh at 20% 15%, rgba(255,255,255,0.5), transparent 70%),
  radial-gradient(ellipse 36vw 8vh at 55% 10%, rgba(255,255,255,0.4), transparent 70%),
  radial-gradient(ellipse 26vw 6vh at 85% 20%, rgba(255,255,255,0.45), transparent 70%),
  radial-gradient(ellipse 40vw 8vh at 10% 35%, rgba(255,225,215,0.5), transparent 70%),
  radial-gradient(ellipse 32vw 7vh at 45% 32%, rgba(255,210,190,0.5), transparent 70%),
  radial-gradient(ellipse 38vw 8vh at 78% 38%, rgba(255,220,200,0.45), transparent 70%),
  radial-gradient(ellipse 42vw 9vh at 25% 55%, rgba(230,180,180,0.5), transparent 70%),
  radial-gradient(ellipse 48vw 10vh at 65% 58%, rgba(220,170,175,0.5), transparent 70%),
  radial-gradient(ellipse 40vw 9vh at 5% 70%, rgba(230,180,150,0.5), transparent 70%),
  radial-gradient(ellipse 46vw 9vh at 50% 72%, rgba(220,165,140,0.5), transparent 70%),
  radial-gradient(ellipse 42vw 8vh at 88% 68%, rgba(225,175,150,0.45), transparent 70%)
`;

// Camada 2: manchas menores e menos desfocadas — adicionam um pouco de textura por cima
const crispLayerGradients = `
  radial-gradient(ellipse 16vw 3.5vh at 30% 20%, rgba(255,255,255,0.6), transparent 70%),
  radial-gradient(ellipse 20vw 4vh at 60% 30%, rgba(255,240,230,0.55), transparent 70%),
  radial-gradient(ellipse 15vw 3vh at 15% 50%, rgba(255,255,255,0.5), transparent 70%),
  radial-gradient(ellipse 22vw 3.5vh at 70% 55%, rgba(255,230,210,0.5), transparent 70%),
  radial-gradient(ellipse 18vw 3.5vh at 40% 65%, rgba(255,220,190,0.5), transparent 70%)
`;

export function SunsetBackground() {
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Evita mismatch de hydration: só decide light/dark depois de montar no client
  if (!mounted || resolvedTheme === "dark") {
    return null;
  }

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(180deg, #A8C0D8 0%, #C9B8C9 25%, #E0AFB0 50%, #EFC08E 75%, #F5D9A8 100%)",
      }}
    >
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: "blur(18px)",
          opacity: 0.9,
          backgroundImage: softLayerGradients,
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          filter: "blur(8px)",
          opacity: 0.5,
          backgroundImage: crispLayerGradients,
        }}
      />
    </div>
  );
}
