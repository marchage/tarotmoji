
import store from "./store";
// import VueDevtools from 'nativescript-vue-devtools';
import Vue from 'nativescript-vue';


// https://stackoverflow.com/a/58753786
// 

import Home from './components/Home';

import { ModalStack, overrideModalViewMethod, VueWindowedModal } from './nativescript-windowed-modal';
overrideModalViewMethod();

Vue.registerElement('ModalStack', () => ModalStack);
Vue.use(VueWindowedModal);
// Vue.use(VueDevtools);
// Uncommment the following to see NativeScript-Vue output logs
Vue.config.silent = true;


new Vue({
    store,
    template: `
        <Frame>
            <Home />
        </Frame>`,

    components: {
        Home
    }
}).$start();
