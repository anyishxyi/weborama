import Vue from 'vue'
import App from './App.vue'

import Element from 'element-ui'
import './styles/element-variables.scss'
import locale from 'element-ui/lib/locale/lang/fr'

import '@/styles/index.scss' // global css

import store from './store'
import router from './router'
// import './icons'

const moment = require('moment')
require('moment/locale/fr')

Vue.config.productionTip = false

Vue.prototype.handleEvent = new Vue()

Vue.use(Element, { locale })

Vue.use(require('vue-moment'), {
  moment
})

new Vue({
  render: h => h(App),
  store,
  router
}).$mount('#app')
