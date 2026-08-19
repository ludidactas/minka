"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { CollapsedCircle, ExpandedPanel } from "@/components/expanding-circle";
import { MarkdownContent } from "@/components/markdown-content";
import { cn } from "@/lib/utils";

export interface CircleMenuItem {
  id: string;
  image: string;
  label: string;
  /** Color de fondo que queda al revelarse cuando la imagen se desvanece. */
  color: string;
  /** Clases de posicionamiento del círculo cerrado, ej. "top-[15%] left-1/2". */
  position: string;
  textSize?: string;
  circleClassName?: string;
  /** Contenido en markdown que se muestra al expandir el círculo. */
  content: string;
}

interface ExpandingCircleMenuProps {
  items: CircleMenuItem[];
  className?: string;
}

export function ExpandingCircleMenu({ items, className }: ExpandingCircleMenuProps) {
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const expandedItem = items.find((item) => item.id === expandedId) ?? null;

  return (
    <div className={cn("relative isolate flex-1 min-h-screen", className)}>
      <div
        className={cn(
          "absolute inset-0 flex items-center justify-center transition-opacity duration-300",
          expandedId ? "opacity-0 pointer-events-none" : "opacity-100"
        )}
      >
        <div className="relative h-132 w-132 text-black">
          {items.map((item) =>
            item.id === expandedId ? null : (
              <CollapsedCircle
                key={item.id}
                id={item.id}
                image={item.image}
                label={item.label}
                position={item.position}
                textSize={item.textSize}
                circleClassName={item.circleClassName}
                onClick={() => setExpandedId(item.id)}
              />
            )
          )}
        </div>
      </div>

      <AnimatePresence>
        {expandedItem && (
          <ExpandedPanel
            key={expandedItem.id}
            id={expandedItem.id}
            image={expandedItem.image}
            color={expandedItem.color}
            onClose={() => setExpandedId(null)}
          >
            <MarkdownContent>{expandedItem.content}</MarkdownContent>
          </ExpandedPanel>
        )}
      </AnimatePresence>
    </div>
  );
}
