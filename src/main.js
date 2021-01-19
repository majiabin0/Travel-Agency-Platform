import Vue from 'vue'

import Cookies from 'js-cookie'

import 'normalize.css/normalize.css' // A modern alternative to CSS resets

import Element from 'element-ui'
import './styles/element-variables.scss'

import '@/styles/index.scss' // global css
import 'element-ui/lib/theme-chalk/index.css'

import App from './App'
import store from './store'
import router from './router'

import i18n from './lang' // Internationalization
import './icons' // icon
import './permission' // permission control
// import 'amfe-flexible/index.js'

import * as filters from './filters' // global filters
import BaiduMap from 'vue-baidu-map'// 百度地图
import geCode from 'vue-gecode'
import MintUI from 'mint-ui'
// import 'mint-ui/lib/style.css'

import axios from 'axios'
Vue.prototype.$http = axios
import QS from 'qs'
import VueCropper from 'vue-cropper'

Vue.prototype.qs = QS
Vue.component('geCode', geCode)

Vue.use(Element, {
  size: Cookies.get('size') || 'medium', // set element-ui default size
  i18n: (key, value) => i18n.t(key, value)
})
Vue.use(VueCropper)
Vue.use(MintUI)

Vue.use(BaiduMap, {
  ak: 'AAux2OA2FFpltiYYksfug7AzomEoaT7c'
})
// register global utility filters.
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  i18n,
  render: h => h(App)
})
