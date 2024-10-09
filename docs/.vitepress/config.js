// .vitepress/config.js
export default {
  // site-level options
  title: "Dialogflow React",
  description: "Just playing around.",

  themeConfig: {
    siteTitle: "Dialogflow React",
    logo: "/logo.svg",

    // nav: nav(),

    sidebar: {
      "/guide/": { base: "/guide/", items: sidebarGuide() },
      //   "/reference/": { base: "/reference/", items: sidebarReference() },
    },

    editLink: {
      pattern:
        "https://github.com/ws-rush/dialogflow-react/edit/main/docs/:path",
      text: "Edit this page on GitHub",
    },

    footer: {
      message: "Released under the MIT License.",
      copyright: "Copyright © 2024",
    },
  },
};

function nav() {
  return [
    {
      text: "Guide",
      link: "/guide/introduction",
      activeMatch: "/guide/",
    },
    //   {
    //     text: 'Reference',
    //     link: '/reference/site-config',
    //     activeMatch: '/reference/'
    //   },
    //   {
    //     text: pkg.version,
    //     items: [
    //       {
    //         text: 'Changelog',
    //         link: 'https://github.com/vuejs/vitepress/blob/main/CHANGELOG.md'
    //       },
    //       {
    //         text: 'Contributing',
    //         link: 'https://github.com/vuejs/vitepress/blob/main/.github/contributing.md'
    //       }
    //     ]
    //   }
  ];
}

function sidebarGuide() {
  return [
    { text: "Introduction", link: "introduction" },
    { text: "Installation", link: "installation" },
    { text: "Getting Started", link: "getting-started" },
    { text: "API Overview", link: "api-overview" },
    { text: "FAQ", link: "faq" },
    //   {
    //     text: 'Getting Started',
    //     collapsed: false,
    //     items: [
    //       { text: 'Introduction', link: 'introduction' },
    //       { text: 'Installation', link: 'installation' },
    //       { text: 'Getting Started', link: 'getting-started' },
    //       { text: 'API Overview', link: 'api-overview' },
    //       { text: 'FAQ', link: 'faq' }
    //     ]
    //   },
    //   {
    //     text: 'Writing',
    //     collapsed: false,
    //     items: [
    //       { text: 'Markdown Extensions', link: 'markdown' },
    //       { text: 'Asset Handling', link: 'asset-handling' },
    //       { text: 'Frontmatter', link: 'frontmatter' },
    //       { text: 'Using Vue in Markdown', link: 'using-vue' },
    //       { text: 'Internationalization', link: 'i18n' }
    //     ]
    //   },
    //   {
    //     text: 'Customization',
    //     collapsed: false,
    //     items: [
    //       { text: 'Using a Custom Theme', link: 'custom-theme' },
    //       {
    //         text: 'Extending the Default Theme',
    //         link: 'extending-default-theme'
    //       },
    //       { text: 'Build-Time Data Loading', link: 'data-loading' },
    //       { text: 'SSR Compatibility', link: 'ssr-compat' },
    //       { text: 'Connecting to a CMS', link: 'cms' }
    //     ]
    //   },
    //   {
    //     text: 'Experimental',
    //     collapsed: false,
    //     items: [
    //       { text: 'MPA Mode', link: 'mpa-mode' },
    //       { text: 'Sitemap Generation', link: 'sitemap-generation' }
    //     ]
    //   },
    //   { text: 'Config & API Reference', base: '/reference/', link: 'site-config' }
  ];
}
