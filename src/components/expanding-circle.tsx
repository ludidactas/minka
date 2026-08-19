"use client";

import { motion } from "framer-motion";
import { Outlined } from "@/app/custom/outline";
import { cn } from "@/lib/utils";

interface CollapsedCircleProps {
  id: string;
  image: string;
  label: string;
  /** Clases de posicionamiento del círculo, ej. "top-[15%] left-1/2". */
  position: string;
  textSize?: string;
  circleClassName?: string;
  onClick: () => void;
}

export function CollapsedCircle({
  id,
  image,
  label,
  position,
  textSize = "text-3xl",
  circleClassName,
  onClick,
}: CollapsedCircleProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "absolute -translate-x-1/2 -translate-y-1/2 group font-fredoka flex items-center justify-center text-center w-48 h-48 p-4 cursor-pointer",
        position
      )}
    >
      <motion.div
        layoutId={`panel-${id}`}
        style={{ borderRadius: 9999 }}
        className={cn(
          "absolute inset-0 overflow-hidden bg-white transition-all duration-500 group-hover:scale-120 group-hover:border-8 group-hover:border-yellow-200",
          circleClassName
        )}
      >
        <motion.img
          layoutId={`image-${id}`}
          src={image}
          alt=""
          style={{ borderRadius: 9999 }}
          className="absolute inset-0 h-full w-full object-cover"
        />
      </motion.div>
      <Outlined outlineColor="black" className={cn("relative text-white", textSize)}>
        {label}
      </Outlined>
    </button>
  );
}

interface ExpandedPanelProps {
  id: string;
  image: string;
  /** Color de fondo que queda al revelarse cuando la imagen se desvanece. */
  color: string;
  onClose: () => void;
  children: React.ReactNode;
}

export function ExpandedPanel({ id, image, color, onClose, children }: ExpandedPanelProps) {
  return (
    <motion.div
      layoutId={`panel-${id}`}
      style={{ borderRadius: 0, backgroundColor: color }}
      transition={{ type: "spring", stiffness: 180, damping: 24 }}
      className="absolute inset-0 z-20 overflow-hidden shadow-xl"
    >
      <motion.img
        layoutId={`image-${id}`}
        src={image}
        alt=""
        style={{ borderRadius: 9999 }}
        className="pointer-events-none absolute top-[15%] -right-36 h-72 w-72 object-cover md:-right-48 md:h-96 md:w-96 lg:-right-60 lg:h-[30rem] lg:w-[30rem] xl:-right-72 xl:h-[36rem] xl:w-[36rem]"
      />

      <motion.button
        type="button"
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute top-6 right-6 z-20 flex h-10 w-10 items-center justify-center rounded-full bg-black/30 text-2xl text-white hover:bg-black/50"
        aria-label="Cerrar"
      >
        ×
      </motion.button>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 8 }}
        transition={{ duration: 0.7, delay: 0.35 }}
        className="relative z-10 flex h-full w-full flex-col overflow-y-auto p-10 text-white font-fredoka"
      >
        <div className="flex max-w-2xl flex-col my-20 gap-4">{children}</div>
      </motion.div>
    </motion.div>
  );
}
