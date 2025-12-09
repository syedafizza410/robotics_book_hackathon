// @ts-check
import { themes as prismThemes } from "prism-react-renderer";

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: "Physical AI & Humanoid Robotics",
  tagline: "Explore the chapters of our book 🚀",
  favicon: "img/favicon.png",

  future: {
    v4: true,
  },

  url: "https://robotics-book-hackathon-5zn2.vercel.app",
  baseUrl: "/",

  organizationName: "facebook",
  projectName: "docusaurus",

  onBrokenLinks: "warn",

  // 🌍 ✨ MULTI-LANGUAGE ENABLED
  i18n: {
    defaultLocale: "en",
    locales: ["en", "ur", "tr"],
    localeConfigs: {
      en: { label: "English" },
      ur: {
        label: "اردو",
        direction: "rtl",
        htmlLang: "ur",
      },
      tr: {
        label: "Türkçe",
        htmlLang: "tr",
      },
    },
  },

  presets: [
    [
      "classic",
      ({
        docs: {
          sidebarPath: "./sidebars.js",
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          lastVersion: "current",
          versions: {
            current: {
              label: "1.0.0",
              badge: true,
            },
          },
        },

        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ["rss", "atom"],
            xslt: true,
          },
          editUrl:
            "https://github.com/facebook/docusaurus/tree/main/packages/create-docusaurus/templates/shared/",
          onInlineTags: "warn",
          onInlineAuthors: "warn",
          onUntruncatedBlogPosts: "warn",
        },

        theme: {
          customCss: "./src/css/custom.css",
        },
      }),
    ],
  ],

  themeConfig: ({
    image: "img/docusaurus-social-card.jpg",
    colorMode: {
      respectPrefersColorScheme: true,
    },

    navbar: {
      title: "Physical AI & Humanoid Robotics",
      logo: {
        alt: "My Site Logo",
        src: "img/logo.png",
      },
      items: [
        {
          type: "docSidebar",
          sidebarId: "docs",
          position: "left",
          label: "Chapters",
        },

        // 🌐 Language Dropdown (AUTO)
        {
          type: "localeDropdown",
          position: "right",
        },

        {
          href: "https://github.com/syedafizza410",
          label: "GitHub",
          position: "right",
        },
      ],
    },

    overrides: {
      "@theme/MDXContent": {
        component: "./src/theme/MDXContent.js",
      },
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Docs",
          items: [{ label: "Chapters", to: "/docs" }],
        },
        {
          title: "Community",
          items: [
            {
              label: "Linkedin",
              href: "https://www.linkedin.com/in/umm-e-fizza-0416b4239/",
            },
            {
              label: "Discord",
              href: "https://discordapp.com/invite/docusaurus",
            },
            {
              label: "X",
              href: "https://x.com/ummefizza123",
            },
          ],
        },
        {
          title: "More",
          items: [
            {
              label: "GitHub",
              href: "https://github.com/syedafizza410",
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} My Project, Inc.`,
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  }),
};

export default config;
