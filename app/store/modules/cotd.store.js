/* Cotd */
import * as ApplicationSettings from "tns-core-modules/application-settings";

import {
    initialState as initS,
    getters as gets,
    mutations as muts
} from './card.store'


const initialState = () => ({ timestamp: '', ...initS });

// State object
const state = initialState();

// Getter functions
const getters = {
    getTimestamp(state) {
        return state.timestamp;
    },
    ...gets
};

// Actions 
const actions = { 
    reset({ commit }) {
        commit('RESET');
        ApplicationSettings.setString('Cotd', JSON.stringify(state));
    },
    set({ commit }, data) {
        // we can pass the vue object itself on which all this is defined
        Object.keys(initialState).forEach((d, i, a) => {
            const mutation = 'SET_' + d.toUpperCase();
            const supposedType = typeof state[d];
            const isArray = Array.isArray(state[d]);
            if (supposedType === typeof data[d] && isArray === Array.isArray(data[d])) {
                console.log('MARKWARK', mutation, data[d]);
                commit(mutation, data[d]);
            }
        });
        ApplicationSettings.setString('Cotd', JSON.stringify(state));
    },
    load({ state, dispatch }) {
        let stored = ApplicationSettings.getString('Cotd');
        if (stored) {
            stored = JSON.parse(stored);
        }
        if (stored) {
            dispatch('set', Object.assign({}, state, stored));
        }
    }
};

// Mutations
const mutations = {
    SET_TIMESTAMP(state, payload) {
        state.timestamp = payload;
    },
    ...muts
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
