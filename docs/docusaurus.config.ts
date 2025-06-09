import type * as Preset from "@docusaurus/preset-classic";
import type { Config } from "@docusaurus/types";
import { themes as prismThemes } from "prism-react-renderer";

const config: Config = {
  title: "TrackAsia React Native",
  tagline:
    "React Native library for creating maps with TrackAsia Native for Android & iOS.",
  headTags: [
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        href: "/trackasia-react-native/favicons/light.svg",
        type: "image/svg+xml",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        href: "/trackasia-react-native/favicons/light.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: light)",
      },
    },
    {
      tagName: "link",
      attributes: {
        rel: "icon",
        href: "/trackasia-react-native/favicons/dark.svg",
        type: "image/svg+xml",
        media: "(prefers-color-scheme: dark)",
      },
    },
  ],

  url: "https://track-asia.com/",
  baseUrl: "/trackasia-react-native/",

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: "trackasia", // Usually your GitHub org/user name.
  projectName: "trackasia-react-native", // Usually your repo name.

  onBrokenLinks: "throw",
  onBrokenMarkdownLinks: "warn",

  i18n: {
    defaultLocale: "en",
    locales: ["en"],
  },

  presets: [
    [
      "classic",
      {
        docs: {
          path: "content",
          sidebarPath: "./sidebars.ts",
          editUrl:
            "https://github.com/track-asia/trackasia-react-native/tree/main/docs/",
        },
        theme: {
          customCss: "./src/css/custom.css",
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    navbar: {
      title: "TrackAsia React Native",
      logo: {
        alt: "TrackAsia Logo",
        src: "logos/trackasia-logo-square-for-light-bg.svg",
        srcDark: "logos/trackasia-logo-square-for-dark-bg.svg",
      },
      items: [
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "setup",
          label: "Setup",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "guides",
          label: "Guides",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "components",
          label: "Components",
        },
        {
          type: "docSidebar",
          position: "left",
          sidebarId: "modules",
          label: "Modules",
        },
        {
          href: "https://github.com/track-asia/trackasia-react-native",
          label: "GitHub",
          position: "right",
        },
      ],
    },

    footer: {
      style: "dark",
      links: [
        {
          title: "Get Help",
          items: [
            {
              label: "GitHub Discussions",
              href: "https://github.com/track-asia/trackasia-react-native/discussions",
            },
            {
              label: "Slack",
              href: "https://osmus.slack.com/archives/C065DB4T2UB",
            },
          ],
        },
        {
          title: "TrackAsia Community",
          items: [
            {
              label: "BlueSky",
              href: "https://bsky.app/profile/track-asia.com",
            },
            {
              label: "Mastodon",
              href: "https://mastodon.social/@trackasia",
            },
            {
              label: "X",
              href: "https://twitter.com/trackasia",
            },
            {
              label: "LinkedIn",
              href: "https://www.linkedin.com/company/trackasia",
            },
            {
              label: "GitHub",
              href: "https://github.com/TrackAsia",
            },
          ],
        },
      ],
    },

    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
      additionalLanguages: ["diff", "ruby"],
    },

    algolia: {
      appId: "XPG24MVV4L",
      apiKey: "88a400aaa583423db0984b785c1de05b",
      indexName: "trackasia-react-native",
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
