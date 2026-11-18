"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import StarRating from "../starsRating";

interface EditReviewModalProps {
  isOpen: boolean;
  initialReview: string;
  initialRating: number;
  onClose: () => void;
  onConfirm: (review: string, rating: number) => void;
}

export default function EditReviewModal({
  isOpen,
  initialReview,
  initialRating,
  onClose,
  onConfirm,
}: EditReviewModalProps) {
  const [review, setReview] = useState(initialReview);
  const [rating, setRating] = useState(initialRating);

  // Sempre que o modal abrir, carrega os valores da review selecionada
  useEffect(() => {
    if (isOpen) {
      setReview(initialReview);
      setRating(initialRating);
    }
  }, [isOpen, initialReview, initialRating]);

  const handleConfirm = () => {
    onConfirm(review, rating);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/70 p-4 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
        >
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-labelledby="edit-review-title"
            className="w-full max-w-md md:max-w-lg rounded-2xl border border-white/10 bg-zinc-900 p-6 shadow-2xl"
            initial={{ opacity: 0, scale: 0.95, y: 12 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 12 }}
            transition={{ duration: 0.2 }}
            onClick={(e) => e.stopPropagation()}
          >
            <h2
              id="edit-review-title"
              className="mb-4 text-xl font-semibold text-white"
            >
              Editar review
            </h2>

            <textarea
              value={review}
              onChange={(e) => setReview(e.target.value)}
              placeholder="O que você achou da série?"
              autoFocus
              className="w-full h-[125px] rounded-lg border border-white/10 bg-zinc-800 px-4 py-3 text-white placeholder-zinc-500 outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500/40"
            />

            <StarRating value={rating} onChange={setRating} />

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={onClose}
                className="rounded-lg bg-white/10 px-4 py-2 text-zinc-300 transition hover:bg-white/15"
              >
                Cancelar
              </button>
              <button
                type="button"
                onClick={handleConfirm}
                disabled={!review.trim() || rating === 0}
                className="rounded-lg bg-purple-600 px-4 py-2 font-medium text-white transition hover:bg-purple-500 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-purple-600"
              >
                Salvar
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}