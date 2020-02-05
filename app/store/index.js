import Vue from 'nativescript-vue';
import Vuex from '../vuex';
import createLogger from '../vuex/dist/logger';
// import the auto exporter
import modules from './modules';

Vue.use(Vuex);
const debug = process.env.NODE_ENV !== 'production';

export default new Vuex.Store({
  modules, // all modules automatically imported :)
  actions: {
    reset({ dispatch }) {
      // resets state of all the modules
      Object.keys(modules).forEach(moduleName => {
        dispatch(`${moduleName}/reset`); // @TODO modulePath should not be set!!!
      });
    },
    set({ dispatch }, data) {
      Object.keys(modules).forEach(moduleName => {
        dispatch(`${moduleName}/set`, { ...data });
      });
    },
    load({ dispatch }) {
      Object.keys(modules).forEach(moduleName => {
        dispatch(`${moduleName}/load`);
      });
    }
  },
  strict: debug,
  plugins: debug ? [createLogger()] : [] // set logger only for development
});
