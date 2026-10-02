# Curriculum Vitae Website

An interactive, animated CV website showcasing Koen van Wijlick’s education, internships, work experience, and volunteer activities.

---

<div style="text-align:center; margin: 1rem 0;">
  <img src="https://img.shields.io/badge/framework-Next.js-blue" alt="Next.js badge" />
  <img src="https://img.shields.io/badge/ui-Mantine-blue" alt="Mantine badge" />
  <img src="https://img.shields.io/badge/animation-Framer_Motion-red" alt="Framer Motion badge" />
  <img src="https://img.shields.io/badge/i18n-react--i18next-orange" alt="i18next badge" />
</div>

## Development and checks

Requires Node.js 22 or later and Corepack. Use Yarn 4 (the version in `packageManager`), with the committed lockfile and `.yarnrc.yml`.

```sh
corepack enable
corepack yarn install --immutable
corepack yarn dev
```

The site uses Next.js 16, React 19, and Mantine 9. Its photography-led portfolio design highlights FOQUS Vision as Koen’s current main work, with restrained blue accents, scroll reveals, subtle photographic parallax, a reading progress bar, and support for reduced motion. It supports English and Dutch, with saved language and color preferences. Contact links open an email application; there is no contact form backend.

Before submitting changes:

```sh
corepack yarn test
corepack yarn build
corepack yarn playwright install chromium
corepack yarn test:e2e
```

`yarn test` checks formatting, ESLint, CSS linting, and TypeScript. The browser suite runs against the production build on port 3100, covering desktop and mobile navigation, translation and theme persistence, project images and descriptions, CV downloads, blocked storage, JavaScript-disabled rendering, layout breakpoints, scroll animation and reduced motion, and automated accessibility checks. GitHub Actions runs the same checks. Use `yarn analyze` for the Webpack bundle analyzer.

Keep ESLint on the latest 9.x patch and TypeScript on 6.0.x until the plugins included in `eslint-config-next` support ESLint 10 and TypeScript 7. The dependency audit currently reports an ESLint 9 deprecation notice; the production dependency audit has no findings. The `@humanfs/node` resolution applies its compatible security patch to ESLint’s dependency tree.

Personal career dates and project claims should only change when new information is provided by Koen. Translation files live in `public/locales/{en,nl}/common.json`.

# Koen van Wijlick

**Mechatronics Graduate & AI Engineer**

📍 Panningen, Netherlands\
📞 +31 640167158\
✉️ [koenvanwijlick@gmail.com](mailto:koenvanwijlick@gmail.com)\
🔗 [LinkedIn Profile](https://www.linkedin.com/in/koen-van-wijlick-00b820204)

---

## 🎓 Education

**Fontys University of Applied Sciences, Venlo**\
*September 2021 – July 2025*\
Bachelor of Science in Mechatronics (HBO)

**Gilde Opleidingen**\
*September 2017 – July 2021*\
Secondary Vocational Education (MBO) Level 4 in Mechatronics

**Bouwens van der Boijecollege, Panningen**\
*September 2013 – July 2017*\
MAVO (Lower General Secondary Education)

---

## 💼 Work Experience

**FOQUS Vision, Deurne — Current main work**\
*2025 – Present*

- AI Software Engineer
- Designs AI software and integrations for industrial visual quality control.
- [FOQUS website](https://foqus-vision.com)

**Mechatronic Machinery, Deurne**\
*January 2024 – Present*\
- Software Engineer AI\
- Researched and implemented AI techniques to optimize robotic systems.

**Tinus, Panningen**\
*August 2022 – August 2023*\
- Bar Staff\
- Advised customers on craft beers and managed bar operations under pressure.

**Restaurant Op d’n Berg, Helden**\
*March 2017 – August 2022*\
- Service & Kitchen Staff\
- Coordinated staff and ensured smooth service and kitchen workflows.

**Stichting Jong Nederland Helden**\
*May 2026 – Present*\
- Board Member

**Stichting Jong Nederland Helden**\
*September 2018 – Present*\
- Volunteer Group Leader\
- Organized event logistics and managed tent setups.

**Various Agricultural Companies**\
*February 2014 – November 2020*\
- Cultivation Assistant & Quality Controller\
- Harvested, sorted, and inspected crops on strawberry, asparagus, and leek farms.

---

## 🔧 Internships

**Mechatronic Machinery, Deurne**\
*August 2023 – January 2024*\
- Developed an AI-based product detection concept for precise location mapping.

**Kusters Engineering, Venlo**\
*February 2021 – July 2021*\
- Designed a feed system concept for a shredder machine; delivered advisory & drawings.

**Various Companies (Christiaens Group BV, WP Haton, Aliaxis)**\
*May 2018 – March 2019*\
- Gained mechatronics experience: electrical schematics, Excel calculations, and cabinet assembly.

---

## 💻 Software Experience and Certifications

### 📜 Certifications

- **SolidWorks Mechanical Design Associate**\
  Issued: May 2019 – No Expiration\
  Credential ID: C-5SUCTJW3L4\
  Validated proficiency in 3D CAD modeling, part design, assembly creation, and technical drawings using SolidWorks.

- **Basisveiligheid VCA**\
  Issued: March 2018 – Expires: March 2028\
  Credential ID: 541448.05174689\
  Certified in occupational health and safety for working in high-risk environments according to Dutch/Belgian VCA standards.

### 🛠️ Software & Programming Skills

- **Python, C++** – Robotics, AI, computer vision (YOLO, ROS 2, OpenCV)
- **React, TypeScript, JavaScript** – Modern frontend development for web applications
- **PostgreSQL, SQLite** – Relational database design, querying, and integration
- **FastAPI, MQTT** – Backend API development and real-time communication
- **Docker, Git, Linux** – Containerization, version control, and system operations
- **Siemens PLC (TIA Portal)** – Industrial automation and control systems
- **SolidWorks, Inventor, AutoCAD** – 3D modeling and 2D schematic design
- **Redis, WebSockets** – In-memory data storage and live data streaming
- **Next.js, MUI (Material UI)** – Full-stack web applications and component-driven UI design

---

## 🌐 Languages

- Dutch: Native\
- English: Fluent\

---

*...and many more to come…*
