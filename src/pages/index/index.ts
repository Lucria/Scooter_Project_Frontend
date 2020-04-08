import Vue from 'vue';
import App from './App.vue';
import './index.scss';
import {router} from "./router";
import {images} from './images';


Vue.config.productionTip = false;

declare var google: any;

new Vue({
    router,
    render: h => h(App)
}).$mount('#app');
let map: any;
(window as any).initMap = () => {
    const m = document.getElementById('map');
    map = new google.maps.Map(m, {
        center: {lat: 1.3139991, lng: 103.7742101},
        zoom: 12
    });
    console.log("fired");
};


export {
    images,
    map,
}
