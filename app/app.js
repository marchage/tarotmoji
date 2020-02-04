import Vue from 'nativescript-vue';

import store from "./store";
// https://stackoverflow.com/a/58753786
// import VueDevtools from 'nativescript-vue-devtools'

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
