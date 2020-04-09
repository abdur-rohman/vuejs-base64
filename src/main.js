import Vue from "vue";
import App from "./vuejs/App.vue";
import router from "./vuejs/router";
import store from "./vuejs/store";

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
