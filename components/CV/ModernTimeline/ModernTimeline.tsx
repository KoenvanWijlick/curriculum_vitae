"use client";

import { IconArrowUpRight } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import Reveal from "../../Reveal/Reveal";
import classes from "./ModernTimeline.module.css";

const groups = [
  { key: "work", entries: ["foqus", "work1", "work2", "work3", "work5"] },
  { key: "education", entries: ["school1", "school2", "school3"] },
  {
    key: "internships",
    entries: ["internship1", "internship2", "internship3"],
  },
  { key: "volunteer", entries: ["volunteerBoard", "work4"] },
];

export default function ModernTimeline() {
  const { t } = useTranslation();
  return (
    <section id="career" className={classes.wrapper}>
      <div className={classes.layout}>
        <div className={classes.lead}>
          <h2 className="sectionTitle">{t("design.careerHeadline")}</h2>
          <div className={classes.index}>
            {groups.map((group) => (
              <a key={group.key} href={`#career-${group.key}`}>
                {t(`categories.${group.key}`)}
                <IconArrowUpRight size={14} />
              </a>
            ))}
          </div>
          <a
            className={classes.download}
            href="/Koen_van_Wijlick_CV_EN.pdf"
            download
          >
            {t("intro.downloadCV")}
            <IconArrowUpRight size={15} />
          </a>
        </div>
        <div className={classes.timeline}>
          {groups.map((group) => (
            <section
              id={`career-${group.key}`}
              className={classes.group}
              key={group.key}
            >
              <Reveal className={classes.groupHeading}>
                <h2>{t(`categories.${group.key}`)}</h2>
              </Reveal>
              <div className={classes.entries}>
                {group.entries.map((key) => {
                  const current = key === "foqus";
                  const [role, ...description] = t(`career.${key}.info`).split(
                    "\n",
                  );
                  const date = t(`career.${key}.sub`, { defaultValue: "" });
                  return (
                    <article
                      key={key}
                      className={`${classes.entry} ${current ? classes.currentEntry : ""}`}
                    >
                      {current && (
                        <p className={classes.currentBadge}>
                          <span />
                          {t("design.currentRole")}
                        </p>
                      )}
                      <Reveal>
                        <div className={classes.entryHeading}>
                          <h3>{t(`career.${key}.label`)}</h3>
                          {date && <p className={classes.date}>{date}</p>}
                        </div>
                        <p className={classes.role}>{role}</p>
                        {description.map((paragraph, index) => (
                          <p className={classes.description} key={index}>
                            {paragraph}
                          </p>
                        ))}
                        {current && (
                          <a
                            className={classes.website}
                            href="https://foqus-vision.com"
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            foqus-vision.com
                            <IconArrowUpRight size={15} />
                          </a>
                        )}
                      </Reveal>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>
    </section>
  );
}
