import { createApp } from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify'
import { loadFonts } from './plugins/webfontloader'
import MazPicker from 'maz-ui/components/MazPicker'
import router from './router/index.js'
import 'maz-ui/styles'

loadFonts()

createApp(App)
  .use(router)
  .component('MazPicker', MazPicker)
  .use(vuetify)
  .mount('#app')
