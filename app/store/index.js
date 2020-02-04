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
        dispatch(`${moduleName}/reset`, { modulePath: moduleName }); // @TODO modulePath should not be set!!!
      });
    },
    set({ dispatch }, data) {
      Object.keys(modules).forEach(moduleName => {
        dispatch(`${moduleName}/set`, { modulePath: moduleName, ...data });
      });
    },
    load({ dispatch }, data) {
      Object.keys(modules).forEach(moduleName => {
        dispatch(`${moduleName}/load`, { modulePath: moduleName, ...data });
      });
    }
  },
  strict: debug,
  plugins: true ? [createLogger()] : [] // set logger only for development
});
