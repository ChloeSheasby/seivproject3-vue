import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router/router'
import store from './store/store'
import vuetify from './plugins/vuetify'

import GoogleAuth from '@/config/google_oAuth.js'
const gauthOption = {
  clientId: '705829709643-vkhieqifai726sk7elkk7ucg8q3a7ebb.apps.googleusercontent.com',
  scope: 'profile email',
  prompt: 'select_account'
}
Vue.use(GoogleAuth, gauthOption)

Vue.use(VueRouter)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  vuetify,
  render: h => h(App),
}).$mount('#app')
