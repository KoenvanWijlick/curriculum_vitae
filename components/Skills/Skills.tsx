"use client";

import {
  IconBraces,
  IconSettings,
  IconCube,
  IconDatabase,
  IconServer,
  IconTopologyStar3,
} from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import classes from "./Skills.module.css";

const skills = [
  {
    category: "skills.data",
    icon: IconTopologyStar3,
    tools: ["Python", "TensorFlow", "YOLO", "OpenCV", "ROS 2"],
  },
  {
    category: "skills.frontend",
    icon: IconBraces,
    tools: ["React", "Next.js", "TypeScript", "MUI", "Tailwind"],
  },
  {
    category: "skills.backend",
    icon: IconServer,
    tools: ["FastAPI", "Node.js", "MQTT", "Redis", "WebSockets"],
  },
  {
    category: "skills.devops",
    icon: IconSettings,
    tools: ["Docker", "Git", "GitHub Actions", "Linux"],
  },
  {
    category: "skills.databases",
    icon: IconDatabase,
    tools: ["PostgreSQL", "SQLite", "Supabase"],
  },
  {
    category: "skills.cad",
    icon: IconCube,
    tools: ["SolidWorks", "Inventor", "AutoCAD"],
  },
];
export default function Skills() {
  const { t } = useTranslation();
  return (
    <section id="skills" className={classes.wrapper}>
      <div className={classes.heading}>
        <div>
          <p className="eyebrow">{t("design.toolkit")}</p>
          <h2 className="sectionTitle">{t("design.skillsHeadline")}</h2>
        </div>
        <p>{t("design.skillsDescription")}</p>
      </div>
      <div className={classes.grid}>
        {skills.map((skill) => (
          <article key={skill.category} className={classes.card}>
            <div className={classes.cardTop}>
              <skill.icon size={25} stroke={1.2} />
            </div>
            <h3>{t(skill.category)}</h3>
            <div className={classes.tags}>
              {skill.tools.map((tool) => (
                <span key={tool}>{tool}</span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
