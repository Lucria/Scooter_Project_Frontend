import Vue from 'vue';
import App from './App.vue';
import './index.scss';
import {router} from "./router";
import {Core, Kore} from "@kirinnee/core";

const core: Core = new Kore();
core.ExtendPrimitives();

Vue.config.productionTip = false;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
(window as any).initMap = () => {

};
