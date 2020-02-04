/* Readings */
import * as ApplicationSettings from "tns-core-modules/application-settings";

import {
    initialState as initS,
    getters as gets,
    mutations as muts
} from './card.store'


const initialState = () => ({
    timestamp: '',
    pastPresFut: Array(3).fill({ ...initS }),
    celticCross: Array(10).fill({ ...initS }) // @TODO
});

// State object
const state = initialState();

// Getter functions
const getters = {
    getTimestamp(state) {
        return state.timestamp;
    },
    getPast(state) {
        return state.pastPresFut[0];
    },
    getPresent(state) {
        return state.pastPresFut[1];
    },
    getFuture(state) {
        return state.pastPresFut[2];
    },
    ...gets // should register getPastPresFut and getCelticCros
}

// Actions 
const actions = {
    reset({ commit }) {
        commit('RESET');
        ApplicationSettings.setString('Readings', JSON.stringify(state));
    },
    set({ commit }, data) {
        // we can pass the vue object itself on which all this is defined
        Object.keys(initialState).forEach((d, i, a) => {
            const mutation = 'SET_' + d.toUpperCase();
            const supposedType = typeof state[d];
            const isArray = Array.isArray(state[d]);
            if (supposedType === typeof data[d] && isArray === Array.isArray(data[d])) {
                commit(mutation, data[d]);
            }
        });
        ApplicationSettings.setString('Readings', JSON.stringify(state));
    },
    load({ dispatch }) {
        let stored = ApplicationSettings.getString('Readings');
        if (stored) {
            stored = JSON.parse(stored);
        }
        if (stored) {
            dispatch('set', Object.assign({}, state, stored));
        }
    }
}

// Mutations
const mutations = {
    SET_TIMESTAMP(state, payload) {
        state.timestamp = payload;
    },
    SET_PAST(state, payload) {
        state.pastPresFut[0] = payload;
    },
    SET_PRESENT(state, payload) {
        state.pastPresFut[1] = payload;
    },
    SET_FUTURE(state, payload) {
        state.pastPresFut[2] = payload;
    },
    ...muts
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
