import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";

import axios from "axios";
import VueAxios from "vue-axios";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";

import DegreeC from "./filters/DegreeC.js";
import Time from "./filters/Time.js";
import Date from "./filters/Date.js";
import Time2 from "./filters/Time2.js";
import Time3 from "./filters/Time3.js";
import Time4 from "./filters/Time4.js";

Vue.use(VueAxios, axios);
Vue.use(ElementUI);

Vue.filter("degreec", DegreeC);
Vue.filter("time", Time);
Vue.filter("date", Date);
Vue.filter("time2", Time2);
Vue.filter("time3", Time3);
Vue.filter("time4", Time4);

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
