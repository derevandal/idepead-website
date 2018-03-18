<template lang="pug">
  section.hero.is-idepead.is-bold.is-fullheight
    .hero-body
      .container.has-text-centered
        .column.is-6.is-offset-3
          h1.title
            img(src="/logotipo-blue.svg" width="600" alt="IDEPead" :class="['network',online ? 'online' : 'offline']")
          .box
            .title.has-text-black Entre em contato conosco
            b-field(grouped)
              b-input(placeholder='Nome', type='text', min='3', expanded, icon="user")
              b-input(placeholder='Celular', type='text', expanded, icon="mobile")
            b-field(grouped)
              b-input(placeholder='Email', type='email', expanded, icon="envelope")
              b-input(placeholder='Assunto', type='text', min="5", expanded, icon="commenting")
            b-field
              b-input(type='textarea', minlength='10', maxlength='500', placeholder='Escreva sua mensagem aqui...')
            b-field(grouped position="is-right")
              p.control
                button.button.is-primary
                  | Enviar mensagem

</template>

<style lang="scss">
</style>

<script>
export default {
  head: {
    title: 'Entre em contato conosco - IDEPead'
  },
  data () {
    return {
      online: true
    }
  },
  mounted () {
    if (!window.navigator) {
      this.online = false
      return
    }
    this.online = Boolean(window.navigator.onLine)
    window.addEventListener('offline', this._toggleNetworkStatus)
    window.addEventListener('online', this._toggleNetworkStatus)
  },
  methods: {
    _toggleNetworkStatus ({ type }) {
      this.online = type === 'online'
    }
  },
  destroyed () {
    window.removeEventListener('offline', this._toggleNetworkStatus)
    window.removeEventListener('online', this._toggleNetworkStatus)
  }
}
</script>

