import Vue from 'vue'
import App from './components/App.vue'
import Data from './data.js'

console.log(Data);
new Vue({
  el: 'body',
  data: {
  	title: 'ok'
  },
  components: { App }
})
