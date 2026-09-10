'use client';
import { useState } from 'react';
import { motion, AnimatePresence, PanInfo } from 'framer-motion';
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";
import { LuClapperboard } from "react-icons/lu"
import { GoPerson } from "react-icons/go";
import { FiTv } from "react-icons/fi";


const TABS = [
    <LuClapperboard size={20}/>,
    <FiTv size={20}/>,
    <GoPerson size={20}/>
];

const variants = {
  enter: (dir: number) => ({ x: dir > 0 ? '100%' : '-100%', opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? '-100%' : '100%', opacity: 0 }),
};

export default function SwipeTabs({
  screens,
}: {
  screens: React.ReactNode[]; // [<Filmes />, <Series />, <Perfil />]
}) {
  const [[index, direction], setIndex] = useState([0, 0]);

  const threshold = 80;
  const velocityThreshold = 400;

  const canGoLeft = index > 0;
  const canGoRight = index < screens.length - 1;

  function paginate(newDirection: number) {
    const newIndex = index + newDirection;
    if (newIndex < 0 || newIndex >= screens.length) return; // não deixa passar dos limites
    setIndex([newIndex, newDirection]);
  }

  function handleDragEnd(_: any, info: PanInfo) {
    const { offset, velocity } = info;
    if (offset.x < -threshold || velocity.x < -velocityThreshold) {
      paginate(1); // arrastou pra esquerda -> próxima aba
    } else if (offset.x > threshold || velocity.x > velocityThreshold) {
      paginate(-1); // arrastou pra direita -> aba anterior
    }
  }

  return (
    <div className="relative w-full h-full overflow-hidden">
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
          className="absolute inset-0 w-full h-full touch-pan-y"
        >
          {screens[index]}
        </motion.div>
      </AnimatePresence>

      <div className="md:hidden fixed bottom-0 left-0 right-0 flex justify-around items-center h-12 bg-black/90 backdrop-blur">
        {TABS.map((tab, i) => (
          <button
            key={i}
            onClick={() => setIndex([i, i > index ? 1 : -1])}
            className={`flex-1 h-full flex items-center justify-center font-medium transition-colors ${
              i === index ? 'text-white' : 'text-white/40'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {canGoLeft && (
        <button
          onClick={() => paginate(-1)}
          aria-label="Anterior"
          className="hidden md:flex items-center justify-center absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
        >
          <IoIosArrowBack size={22} />
        </button>
      )}

      {canGoRight && (
        <button
          onClick={() => paginate(1)}
          aria-label="Próximo"
          className="hidden md:flex items-center justify-center absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors z-10"
        >
          <IoIosArrowForward size={22} />
        </button>
      )}
    </div>
  );
}