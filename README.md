# anglais-portfolio

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur) + [TypeScript Vue Plugin (Volar)](https://marketplace.visualstudio.com/items?itemName=Vue.vscode-typescript-vue-plugin).

## Customize configuration

See [Vite Configuration Reference](https://vitejs.dev/config/).

## Project Setup

```sh
npm install
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

## Config Directus

Generation of the `key` / `secret` env : 

- `cat /proc/sys/kernel/random/uuid`

Creation of the first admin user :

1 - Connect to the container
2 - run this command : 
  - `npx directus users create --email admin@example.net --password password --role "86416638-a48b-46cc-9fa2-efa0b5f0d803"`