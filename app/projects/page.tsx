"use client";
import Image from "next/image";
import Link from "next/link";
import {
  IconArrowUpRight,
  IconArrowLeft,
  IconBrandGithub,
  IconBrandLinkedin,
  IconChevronDown,
  IconChevronUp,
} from "@tabler/icons-react";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import Reveal from "../../components/Reveal/Reveal";
import classes from "./projects.module.css";

export interface Project {
  key: string;
  year: number;
  video?: string;
  image?: string;
  website?: string;
  github?: string;
  linkedin?: string;
}

const projects: Project[] = [
  {
    key: "foqus",
    year: 2025,
    website: "https://foqus-vision.com",
  },
  {
    key: "growbot",
    year: 2025,
    image: "/Frontpage_1.jpeg",
    linkedin:
      "https://www.linkedin.com/posts/koen-van-wijlick-00b820204_mijn-afstudeerproject-is-volop-in-beweging-activity-7310028509232398338-o1BD?utm_source=share&utm_medium=member_desktop&rcm=ACoAADQXQgsBiuWXsp4QkyzdZNYd_BqJiNwB3f4",
  },
  {
    key: "cvsite",
    year: 2025,
    website: "https://koenvanwijlick.com",
    github: "https://github.com/Pecako2001/curriculum_vitae",
    linkedin: "https://www.linkedin.com/in/koen-van-wijlick-00b820204",
  },
  {
    key: "greenhouseAutomation",
    year: 2024,
    video: "/videos/Minor.mp4",
    linkedin:
      "https://www.linkedin.com/posts/koen-van-wijlick-00b820204_met-trots-kan-ik-melden-dat-ik-mijn-onderzoek-activity-7209212549152567297-4tdb?utm_source=share&utm_medium=member_desktop&rcm=ACoAADQXQgsBiuWXsp4QkyzdZNYd_BqJiNwB3f4",
  },
  {
    key: "aiDetection",
    year: 2023,
    video: "/videos/PRJ5_Traineeship.mp4",
    linkedin:
      "https://www.linkedin.com/posts/koen-van-wijlick-00b820204_%F0%9D%91%BB%F0%9D%92%8A%F0%9D%92%86%F0%9D%92%8F-%F0%9D%92%8E%F0%9D%92%86%F0%9D%92%95-%F0%9D%92%86%F0%9D%92%86%F0%9D%92%8F-%F0%9D%92%88%F0%9D%92%93%F0%9D%92%8A%F0%9D%92%87%F0%9D%92%87%F0%9D%92%86%F0%9D%92%8D-inmiddels-activity-7160176481279557635-0XJ5?utm_source=share&utm_medium=member_desktop&rcm=ACoAADQXQgsBiuWXsp4QkyzdZNYd_BqJiNwB3f4",
  },
];

const sorted = [...projects].sort((a, b) => b.year - a.year);

export default function ProjectsPage() {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});
  return (
    <section id="projects" className={classes.wrapper}>
      <header className={classes.header}>
        <Image
          src="/Frontpage_1.jpeg"
          alt=""
          fill
          sizes="100vw"
          preload
          className={classes.cover}
        />
        <div className={classes.shade} />
        <div className={classes.headerContent}>
          <h1 className={classes.heading}>{t("projects.heading")}</h1>
          <p className={classes.subtitle}>{t("design.projectsDescription")}</p>
        </div>
      </header>
      <div className={classes.list}>
        {sorted.map((project) => (
          <article
            key={project.key}
            className={classes.project}
            data-year={project.year}
          >
            <div className={classes.meta}>
              <span>{project.year}</span>
            </div>
            <div
              className={`${classes.card} ${!project.image && !project.video ? classes.textOnly : ""}`}
            >
              <div className={classes.visual}>
                {project.image && (
                  <Image
                    src={project.image}
                    alt={t(`projects.items.${project.key}.title`)}
                    width={1435}
                    height={1078}
                    sizes="(max-width: 900px) 100vw, 600px"
                    className={classes.media}
                  />
                )}
                {project.video && (
                  <video
                    controls
                    preload="none"
                    playsInline
                    className={classes.media}
                    aria-label={t(`projects.items.${project.key}.title`)}
                  >
                    <source src={project.video} type="video/mp4" />
                  </video>
                )}
              </div>
              <Reveal className={classes.content}>
                <div className={classes.projectTitle}>
                  {project.key === "foqus" && (
                    <p className={classes.current}>
                      {t("design.projectCurrent")}
                    </p>
                  )}
                  <span className={classes.tag}>
                    {t(`projects.items.${project.key}.tag`)}
                  </span>
                  <h2>{t(`projects.items.${project.key}.title`)}</h2>
                </div>
                <div className={classes.details}>
                  <p
                    id={`description-${project.key}`}
                    className={
                      expanded[project.key]
                        ? classes.description
                        : `${classes.description} ${classes.clamped}`
                    }
                  >
                    {t(`projects.items.${project.key}.description`)}
                  </p>
                  <button
                    type="button"
                    className={classes.expand}
                    onClick={() =>
                      setExpanded((prev) => ({
                        ...prev,
                        [project.key]: !prev[project.key],
                      }))
                    }
                    aria-label={t(
                      expanded[project.key]
                        ? "projects.collapse"
                        : "projects.expand",
                    )}
                    aria-expanded={!!expanded[project.key]}
                    aria-controls={`description-${project.key}`}
                  >
                    {t(
                      expanded[project.key]
                        ? "projects.collapse"
                        : "projects.expand",
                    )}
                    {expanded[project.key] ? (
                      <IconChevronUp size={17} />
                    ) : (
                      <IconChevronDown size={17} />
                    )}
                  </button>
                  <div className={classes.actions}>
                    {project.website && (
                      <a
                        href={project.website}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {t("design.viewWebsite")}
                        <IconArrowUpRight size={18} />
                      </a>
                    )}
                    {project.github && (
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconBrandGithub size={18} />
                        GitHub
                      </a>
                    )}
                    {project.linkedin && (
                      <a
                        href={project.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <IconBrandLinkedin size={18} />
                        LinkedIn
                      </a>
                    )}
                  </div>
                </div>
              </Reveal>
            </div>
          </article>
        ))}
      </div>
      <footer className={classes.footer}>
        <Link href="/" className="secondaryLink">
          <IconArrowLeft size={18} />
          {t("design.backHome")}
        </Link>
        <Link href="/#contact" className="primaryLink">
          {t("contact.heading")}
          <IconArrowUpRight size={18} />
        </Link>
      </footer>
    </section>
  );
}
