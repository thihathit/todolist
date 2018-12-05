import Vue from 'vue'
import App from './App.vue'
import routerVxSync from 'vuex-router-sync'
import store from './store'
import router from './router'

import { gdrive } from '@/libraries/api-info.js';
import gdfs from 'gdrive-fs';

Vue.config.productionTip = false

routerVxSync.sync(store, router);

new Vue({
  store,
  router,
  created: function() {

    // google drive init
    gdfs.loadApi(gdrive.clientId, gdrive.apiKey).then( () => {
      this.$store.dispatch("updateAuth", {
        name: 'isInit',
        value: true,
      });

      if (gdfs.isSignedIn()) {
        this.$store.dispatch("updateAuth", {
          name: 'isAuth',
          value: true,
        });
      }
    });

  },
  render: h => h(App)
}).$mount('#app')
