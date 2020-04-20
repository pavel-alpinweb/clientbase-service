const inlineDefs = require('@nuxtjs/svg-sprite/lib/plugins/inlineDefs.js')
const removeUselessStrokeAndFill = require('svgo/plugins/removeUselessStrokeAndFill')
const removeDimensions = require('svgo/plugins/removeDimensions')
const removeAttrs = require('svgo/plugins/removeAttrs')

function defaultPlugins () {
  removeUselessStrokeAndFill.active = true
  removeAttrs.active = true
  removeDimensions.active = true
  removeAttrs.params.attrs = '(fill|width|height|stroke)'

  return [
    removeUselessStrokeAndFill,
    removeAttrs,
    { inlineDefs } // NOTE: it's important to pass custom plugins as object.
  ]
}

module.exports = {
  mode: 'universal',
  /*
  ** Headers of the page
  */
  head: {
    title: process.env.npm_package_name || '',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: process.env.npm_package_description || '' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#fff' },
  /*
  ** Global CSS
  */
  css: [
    '@/assets/styles/layout/fonts.scss',
    '@/assets/styles/layout/base.scss'
  ],
  /*
  ** Plugins to load before mounting the App
  */
  plugins: [
  ],
  /*
  ** Nuxt.js dev-modules
  */
  buildModules: [
    // Doc: https://github.com/nuxt-community/eslint-module
    '@nuxtjs/svg-sprite',
    '@nuxtjs/eslint-module'
  ],
  /*
  ** Nuxt.js modules
  */
  modules: [
    // Doc: https://axios.nuxtjs.org/usage
    '@nuxtjs/axios',
    '@nuxtjs/pwa'
  ],
  /*
  ** Axios module configuration
  ** See https://axios.nuxtjs.org/options
  */
  axios: {
  },
  /*
  ** SVG sprite settings
  */
  svgSprite: {
    input: '~/assets/svg/',
    svgoConfig () {
      return {
        plugins: defaultPlugins()
      }
    }
  },
  /*
  ** Build configuration
  */
  build: {
    /*
    ** You can extend webpack config here
    */
    extend (config, ctx) {
    }
  }
}
