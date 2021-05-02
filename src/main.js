import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import { BootstrapVue, IconsPlugin } from "bootstrap-vue";
import VCalendar from 'v-calendar';
import { setupCalendar} from 'v-calendar'
import Calendar from 'v-calendar/lib/components/calendar.umd';
import DatePicker from 'v-calendar/lib/components/date-picker.umd';

import $ from 'jquery'
// import Vue from "vue";}
import Router from "vue-router";
Vue.use(Router);
Vue.use($);
Vue.use(VCalendar);

Vue.use(setupCalendar);

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.use(IconsPlugin);
// Register components in your 'main.js'
Vue.component('calendar', Calendar)
Vue.component('date-picker', DatePicker)



import "bootstrap/dist/css/bootstrap.css";
import "bootstrap-vue/dist/bootstrap-vue.css";

new Vue({
  components: {
    Calendar,
    DatePicker
  },
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
