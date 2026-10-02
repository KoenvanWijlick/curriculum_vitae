"use client";
import { useRef } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import {
  IconArrowDown,
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
  IconDownload,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import classes from "./Introduction.module.css";

export default function Introduction() {
  const { t } = useTranslation();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "12%"]);
  const reduced = useReducedMotion();
  return (
    <section id="intro" ref={ref} className={classes.wrapper}>
      <motion.div
        className={classes.photoMotion}
        style={{ y: reduced ? 0 : y }}
      >
        <Image
          src="/Frontpage_1.jpeg"
          alt={t("design.heroPhotoAlt")}
          fill
          sizes="100vw"
          preload
          className={classes.background}
        />
      </motion.div>
      <div className={classes.shade} />
      <div className={classes.identity}>
        <p className={classes.greeting}>{t("intro.greeting")}</p>
        <h1>
          Koen van <br />
          Wijlick
        </h1>
      </div>
      <div className={classes.caption}>
        <p>{t("design.heroRole")}</p>
        <a href="#foqus" aria-label={t("design.scrollExplore")}>
          <IconArrowDown size={22} />
        </a>
      </div>
      <div className={classes.bottomline}>
        <div className={classes.links}>
          <Link href="/projects">
            {t("intro.viewProjects")}
            <IconArrowUpRight size={15} />
          </Link>
          <a href="/Koen_van_Wijlick_CV_EN.pdf" download>
            {t("intro.downloadCV")}
            <IconDownload size={15} />
          </a>
        </div>
        <div className={classes.socials}>
          <a
            href="https://github.com/Pecako2001"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
          >
            <IconBrandGithub size={18} />
          </a>
          <a
            href="https://www.linkedin.com/in/koen-van-wijlick-00b820204/"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
          >
            <IconBrandLinkedin size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
