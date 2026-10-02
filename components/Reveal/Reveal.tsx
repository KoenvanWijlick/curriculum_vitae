"use client";

import { useEffect, useRef, type ReactNode } from "react";
import classes from "./Reveal.module.css";

export default function Reveal({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    const show = () => {
      element.dataset.reveal = "visible";
    };
    if (
      reduced.matches ||
      element.getBoundingClientRect().top < window.innerHeight
    ) {
      show();
      return;
    }
    element.dataset.reveal = "pending";
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          show();
          observer.disconnect();
        }
      },
      { rootMargin: "0px 0px -30px 0px", threshold: 0.05 },
    );
    const preferenceChanged = () => {
      if (reduced.matches) {
        show();
        observer.disconnect();
      }
    };
    observer.observe(element);
    reduced.addEventListener("change", preferenceChanged);
    return () => {
      observer.disconnect();
      reduced.removeEventListener("change", preferenceChanged);
      show();
    };
  }, []);
  return (
    <div
      ref={ref}
      className={`${classes.reveal} ${className}`}
      data-reveal="visible"
    >
      {children}
    </div>
  );
}
