import Vue from 'vue'
import App from './App.vue'
import store from './store'
import router from './router'


// import VueUnits from 'vue-units';
// Vue.use(VueUnits)

import VueSlider from 'vue-slider-component'
import 'vue-slider-component/theme/antd.css'
import VTooltip from 'v-tooltip'

Vue.use(VTooltip)

Vue.component('VueSlider', VueSlider)

Vue.config.productionTip = false

import InputEditor from './components/InputEditor.vue'
import ImgToggler from './components/utils/ImgToggler.vue'
import ColorPickerToggler from './components/utils/ColorPickerToggler.vue'


Vue.component('InputEditor', InputEditor)
Vue.component('ImgToggler', ImgToggler)
Vue.component('ColorPickerToggler', ColorPickerToggler)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')


