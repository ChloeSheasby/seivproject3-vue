
import Vue from 'vue'
import VueRouter from 'vue-router'
import App from './App.vue'
import router from './router'
import vuetify from './plugins/vuetify'

Vue.use(VueRouter)

Vue.config.productionTip = false
//Vue.component('v-select', vSelect)

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
