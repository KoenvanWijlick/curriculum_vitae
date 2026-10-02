"use client";

import { useTranslation } from "react-i18next";
import Reveal from "../Reveal/Reveal";
import classes from "./SoftwareExperience.module.css";

export default function SoftwareExperience() {
  const { t } = useTranslation();
  return (
    <section id="certs" className={classes.wrapper}>
      <Reveal className={classes.heading}>
        <h2 className="sectionTitle">{t("software.heading")}</h2>
      </Reveal>
      <div className={classes.certificates}>
        {[1, 2].map((index) => (
          <article className={classes.certificate} key={index}>
            <Reveal>
              <h3>{index === 1 ? "SolidWorks" : "VCA"}</h3>
              <p>{t(`software.cert${index}`)}</p>
            </Reveal>
          </article>
        ))}
      </div>
      <div className={classes.experience}>
        <h3>{t("software.skillsHeading")}</h3>
        <ul>
          {Array.from({ length: 9 }, (_, index) => {
            const [tools, ...description] = t(
              `software.skill${index + 1}`,
            ).split(" – ");
            return (
              <li key={index}>
                <strong>{tools}</strong>
                <span>{description.join(" – ")}</span>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
