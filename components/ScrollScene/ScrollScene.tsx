"use client";

import { motion, MotionConfig, useScroll } from "framer-motion";
import type { ReactNode } from "react";
import classes from "./ScrollScene.module.css";

export function SiteMotionProvider({ children }: { children: ReactNode }) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}

export default function ScrollScene() {
  const { scrollYProgress } = useScroll({ trackContentSize: true });
  return (
    <motion.div
      className={classes.progress}
      data-testid="reading-progress"
      style={{ scaleX: scrollYProgress }}
      aria-hidden="true"
    />
  );
}
