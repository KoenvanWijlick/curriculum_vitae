"use client";

import { IconArrowUpRight, IconFocus2 } from "@tabler/icons-react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import Reveal from "../Reveal/Reveal";
import classes from "./FeaturedWork.module.css";

export default function FeaturedWork() {
  const { t } = useTranslation();
  return (
    <section id="foqus" className={classes.wrapper}>
      <div className={classes.heading}>
        <p className="eyebrow">{t("design.currentFocus")}</p>
        <span className={classes.current}>
          <span />
          {t("design.currentRole")}
        </span>
      </div>
      <div className={classes.feature}>
        <Reveal className={classes.copy}>
          <h2 className={classes.brand}>
            <IconFocus2 size={30} stroke={1.4} />
            <span>
              FOQUS<span className={classes.brandPeriod}>.</span>
            </span>
          </h2>
          <p>{t("design.foqusDescription")}</p>
          <div className={classes.role}>
            <span>{t("design.myRole")}</span>
            <strong>AI Software Engineer</strong>
          </div>
          <div className={classes.actions}>
            <a
              className="primaryLink"
              href="https://foqus-vision.com"
              target="_blank"
              rel="noopener noreferrer"
            >
              {t("design.exploreFoqus")}
              <IconArrowUpRight size={18} />
            </a>
            <Link className={classes.projectLink} href="/projects">
              {t("design.moreProjects")}
              <IconArrowUpRight size={16} />
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
