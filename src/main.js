import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false

// 给原型链上加上$bus
Vue.prototype.$bus = new Vue()

new Vue({
  render: h => h(App),
  router
}).$mount('#app')
