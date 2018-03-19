# IDEPead's Website

> This is a website to recieve contacts from web using Netlify as backend to send me e-mail notification.

## Build Setup

``` bash
# install dependencies
$ yarn install

# we're waiting a fix in nuxt so use this command (unix-like only)
$ yarn replace

# serve with hot reload at localhost:3000
# service worker is disabled in dev
$ yarn dev dev

# build command on netlify.toml
$ yarn replace && yarn build && yarn generate
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://github.com/nuxt/nuxt.js).
