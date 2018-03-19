<template lang="pug">
section.hero.is-idepead.is-bold.is-fullheight
  .hero-body
    .container.has-text-centered
      .column.is-6.is-offset-3
        h1.title
          img(src="/logotipo-blue.svg" width="600" alt="IDEPead")
        .box
          .title.has-text-black Fale conosco&nbsp;
            emoji(emoji=":star-struck:" set="google" :size="32")
          article.notification.is-danger(v-if="error")
            .media
              .media-left
                span.icon.is-large
                  i.fa.fa-exclamation-circle.fa-3x
              .media-content
                | Eita, aconteceu algum problema!&nbsp;
                emoji(emoji=":dizzy_face:" set="google" :size="16")
                | &nbsp;Procure-nos no&nbsp;
                a(href="https://fb.com/idepead") Facebook
                | &nbsp;enquanto isso.&nbsp;
                emoji(emoji=":sweat_smile:" set="google" :size="16"))
          article.notification.is-success(v-if="sended")
            .media
              .media-left
                span.icon.is-large
                  i.fa.fa-check-circle.fa-3x
              .media-content Mensagem enviada com sucesso! Dentro de 48h úteis responderemos você.
                emoji(emoji=":hugging_face:" set="google" :size="16")
          form(name="fale-conosco", netlify, action="/send", method='POST', netlify-honeypot='subject', @submit.prevent="validateBeforeSubmit", novalidate="novalidate")
            .field(style="display:none;")
              .control
                input.input(type="text" name="subject")
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
                textarea.textarea(:class="{ 'is-danger': errors.has('message') }" name="message" v-model="form.message" placeholder="Sobre o que quer conversar?"  v-validate="'required'")
                span.help.is-danger(v-if="errors.has('message')") Em que podemos lhe ajudar?
            div(netlify-recaptcha)
            .field.is-grouped.is-grouped-right
              p.control.is-expanded
                a.button.is-text(href="https://github.com/derevandal/idepead-website" target="_blank" style="text-decoration: none")
                  span.icon.is-left
                    i.fa.fa-github
                  span André Van Dal
              p.control
                button.button.is-primary(type="submit" :class="{'is-loading': loading }")
                  | Enviar mensagem


</template>

<style lang="scss">
* {
  box-sizing: border-box;
}
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
import { mask } from 'vue-the-mask'
import { Emoji } from 'emoji-mart-vue'

export default {
  head: {
    title: 'Fale conosco - IDEPead'
  },
  components: {
    emoji: Emoji
  },
  name: 'indexIDEPead',
  directives: {mask},
  data () {
    return {
      loading: false,
      sended: false,
      error: false,
      form: {
        name: '',
        phone: '',
        email: '',
        message: ''
      }
    }
  },
  methods: {
    validateBeforeSubmit() {
      this.loading = true
      this.$validator.validateAll().then((result) => {
        if (result) {
          this.loading = true
          const encode = (data) => {
            return Object.keys(data)
              .map(key => encodeURIComponent(key) + '=' + encodeURIComponent(data[key]))
              .join('&')
          }
          let body = encode({
            'form-name': 'fale-conosco', ...this.form
          })
          function handleErrors(response) {
              if (!response.ok) {
                  throw Error(response.statusText)
              }
              return response;
          }
          fetch('/send', {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: body
          })
          .then(handleErrors)
          .then(() => {
            this.sended = true
            this.form = {
              name: '',
              phone: '',
              email: '',
              message: ''
            }
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
  }
}
</script>

