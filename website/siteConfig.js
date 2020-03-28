/**
 * Copyright (c) 2017-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

// See https://docusaurus.io/docs/site-config for all the possible
// site configuration options.

// List of projects/orgs using your project for the users page.


const siteConfig = {
  title: 'PlatON', // Title for your website.
  tagline: 'PlatON',
  url: 'https://luo-dahui.github.io/', // Your website URL
  baseUrl: '/docs/', // Base URL for your project */
  // Used for publishing and more
  projectName: 'Docs',
  organizationName: 'luo-dahui',
  // For top-level user or org sites, the organization is still the same.
  // e.g., for the https://JoelMarcey.github.io site, it would be set like...
  //   organizationName: 'JoelMarcey'
  docsUrl :'',
  
  algolia: {
    apiKey:"0f9f28b9ab9efae89810921a351753b5",
    indexName: "github"
  },
  // For no header links in the top nav bar -> headerLinks: [],
  headerLinks: [
    //{doc: 'index', label: 'Docs'},
	// 判断链接中的搜索栏的位置
	{ search: true },
	// 判断链接中的语言下拉菜单的位置
	{ languages: true }
  ],

  // If you have users set above, you add it here:
  //users,

  /* path to images for header/footer */
  headerIcon: 'img/PlatON-logo.svg',
  footerIcon: 'img/PlatON-logo2.svg',
  favicon: 'img/logo.png',

  /* Colors for website */
  colors: {
    primaryColor: '#E40065',
    secondaryColor: '#030418',
  },

  /* Custom fonts for website */
  /*
  fonts: {
    myFont: [
      "Times New Roman",
      "Serif"
    ],
    myOtherFont: [
      "-apple-system",
      "system-ui"
    ]
  },
  */

  // This copyright info is used in /core/Footer.js and blog RSS/Atom feeds.
  copyright: `Copyright © ${new Date().getFullYear()} PlatON Network`,

  highlight: {
    // Highlight.js theme to use for syntax highlighting in code blocks.
    theme: 'default',
  },

  // Add custom scripts here that would be placed in <script> tags.
  scripts: [
    "https://buttons.github.io/buttons.js",
    "/docs/js/redirect.js"
  ],

  // On page navigation for the current documentation page.
  onPageNav: 'separate',
  // No .html extensions for paths.
  cleanUrl: true,

  // Open Graph and Twitter card images.
  ogImage: 'img/undraw_online.svg',
  twitterImage: 'img/undraw_tweetstorm.svg',

  //侧边栏伸缩
  docsSideNavCollapsible: true,

  //外部链接
  expectUrl:{
    'en':{
      "PlatON":"https://platon.network/?lang=en",
      "Foundation":"https://latticex.foundation/home",
      "Forum":"https://forum.latticex.foundation/"
    },
    "zh-CN":{
      "PlatON":"https://platon.network/?lang=zh",
      "Foundation":"https://latticex.foundation/home",
      "Forum":"https://forum.latticex.foundation/"
    }
  }

  // Show documentation's last contributor's name.
  // enableUpdateBy: true,

  // Show documentation's last update time.
  // enableUpdateTime: true,

  // You may provide arbitrary config keys to be used as needed by your
  // template. For example, if you need your repo's URL...
  //   repoUrl: 'https://github.com/facebook/test-site',
};

module.exports = siteConfig;
