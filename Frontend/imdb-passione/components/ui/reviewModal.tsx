"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarRating from "./starsRating";

interface ReviewModalProps {
    isOpen: boolean,
    onClose: () => void,
    onConfirm: (review: string, rating: number) => void
}

export default function ReviewModal({ isOpen, onClose, onConfirm }: ReviewModalProps) {
  const [review, setReview] = useState("");
  const [rating, setRating] = useState(0)

  const handleConfirm = () => {
    onConfirm(review, rating);
    setReview("");
  };

  const handleCancel = () => {
    setReview("");
    onClose();
  };



  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCancel}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="review-title"
            className="w-full max-w-md md:max-w-lg rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2 id="review-title" className="mb-4 text-xl font-semibold text-white">
              Escreva sua review
            </h2>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="O que você achou da série?"
              autoFocus
              className="w-full h-[125px] rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40"
            />

            <StarRating value={rating} onChange={setRating}/>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={handleCancel}
                className="rounded-lg px-4 py-2 text-zinc-300 transition bg-white/10"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition hover:bg-purple-500"
              >
                Publicar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}