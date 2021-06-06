import Vue from "vue";
import App from "./App.vue";


// import {message1,message2} from "./data"
// import ShowMessage from "./msg.js"

// ShowMessage(message1);
// ShowMessage(message2);

Vue.config.productionTip = false;

new Vue({
  render: (h) => h(App),
}).$mount("#app");
