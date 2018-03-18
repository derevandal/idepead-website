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
    theme_color: '#6BC7D2'
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
    '~plugins/buefy'
  ]
}
