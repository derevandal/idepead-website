<template lang="pug">
  section.hero.is-idepead.is-bold.is-fullheight
    .hero-body
      .container.has-text-centered
        .column.is-6.is-offset-3
          h1.title
            img(src="/logotipo-blue.svg" width="600" alt="IDEPead" :class="['network',online ? 'online' : 'offline']")
          .box
            .title.has-text-black Fale conosco 🤩
            b-notification(type='is-success' v-if="sended" has-icon)
              | Mensagem enviada com sucesso! Dentro de 48h úteis responderemos você 🤗
            b-notification(type='is-danger' v-if="error" has-icon)
              | Vixi, aconteceu algum problema! 😵 Procure-nos no&nbsp;
              a(href="https://fb.com/idepead") Facebook
              | &nbsp;enquanto isso 😅
            form(name="contact" netlify novalidate='' action="/" @submit.prevent="validateBeforeSubmit")
              .field
                .control.has-icons-left(:class="{'is-loading': loading }")
                  input.input(type="text" :class="{ 'is-danger': errors.has('name') }" name="name" v-model="form.name" placeholder="Qual seu nome?"  v-validate="'required'" required)
                  span.icon.is-left
                    i.fa.fa-user
                  span.help.is-danger(v-if="errors.has('name')") Informe seu nome corretamente.
              .field
                .control.has-icons-left(:class="{'is-loading': loading }")
                  input.input(type="phone" :class="{ 'is-danger': errors.has('phone') }" name="phone" v-model="form.phone" placeholder="Qual seu número telefônico?" v-mask="['(##) ####-####', '(##) #####-####']" v-validate="'required|min:14|max:15'")
                  span.icon.is-left
                    i.fa.fa-mobile
                  span.help.is-danger(v-if="errors.has('phone')") Informe seu número telefônico corretamente.
              .field
                .control.has-icons-left(:class="{'is-loading': loading }")
                  input.input(type="email" :class="{ 'is-danger': errors.has('email') }" name="email" v-model="form.email" placeholder="Qual seu e-mail?" v-validate="'required|email'")
                  span.icon.is-small.is-left
                    i.fa.fa-envelope
                  span.help.is-danger(v-if="errors.has('email')") Informe seu e-mail.
              .field
                .control.has-icons-left(:class="{'is-loading': loading }")
                  input.input(type="text" :class="{ 'is-danger': errors.has('subject') }" name="subject" v-model="form.subject" placeholder="Qual o assunto?"  v-validate="'required'")
                  span.icon.is-left
                    i.fa.fa-commenting
                  span.help.is-danger(v-if="errors.has('subject')") Informe o assunto do contato.
              .field
                .control.has-icons-left(:class="{'is-loading': loading }")
                  textarea.textarea(:class="{ 'is-danger': errors.has('subject') }" name="textarea" v-model="form.message" placeholder="Sobre o que quer conversar?"  v-validate="'required'")
                  span.help.is-danger(v-if="errors.has('subject')") Em que podemos lhe ajudar?.
              b-field(group-multiline style="display:hidden")
                div(netlify-recaptcha)

              b-field(grouped position="is-right" group-multiline)
                p.control.is-expanded
                  a.button.is-gray(href="https://github.com/derevandal" target="_blank")
                    span.icon.is-left
                      i.fa.fa-github
                    span André Van Dal
                    span.icon.is-right
                      i.fa.fa-copyright
                p.control
                  button.button.is-primary(:disabled="!online" :class="{'is-loading': loading }")
                    | Enviar mensagem

</template>

<style lang="scss">
html, body {
  overflow: auto;
}
.hero-body {
    padding: 0rem .75rem;
}
.fa-3x {
  font-size: 3em;
}
.developed {
  align-self: center;
}
</style>

<script>
import {mask} from 'vue-the-mask'
export default {
  head: {
    title: 'Fale conosco - IDEPead'
  },
  name: 'indexIDEPead',
  directives: {mask},
  data () {
    return {
      loading: false,
      online: true,
      sended: false,
      error: false,
      form: { }
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
    },
    validateBeforeSubmit() {
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading = true
          const encode = (data) => {
            return Object.keys(data)
              .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
              .join('&')
          }
          let body = encode({
            'form-name': 'contact', ...this.form
          })
          function handleErrors(response) {
              if (!response.ok) {
                  throw Error(response.statusText)
              }
              return response;
          }
          fetch('/sendform', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
          })
          .then(handleErrors)
          .then(() => {
            this.sended = true
            this.form = { }
            this.$validator.pause()
            this.$nextTick(() => {
              this.$validator.errors.clear()
              this.$validator.fields.items.forEach(field => field.reset())
              this.$validator.fields.items.forEach(field => this.errors.remove(field))
              this.$validator.resume()
            })
          })
          .catch(() => {
            this.error = true
          })
          this.loading = false
          return;
        }
      });
    }
  },
  destroyed () {
    window.removeEventListener('offline', this._toggleNetworkStatus)
    window.removeEventListener('online', this._toggleNetworkStatus)
  }
}
</script>

