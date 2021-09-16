export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: '蜂鸟旅游',
    htmlAttrs: {
      lang: 'en'
    },
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
      { rel: 'stylesheet', type: 'text/css', href: '//at.alicdn.com/t/font_1168872_ehvuah8v57g.css'} // 新增全局字体样式
    ]
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: [
     "element-ui/lib/theme-chalk/index.css",
     'assets/main.css' // 新增自定义的页面过渡样式（文件来自3.4.1）
  ],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: [
    { src: "~plugins/ElementUI" },
    { src: '~/plugins/localStorage.js', ssr: false },
    "@/plugins/moment",
    '@/plugins/axios',
    
  ],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: true,

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/axios
    '@nuxtjs/axios',
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: { baseURL: "http://127.0.0.1:1337"}, // 新增axios默认请求路径 

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {
  }
}
