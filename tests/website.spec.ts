import AxeBuilder from "@axe-core/playwright";
import { expect, test, type Page } from "@playwright/test";

async function openMenuIfMobile(page: Page) {
  const menu = page.getByRole("button", {
    name: /Open navigation menu|Open navigatiemenu/,
  });
  if (await menu.isVisible()) {
    await expect(page.getByRole("dialog")).toBeHidden();
    await menu.click();
    await expect(page.getByRole("dialog")).toBeVisible();
  }
}

async function clickNavigation(page: Page, name: string) {
  const menu = page.getByRole("dialog");
  const navigation = (await menu.isVisible())
    ? menu
    : page.getByRole("navigation");
  await navigation.getByRole("link", { name, exact: true }).click();
}

test("navigation marks the current section and page", async ({ page }) => {
  await page.goto("/");
  const activeLink = page.locator("header nav a[aria-current]");
  await expect(activeLink).toHaveAttribute("href", "/");
  for (const id of ["about", "career", "certs"]) {
    await page.evaluate((sectionId) => {
      const section = document.getElementById(sectionId)!;
      window.scrollTo({
        top: section.getBoundingClientRect().top + window.scrollY - 110,
        behavior: "instant",
      });
    }, id);
    await expect(activeLink).toHaveAttribute("href", `/#${id}`);
    await expect(activeLink).toHaveAttribute("aria-current", "location");
  }
  await openMenuIfMobile(page);
  const drawer = page.getByRole("dialog");
  if (await drawer.isVisible()) {
    await expect(drawer.locator("a[aria-current]")).toHaveAttribute(
      "href",
      "/#certs",
    );
  }
  await clickNavigation(page, "Projects");
  await expect(activeLink).toHaveAttribute("href", "/projects");
  await expect(activeLink).toHaveAttribute("aria-current", "page");
});

test("routes, images, project expansion, and CV download work without browser errors", async ({
  page,
  request,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText(
    "Koen van Wijlick",
  );
  const heroImage = page.getByRole("img", {
    name: "Growbot graduation project in a greenhouse",
  });
  await expect
    .poll(() =>
      heroImage.evaluate((element: HTMLImageElement) => element.naturalWidth),
    )
    .toBeGreaterThan(0);
  const download = await request.get("/Koen_van_Wijlick_CV_EN.pdf");
  expect(download.ok()).toBeTruthy();
  expect(download.headers()["content-type"]).toContain("application/pdf");
  await page
    .getByRole("link", { name: "Projects", exact: true })
    .last()
    .click();
  await expect(page).toHaveURL("/projects");
  await expect(page).toHaveTitle("Projects | Koen van Wijlick");
  const image = page.getByRole("img", { name: "Growbot" });
  await expect(image).toBeVisible();
  await expect
    .poll(() =>
      image.evaluate((element: HTMLImageElement) => element.naturalWidth),
    )
    .toBeGreaterThan(0);
  const expand = page.getByRole("button", { name: "Show more" }).first();
  await expand.click();
  await expect(page.getByRole("button", { name: "Show less" })).toHaveAttribute(
    "aria-expanded",
    "true",
  );
  await page.getByRole("button", { name: "Show less" }).click();
  await expect(
    page.getByRole("button", { name: "Show more" }).first(),
  ).toHaveAttribute("aria-expanded", "false");
  expect(errors).toEqual([]);
});

test("Dutch preference survives reloads and navigation", async ({ page }) => {
  await page.goto("/");
  await openMenuIfMobile(page);
  await page
    .getByRole("button", { name: "Nederlands", exact: true })
    .filter({ visible: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("lang", "nl");
  await page.reload();
  await expect(page.getByText("Hoi, ik ben", { exact: true })).toBeVisible();
  await openMenuIfMobile(page);
  await expect(
    page
      .getByRole("button", { name: "Nederlands", exact: true })
      .filter({ visible: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await clickNavigation(page, "Projecten");
  await expect(page.getByRole("heading", { level: 1 })).toHaveText(
    "Mijn projecten",
  );
  await openMenuIfMobile(page);
  await clickNavigation(page, "Contact");
  await expect(page).toHaveURL("/#contact");
  await expect(
    page.getByRole("link", { name: "Stuur een e-mail" }),
  ).toBeInViewport();
  await expect(
    page.getByRole("link", { name: "Stuur een e-mail" }),
  ).toHaveAttribute("href", "mailto:koenvanwijlick@gmail.com");
});

test("theme preference survives reloads without hydration errors", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  page.on("console", (message) => {
    if (message.type() === "error") errors.push(message.text());
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute(
    "data-mantine-color-scheme",
    "dark",
  );
  await openMenuIfMobile(page);
  await page
    .getByRole("button", { name: "Toggle theme", exact: true })
    .filter({ visible: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-mantine-color-scheme",
    "light",
  );
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute(
    "data-mantine-color-scheme",
    "light",
  );
  await openMenuIfMobile(page);
  await page
    .getByRole("button", { name: "Toggle theme", exact: true })
    .filter({ visible: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-mantine-color-scheme",
    "dark",
  );
  expect(errors).toEqual([]);
});

test("legacy theme preferences are preserved", async ({ page }) => {
  await page.addInitScript(() => {
    localStorage.setItem("runevolve-theme", "theme-light");
  });
  await page.goto("/");
  await expect(page.locator("html")).toHaveAttribute(
    "data-mantine-color-scheme",
    "light",
  );
});

test("language and theme work when local storage is blocked", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  await page.addInitScript(() => {
    Object.defineProperty(window, "localStorage", {
      get() {
        throw new DOMException("Storage disabled", "SecurityError");
      },
    });
  });
  await page.goto("/");
  await openMenuIfMobile(page);
  await page
    .getByRole("button", { name: "Nederlands", exact: true })
    .filter({ visible: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute("lang", "nl");
  await openMenuIfMobile(page);
  await page
    .getByRole("button", { name: "Wissel thema", exact: true })
    .filter({ visible: true })
    .click();
  await expect(page.locator("html")).toHaveAttribute(
    "data-mantine-color-scheme",
    "light",
  );
  expect(errors).toEqual([]);
});

test("pages remain readable with JavaScript disabled", async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto("http://127.0.0.1:3100/");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(
    page.getByRole("heading", {
      name: "Fontys University of Applied Sciences, Venlo",
    }),
  ).toHaveCSS("opacity", "1");
  await page.goto("http://127.0.0.1:3100/projects");
  await expect(page.getByRole("heading", { name: "Growbot" })).toBeVisible();
  await context.close();
});

test("pages fit small phones and tablet breakpoints", async ({ page }) => {
  for (const width of [320, 768, 900, 901, 1280]) {
    await page.setViewportSize({ width, height: 900 });
    for (const path of ["/", "/projects"]) {
      await page.goto(path);
      await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
      expect(
        await page.evaluate(() => document.documentElement.scrollWidth),
      ).toBeLessThanOrEqual(width);
    }
  }
});

test("both themes pass automated accessibility checks", async ({ page }) => {
  for (const scheme of ["dark", "light"]) {
    await page.goto("/");
    if (scheme === "light") {
      await openMenuIfMobile(page);
      await page
        .getByRole("button", { name: "Toggle theme", exact: true })
        .filter({ visible: true })
        .click();
    }
    await expect(page.getByRole("dialog")).toBeHidden();
    for (const path of ["/", "/projects"]) {
      await page.goto(path);
      await expect(page.locator("html")).toHaveAttribute(
        "data-mantine-color-scheme",
        scheme,
      );
      await page.evaluate(async () => {
        await Promise.all(
          document
            .getAnimations()
            .filter((animation) => animation instanceof CSSTransition)
            .map((animation) => animation.finished.catch(() => {})),
        );
      });
      const results = await new AxeBuilder({ page })
        .withTags(["wcag2a", "wcag2aa", "wcag21aa"])
        .analyze();
      expect(results.violations).toEqual([]);
    }
  }
});

test("subtle reading progress follows scrolling and respects reduced motion", async ({
  page,
}) => {
  await page.goto("/");
  const progress = page.getByTestId("reading-progress");
  const initial = await progress.evaluate(
    (el) => getComputedStyle(el).transform,
  );
  await page.evaluate(() => window.scrollTo(0, 1400));
  await expect
    .poll(() => progress.evaluate((el) => getComputedStyle(el).transform))
    .not.toBe(initial);
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(progress).toBeHidden();
  await expect(
    page.getByRole("heading", {
      name: "Fontys University of Applied Sciences, Venlo",
    }),
  ).toBeVisible();
});

test("section reveals settle after scrolling and reduced motion keeps text visible", async ({
  page,
}) => {
  await page.goto("/");
  const feature = page.locator("#foqus [data-reveal]");
  await expect(feature).toHaveAttribute("data-reveal", "pending");
  await page.locator("#foqus").scrollIntoViewIfNeeded();
  await expect(feature).toHaveAttribute("data-reveal", "visible");
  await expect(feature).toHaveCSS("opacity", "1");
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(page.locator("[data-reveal]").last()).toHaveCSS("opacity", "1");
  await expect(page.locator("[data-reveal]").last()).toHaveCSS(
    "filter",
    "none",
  );
});
