import Vue from 'vue'
import App from './App'
import {myRuquest} from './static/ulti/api.js'
import store from './store/index.js'

Vue.prototype.myRuquest = myRuquest
Vue.prototype.$store = store
Vue.config.productionTip = false



App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
