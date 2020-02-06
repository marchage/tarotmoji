import * as ApplicationSettings from "@nativescript/core/application-settings";


const initialState = () => ({
    id: -1,
    timestamp: '', 
    major: true,
    name: '',
    meaning: '',
    emoji: '',
    emoji1: '',
    emoji2: '',
    icon: 'emoji',
    reversed: false
});

// State object
const state = initialState();

// Getter functions
const getters = {};

// Actions 
const actions = {
    reset({ state, commit }) {
        commit('RESET');
        ApplicationSettings.setString('Cotd', JSON.stringify(state));
    },
    set({ state, commit }, data) {
        // we can pass the vue object itself on which all this is defined. not anymore. updated
        Object.keys(state).forEach((d, i, a) => {
            const mutation = 'SET_' + d.toUpperCase();
            const supposedType = typeof state[d];
            const isArray = Array.isArray(state[d]);
            if (supposedType === typeof data[d] && isArray === Array.isArray(data[d])) {
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
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
