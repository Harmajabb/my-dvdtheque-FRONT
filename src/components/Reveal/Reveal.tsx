import type { ElementType, ReactNode } from "react";
import { useReveal } from "../../hooks/useReveal";

type RevealVariant =
  | "fade-in"
  | "fade-in-up"
  | "fade-in-left"
  | "fade-in-right";

interface RevealProps {
  children: ReactNode;
  variant?: RevealVariant;
  delay?: number;
  duration?: number;
  className?: string;
  as?: ElementType;
}

const variantClasses: Record<RevealVariant, string> = {
  "fade-in": "animate-fade-in",
  "fade-in-up": "animate-fade-in-up",
  "fade-in-left": "animate-fade-in-left",
  "fade-in-right": "animate-fade-in-right",
};

export function Reveal({
  children,
  variant = "fade-in-up",
  delay = 0,
  duration,
  className = "",
  as: Tag = "div",
}: RevealProps) {
  const { ref, isVisible } = useReveal<HTMLDivElement>();

  return (
    <Tag
      ref={ref}
      className={`${isVisible ? variantClasses[variant] : "opacity-0"} ${className}`}
      style={{
        animationDelay: delay ? `${delay}ms` : undefined,
        animationDuration: duration ? `${duration}ms` : undefined,
        animationFillMode: "both",
      }}
    >
      {children}
    </Tag>
  );
}
