"use client";

import Image from "next/image";
import { IconArrowUpRight } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import Reveal from "../Reveal/Reveal";
import classes from "./About.module.css";

export default function AboutMe() {
  const { t } = useTranslation();
  return (
    <section id="about" className={classes.wrapper}>
      <Reveal className={classes.heading}>
        <h2 className="sectionTitle">{t("design.aboutHeadline")}</h2>
      </Reveal>
      <div className={classes.inner}>
        <div className={classes.imageColumn}>
          <div className={classes.photoWrap}>
            <Image
              src="/personal_image.jpeg"
              alt={t("design.outdoorPhotoAlt")}
              fill
              sizes="(max-width: 768px) 100vw, 450px"
            />
          </div>
        </div>
        <div className={classes.content}>
          {t("about.paragraph")
            .split("\n")
            .map((paragraph, index) => (
              <Reveal key={index}>
                <p className={classes.paragraph}>{paragraph}</p>
              </Reveal>
            ))}
          <a className={classes.journey} href="#career">
            {t("intro.viewJourney")}
            <IconArrowUpRight size={18} />
          </a>
        </div>
      </div>
    </section>
  );
}
