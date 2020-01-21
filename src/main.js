import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import * as fb from 'firebase'
import Vuetify from 'vuetify'
import 'vuetify/dist/vuetify.min.css'

Vue.use(Vuetify)

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>',
  created () {
    fb.initializeApp({
      apiKey: 'AIzaSyB3Po2508gEkSwmu4MnGA5p60oVTHlo3Kw',
      authDomain: 'ads-project-51b22.firebaseapp.com',
      databaseURL: 'https://ads-project-51b22.firebaseio.com',
      projectId: 'ads-project-51b22',
      storageBucket: 'ads-project-51b22.appspot.com',
      messagingSenderId: '589341464054',
      appId: '1:589341464054:web:24035bc27bff62359023d7'
    })

    fb.auth().onAuthStateChanged(user => {
      if (user) {
        this.$store.dispatch('autoLoginUser', user)
      }
    })

    this.$store.dispatch('fetchAds')
  }
})
