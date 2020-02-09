import * as ApplicationSettings from "@nativescript/core/application-settings";
import { initPPFState, initCCState, initCardState } from '../../data/layouts';

export const entries = new Map([
    ['timestamp', ''],
    ['views', 0],
    ['type', ''],
    ['positions', []],
]);

const initialState = (type /* 'PPF' || 'CC' */) => {
    const res = Object.fromEntries(entries);
    res.positions = this['init'+type+'State']();
    return res;
}

// State object
const state = initialState('PPF');

// Getter functions
const getters = {
    past(state) {
        return state.type === 'PPF' ? state.positions[0] : state.positions[6];
    },
    present(state) {
        return state.type === 'PPF' ? state.positions[1] : state.positions[4];
    },
    future(state) {
        return state.type === 'PPF' ? state.positions[2] : state.positions[10];
    }
}

// Actions 
const actions = {
    reset({ state, commit }) {
        commit('RESET');
        ApplicationSettings.setString('Readings', JSON.stringify(state));
    },
    set({ state, commit }, data) {
        // we can pass the vue object itself on which all this is defined
        Object.keys(state).forEach((d, i, a) => {
            const mutation = 'SET_' + d.toUpperCase();
            const supposedType = typeof state[d];
            const isArray = Array.isArray(state[d]);
            if (supposedType === typeof data[d] && isArray === Array.isArray(data[d])) {
                commit(mutation, data[d]);
            }
        });
        ApplicationSettings.setString('Readings', JSON.stringify(state));
    },
    load({ state, dispatch }) {
        let stored = ApplicationSettings.getString('Readings');
        if (stored) {
            stored = JSON.parse(stored);
        }
        if (stored) {
            dispatch('set', { ...state, ...stored });
        }
    }
};

// Mutations
const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        });
    },
    ...Object.keys(initialState()).reduce((s, d, i, a) => {
        let funcName = 'SET_' + d.toUpperCase();
        return { ...s, [funcName]: (state, payload) => { state[d] = payload; } };
    }, {})
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
