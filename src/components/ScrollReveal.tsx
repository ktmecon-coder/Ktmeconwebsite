import { ReactNode } from "react";
import { motion } from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: "fade-up" | "fade-in" | "typewriter" | "words";
  delay?: number;
  duration?: number;
  className?: string;
  stagger?: number;
  key?: any;
}

export default function ScrollReveal({
  children,
  variant = "fade-up",
  delay = 0,
  duration = 0.8,
  className = "",
  stagger = 0.03,
}: ScrollRevealProps) {
  // If children is a string and variant is typewriter or words, we can animate character/word level
  if (typeof children === "string" && (variant === "words" || variant === "typewriter")) {
    const items = variant === "words" ? children.split(" ") : children.split("");
    
    const containerVariants = {
      hidden: { opacity: 0 },
      visible: {
        opacity: 1,
        transition: {
          delayChildren: delay,
          staggerChildren: stagger,
        },
      },
    };

    const childVariants = {
      hidden: { 
        opacity: 0, 
        y: variant === "words" ? 8 : 4,
        filter: "blur(2px)"
      },
      visible: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {
          duration: duration * 0.7,
          ease: [0.215, 0.61, 0.355, 1], // Cubic-bezier for smooth deceleration
        },
      },
    };

    return (
      <motion.span
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-10% 0px -10% 0px" }}
        className={`inline ${className}`}
      >
        {items.map((item, index) => (
          <motion.span
            key={index}
            variants={childVariants}
            className="inline-block whitespace-pre-wrap"
            style={{ marginRight: variant === "words" && index < items.length - 1 ? "0.28em" : "0px" }}
          >
            {item === " " ? "\u00A0" : item}
          </motion.span>
        ))}
      </motion.span>
    );
  }

  // Fallback / block level animations
  const blockVariants = {
    hidden: {
      opacity: 0,
      y: variant === "fade-up" ? 24 : 0,
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: duration,
        delay: delay,
        ease: [0.16, 1, 0.3, 1], // Smooth custom ease curve (easeOutExpo)
      },
    },
  };

  return (
    <motion.div
      variants={blockVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-15% 0px -15% 0px" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}
