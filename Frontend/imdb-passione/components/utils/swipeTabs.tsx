'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { LuClapperboard } from 'react-icons/lu';
import { GoPerson } from 'react-icons/go';
import { FiTv } from 'react-icons/fi';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';
import { useTheme } from 'next-themes';

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

function useIsLargeScreen() {
  const [isLarge, setIsLarge] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia('(min-width: 1024px)');
    setIsLarge(mql.matches);

    const handler = (e: MediaQueryListEvent) => setIsLarge(e.matches);
    mql.addEventListener('change', handler);
    return () => mql.removeEventListener('change', handler);
  }, []);

  return isLarge;}

export default function SwipeTabs({
  screens,
}: {
  screens: ReactNode[];
}) {
  const { resolvedTheme, setTheme } = useTheme();
  const [[index, direction], setIndex] = useState<[number, number]>([0, 0]);
  const [isDragging, setIsDragging] = useState(false);
  const isLargeScreen = useIsLargeScreen();
  const clickBlockTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const pointerStart = useRef<{ x: number; y: number } | null>(null);
  const touchStart = useRef<{ x: number; y: number } | null>(null);
  const pointerSwipeTriggered = useRef(false);
  const total = screens.length;

  useEffect(() => {
    return () => {
      if (clickBlockTimeout.current) {
        clearTimeout(clickBlockTimeout.current);
      }
    };
  }, []);

  if (total === 0) {
    return null;
  }

  const TAB_ICONS = [
    <LuClapperboard size={20} key="filmes"/>,
    <FiTv size={20} key="series"/>,
    <GoPerson size={20} key="perfil"/>,
  ];

  const TAB_LABELS = ['filmes', 'séries', 'perfil'];

  const threshold = 80;

  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;
  const tabIcons = TAB_ICONS.slice(0, total);
  const tabLabels = TAB_LABELS.slice(0, total);

  function paginate(dir: number) {
    const newIndex = (index + dir + total) % total;
    setIndex([newIndex, dir]);
  }

  function handleDragStart() {
    setIsDragging(true);
  }

  function isControlTarget(target: EventTarget | null) {
    return target instanceof Element && Boolean(target.closest('button'));
  }

  function handlePointerDown(event: React.PointerEvent<HTMLDivElement>) {
    if (isLargeScreen) return;

    if (isControlTarget(event.target)) {
      pointerStart.current = null;
      return;
    }

    if (event.pointerType === 'touch') {
      return;
    }

    pointerStart.current = { x: event.clientX, y: event.clientY };
    pointerSwipeTriggered.current = false;
    event.currentTarget.setPointerCapture(event.pointerId);
  }

  function handlePointerMove(event: React.PointerEvent<HTMLDivElement>) {
    if (isLargeScreen) return;

    if (event.pointerType === 'touch') {
      return;
    }

    const start = pointerStart.current;

    if (!start || pointerSwipeTriggered.current) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const isHorizontalSwipe =
      Math.abs(deltaX) >= threshold && Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontalSwipe) {
      pointerSwipeTriggered.current = true;
      paginate(deltaX < 0 ? 1 : -1);
    }
  }

  function handlePointerUp(event: React.PointerEvent<HTMLDivElement>) {
    if (isLargeScreen) return;

    if (event.pointerType === 'touch') {
      return;
    }

    const start = pointerStart.current;
    pointerStart.current = null;

    if (!start || pointerSwipeTriggered.current) {
      return;
    }

    const deltaX = event.clientX - start.x;
    const deltaY = event.clientY - start.y;
    const isHorizontalSwipe =
      Math.abs(deltaX) >= threshold && Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontalSwipe) {
      paginate(deltaX < 0 ? 1 : -1);
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    if (isLargeScreen) return;

    if (isControlTarget(event.target)) {
      touchStart.current = null;
      return;
    }

    const touch = event.touches[0];
    touchStart.current = { x: touch.clientX, y: touch.clientY };
    pointerSwipeTriggered.current = false;
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    if (isLargeScreen) return;

    const start = touchStart.current;
    const touch = event.touches[0];

    if (!start || !touch || pointerSwipeTriggered.current) {
      return;
    }

    const deltaX = touch.clientX - start.x;
    const deltaY = touch.clientY - start.y;
    const isHorizontalSwipe =
      Math.abs(deltaX) >= threshold && Math.abs(deltaX) > Math.abs(deltaY);

    if (isHorizontalSwipe) {
      pointerSwipeTriggered.current = true;
      paginate(deltaX < 0 ? 1 : -1);
    }
  }

  function handleTouchEnd() {
    touchStart.current = null;
  }

  function handleDragEnd() {
    // mantém os cliques bloqueados por mais um instante,
    // pra "engolir" o clique-fantasma que o dedo solta em seguida
    clickBlockTimeout.current = setTimeout(() => {
      setIsDragging(false);
      clickBlockTimeout.current = null;
    }, 150);
  }

  function goToTab(i: number) {
    if (i === index) return;
    const forwardDist = (i - index + total) % total;
    const backwardDist = (index - i + total) % total;
    setIndex([i, forwardDist <= backwardDist ? 1 : -1]);
  }

  return (
    <div
      className="relative h-full w-full overflow-hidden"
      style={{ touchAction: 'pan-y' }}
      onPointerDownCapture={handlePointerDown}
      onPointerMoveCapture={handlePointerMove}
      onPointerUpCapture={handlePointerUp}
      onTouchStartCapture={handleTouchStart}
      onTouchMoveCapture={handleTouchMove}
      onTouchEndCapture={handleTouchEnd}
      onPointerCancel={() => {
        pointerStart.current = null;
        pointerSwipeTriggered.current = false;
      }}
    >
      <div className="absolute top-3 left-0 right-0 z-10 flex justify-center gap-1.5">
        {screens.map((_, i) => (
          <span
            key={i}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-4 bg-white' : 'w-1.5 bg-white/30'
            }`}
          />
        ))}
      </div>

      <AnimatePresence initial={false} custom={direction} mode="popLayout">
        <motion.div
          key={index}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ type: 'tween', ease: 'easeInOut', duration: 0.3 }}
          drag={isLargeScreen ? false : 'x'}
          dragDirectionLock
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 h-full w-full touch-pan-y pb-12"
          style={{ touchAction: isLargeScreen ? 'auto' : 'pan-y' }}
        >
          {/* o pointer-events só desliga aqui dentro — o motion.div em si
              continua recebendo o gesto normalmente, já que o pointer
              já está "capturado" por ele desde o drag start */}
          <div style={{ pointerEvents: isDragging ? 'none' : 'auto' }} className="w-full h-full">
            <div className="h-full min-h-0 overflow-y-auto overscroll-contain">
              {screens[index]}
            </div>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Barra de abas mobile */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-20 flex justify-around items-center h-12 bg-black/90 backdrop-blur pb-[env(safe-area-inset-bottom)]">
        {tabIcons.map((icon, i) => (
          <button
            key={i}
            onClick={() => goToTab(i)}
            className={`flex-1 h-full flex items-center justify-center font-medium transition-colors ${
              i === index ? 'text-white' : 'text-white/40'
            }`}
          >
            {icon}
          </button>
        ))}
      </div>

      {/* Setas desktop */}
      <button
        onClick={() => paginate(-1)}
        aria-label={`Ir para ${tabLabels[prevIndex]}`}
        className="hidden lg:flex items-center gap-2 absolute left-4 top-1/2 -translate-y-1/2 pl-3 pr-4 h-11 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors z-10"
      >
        <IoIosArrowBack size={18}/>
        {tabIcons[prevIndex]}
      </button>

      <button
        onClick={() => paginate(1)}
        aria-label={`Ir para ${tabLabels[nextIndex]}`}
        className="hidden lg:flex items-center gap-2 absolute right-4 top-1/2 -translate-y-1/2 pl-4 pr-3 h-11 rounded-full bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 transition-colors z-10"
      >
        {tabIcons[nextIndex]}
        <IoIosArrowForward size={18}/>
      </button>
    </div>
  );
}
