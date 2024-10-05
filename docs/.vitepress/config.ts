import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Unplugin Reflector",
  description: "轻量级TypeScript反射器，基于unplugin",
  
  themeConfig: {
    logo: './logo_black_fixed.png',

    nav: [
      { text: '主页', link: '/' },
      { text: '开始', link: '/start' },
    ],

    sidebar: [
      // {
      //   text: 'Examples',
      //   items: [
      //     { text: 'Markdown Examples', link: '/markdown-examples' },
      //     { text: 'Runtime API Examples', link: '/api-examples' }
      //   ]
      // }
      {
        text: '开始使用',
        link: '/start'
      },
      {
        text: '安装与配置',
        link: '/install'
      },
      {
        text: '类信息提取',
        link: '/reflect-classes'
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/nailyjs/unplugin-reflector' },
      { icon: 'npm', link: 'https://www.npmjs.com/package/unplugin-naily-reflector' }
    ]
  }
})
