"use client";

import {
  IconArrowUpRight,
  IconBrandGithub,
  IconBrandLinkedin,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import Reveal from "../Reveal/Reveal";
import classes from "./Contact.module.css";

export default function Contact() {
  const { t } = useTranslation();
  return (
    <section id="contact" className={classes.wrapper}>
      <div className={classes.inner}>
        <Reveal>
          <h2 className={classes.title}>{t("contact.heading")}</h2>
        </Reveal>
        <div className={classes.contactRow}>
          <p>{t("design.contactDescription")}</p>
          <a
            className={classes.email}
            href="mailto:koenvanwijlick@gmail.com"
            aria-label={t("contact.sendMail")}
          >
            koenvanwijlick@gmail.com
            <IconArrowUpRight size={18} />
          </a>
        </div>
        <p className={classes.signature} aria-hidden="true">
          Koen van Wijlick
        </p>
        <footer className={classes.footer}>
          <span>© {new Date().getFullYear()} Koen van Wijlick</span>
          <div>
            <a
              href="https://github.com/Pecako2001"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandGithub size={14} />
              GitHub
              <IconArrowUpRight size={12} />
            </a>
            <a
              href="https://www.linkedin.com/in/koen-van-wijlick-00b820204/"
              target="_blank"
              rel="noopener noreferrer"
            >
              <IconBrandLinkedin size={14} />
              LinkedIn
              <IconArrowUpRight size={12} />
            </a>
          </div>
          <a href="#intro" className={classes.backTop}>
            {t("design.backToTop")}↑
          </a>
        </footer>
      </div>
    </section>
  );
}
