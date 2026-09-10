'use client';
import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { LuClapperboard } from 'react-icons/lu';
import { GoPerson } from 'react-icons/go';
import { FiTv } from 'react-icons/fi';
import { IoIosArrowForward, IoIosArrowBack } from 'react-icons/io';

const TAB_ICONS = [
  <LuClapperboard size={20} key="filmes" />,
  <FiTv size={20} key="series" />,
  <GoPerson size={20} key="perfil" />,
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function SwipeTabs({
  screens,
}: {
  screens: React.ReactNode[];
}) {
  const [[index, direction], setIndex] = useState([0, 0]);
  const total = screens.length;

  const threshold = 80;
  const velocityThreshold = 400;

  const prevIndex = (index - 1 + total) % total;
  const nextIndex = (index + 1) % total;

  function paginate(dir: number) {
    const newIndex = (index + dir + total) % total;
    setIndex([newIndex, dir]);
  }

  function handleDragEnd(_: any, info: PanInfo) {
    const { offset, velocity } = info;
    if (offset.x < -threshold || velocity.x < -velocityThreshold) {
      paginate(1);
    } else if (offset.x > threshold || velocity.x > velocityThreshold) {
      paginate(-1);
    }
  }

  function goToTab(i: number) {
    if (i === index) return;
    // decide a direção mais "curta" visualmente pro clique direto na bottom bar
    const forwardDist = (i - index + total) % total;
    const backwardDist = (index - i + total) % total;
    setIndex([i, forwardDist <= backwardDist ? 1 : -1]);
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
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
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.2}
          onDragEnd={handleDragEnd}
          className="absolute inset-0 w-full h-full touch-pan-y pb-12"
        >
          {screens[index]}
        </motion.div>
      </AnimatePresence>

      {/* Barra de abas mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 z-20 flex justify-around items-center h-12 bg-black/90 backdrop-blur pb-[env(safe-area-inset-bottom)]">
        {TAB_ICONS.map((icon, i) => (
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

      {/* // Setas desktop */}
      <button
        onClick={() => paginate(-1)}
        aria-label={`Ir para ${TAB_ICONS[prevIndex]}`}
        className="hidden md:flex items-center gap-2 absolute left-4 top-1/2 -translate-y-1/2 px-4 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
      >
        <IoIosArrowBack size={18} />
        {TAB_ICONS[prevIndex]}
      </button>

      <button
        onClick={() => paginate(1)}
        aria-label={`Ir para ${TAB_ICONS[nextIndex]}`}
        className="hidden md:flex items-center gap-2 absolute right-4 top-1/2 -translate-y-1/2 px-4 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
      >
        {TAB_ICONS[nextIndex]}
        <IoIosArrowForward size={18} />
      </button>
    </div>
  );
}