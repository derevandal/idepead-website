module.exports = {
  /*
  ** Build configuration
  */
  build: {},
  /*
  ** Headers
  ** Common headers are already provided by @nuxtjs/pwa preset
  */
  head: {
  },
  /*
  ** Customize the progress-bar color
  */
  loading: { color: '#2A4E52' },
  /*
  ** Customize app manifest
  */
  manifest: {
    name: 'Fale conosco - IDEPead',
    short_name: 'IDEPead',
    lang: 'pt-br',
    theme_color: '#6BC7D2'
  },

  meta: {
    name: 'Fale conosco - IDEPead',
    description: 'Fale conosco a respeito de algum serviço prestado por nossos polos educaionais.',
    lang: 'pt-br',
    ogHost: 'https://idepead.com.br/',
    ogUrl: 'https://idepead.com.br/',
    nativeUI: true
  },
  /*
  ** Modules
  */
  modules: [
    '@nuxtjs/pwa',
    [
      'nuxt-bulma-slim',
      {
        variablesPath: 'assets/scss/variables.scss',
        additionalPaths: ['assets/scss/cosmo.scss', 'assets/scss/fonts.scss']
      }
    ]
  ],

  plugins: [
    '~plugins/buefy',
    '~plugins/v-validate'
  ]
}
