// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";
import { BootstrapVue } from 'bootstrap-vue'
// Import Bootstrap an BootstrapVue CSS files (order is important)
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from "vuelidate";
import { ClientTable } from 'vue-tables-2';
import VueTheMask from "vue-the-mask";
import Loading from 'vue-loading-overlay';
import 'vue-loading-overlay/dist/vue-loading.css';

export const eventBus = new Vue();
Vue.use(BootstrapVue)
Vue.use(Vuelidate);
Vue.use(ClientTable, {}, false, 'bootstrap3');
Vue.use(Loading, {
   color: '#4a61e8'
});




Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
   el: "#app",
   router,
   components: { App },
   template: "<App/>"
});
