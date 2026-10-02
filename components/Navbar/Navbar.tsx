"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Burger, Drawer, useMantineColorScheme } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { IconArrowUpRight, IconMoon, IconSun } from "@tabler/icons-react";
import { useTranslation } from "react-i18next";
import classes from "./Navbar.module.css";

const links = [
  { label: "navbar.home", href: "/" },
  { label: "navbar.about", href: "/#about" },
  { label: "design.journey", href: "/#career" },
  { label: "navbar.skills", href: "/#certs" },
  { label: "navbar.projects", href: "/projects" },
  { label: "navbar.contact", href: "/#contact" },
];
const languages = [
  { code: "en", label: "English" },
  { code: "nl", label: "Nederlands" },
];

function subscribeScroll(callback: () => void) {
  window.addEventListener("scroll", callback, { passive: true });
  window.addEventListener("resize", callback);
  return () => {
    window.removeEventListener("scroll", callback);
    window.removeEventListener("resize", callback);
  };
}
const scrollSnapshot = () => window.scrollY > 80;
const serverScrollSnapshot = () => false;
function sectionSnapshot() {
  let current = "/";
  for (const link of links) {
    const id = link.href.split("#")[1];
    const section = id ? document.getElementById(id) : null;
    if (section && section.getBoundingClientRect().top <= 160) {
      current = link.href;
    }
  }
  return current;
}
const serverSectionSnapshot = () => "/";

export default function Navbar() {
  const [opened, { open, close }] = useDisclosure(false);
  const { toggleColorScheme } = useMantineColorScheme();
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const scrolled = useSyncExternalStore(
    subscribeScroll,
    scrollSnapshot,
    serverScrollSnapshot,
  );
  const section = useSyncExternalStore(
    subscribeScroll,
    sectionSnapshot,
    serverSectionSnapshot,
  );
  const activeHref = pathname === "/" ? section : pathname;
  const currentLocation = (href: string) =>
    activeHref === href
      ? href.includes("#")
        ? "location"
        : "page"
      : undefined;
  const languageButtons = (mobile = false) =>
    languages.map((language) => (
      <button
        key={language.code}
        type="button"
        className={`${classes.langBtn} ${i18n.language === language.code ? classes.langActive : ""}`}
        aria-label={language.label}
        aria-pressed={i18n.language === language.code}
        onClick={() => {
          void i18n.changeLanguage(language.code);
          if (mobile) close();
        }}
      >
        {language.code.toUpperCase()}
      </button>
    ));
  return (
    <header
      className={`${classes.navbar} ${pathname === "/" && !scrolled ? classes.onHero : ""}`}
    >
      <a href="#main-content" className="skipLink">
        {t("navbar.skipToContent")}
      </a>
      <div className={classes.inner}>
        <Link
          href="/"
          className={classes.brand}
          aria-label="Koen van Wijlick — Home"
        >
          <span className={classes.brandText}>Koen van Wijlick</span>
        </Link>
        <nav className={classes.links} aria-label={t("navbar.primary")}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${classes.link} ${activeHref === link.href ? classes.active : ""}`}
              aria-current={currentLocation(link.href)}
            >
              {t(link.label)}
            </Link>
          ))}
        </nav>
        <div className={classes.controls}>
          <div className={classes.languages}>{languageButtons()}</div>
          <button
            className={classes.themeBtn}
            type="button"
            onClick={() => toggleColorScheme()}
            aria-label={t("navbar.toggleTheme")}
          >
            <span className={classes.darkLabel}>
              <IconSun size={18} />
            </span>
            <span className={classes.lightLabel}>
              <IconMoon size={18} />
            </span>
          </button>
          <Burger
            opened={opened}
            onClick={open}
            className={classes.burger}
            aria-label={t("navbar.openMenu")}
            aria-expanded={opened}
            color="currentColor"
            size="sm"
          />
        </div>
      </div>
      <Drawer
        opened={opened}
        onClose={close}
        size="100%"
        padding="xl"
        title={t("navbar.menu")}
        closeButtonProps={{ "aria-label": t("navbar.closeMenu") }}
        styles={{
          content: { background: "var(--bg-color)" },
          header: { background: "var(--bg-color)" },
        }}
      >
        <div className={classes.drawerLinks}>
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={close}
              className={classes.drawerLink}
              aria-current={currentLocation(link.href)}
            >
              {t(link.label)}
              <IconArrowUpRight size={24} />
            </Link>
          ))}
        </div>
        <div className={classes.drawerControls}>
          {languageButtons(true)}
          <button
            className={classes.drawerTheme}
            type="button"
            onClick={() => {
              toggleColorScheme();
              close();
            }}
          >
            {t("navbar.toggleTheme")}
          </button>
        </div>
        <a
          className={classes.drawerEmail}
          href="mailto:koenvanwijlick@gmail.com"
        >
          koenvanwijlick@gmail.com
        </a>
      </Drawer>
    </header>
  );
}
