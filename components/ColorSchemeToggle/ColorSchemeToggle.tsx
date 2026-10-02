"use client";

import { ActionIcon, useMantineColorScheme } from "@mantine/core";
import classes from "../Navbar/Navbar.module.css";
import { useTranslation } from "react-i18next";
import { IconMoon, IconSun } from "@tabler/icons-react";

export function ColorSchemeToggle() {
  const { toggleColorScheme } = useMantineColorScheme();
  const { t } = useTranslation();

  return (
    <ActionIcon
      onClick={() => toggleColorScheme()}
      variant="default"
      size="lg"
      aria-label={t("navbar.toggleTheme")}
    >
      <span className={classes.darkLabel}>
        <IconSun size={18} />
      </span>
      <span className={classes.lightLabel}>
        <IconMoon size={18} />
      </span>
    </ActionIcon>
  );
}
