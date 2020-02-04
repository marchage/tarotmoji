/* Card */
import * as ApplicationSettings from "tns-core-modules/application-settings";

// only contains single word keys
export const initialState = () => ({
    id: -1,
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

// Getters 
export const getters = {
    ...Object.entries(initialState).reduce((s, d, i, a) => {
        const funcName = 'get' + d[0].substr(0, 1).toUpperCase() + d[0].substr(1);
        return { ...s, [funcName]: () => state[d[0]] };
    }, {})
};

// Actions
const actions = {
    reset({ state, commit }) {
        commit('RESET');
        ApplicationSettings.setString('Cards', JSON.stringify(state));
    },
    set({ state, commit }, data) {
        // we can pass the vue object itself on which all this is defined
        Object.keys(initialState).forEach((d, i, a) => {
            const mutation = 'SET_' + d.toUpperCase();
            const supposedType = typeof state[d];
            const isArray = Array.isArray(state[d]);
            if (supposedType === typeof data[d] && isArray === Array.isArray(data[d])) {
                commit(mutation, data[d]);
            }
        });
        ApplicationSettings.setString('Card', JSON.stringify(state));
    },
    load({ state, dispatch }, data) {
        const stored = ApplicationSettings.getString('Card');
        if (stored) {
            dispatch('set', Object.assign({}, state, JSON.parse(stored)));
        }
    }
}

// Mutations
export const mutations = {
    RESET(state) {
        const newState = initialState();
        Object.keys(newState).forEach(key => {
            state[key] = newState[key]
        });
    },
    ...Object.keys(initialState).reduce((s, d, i, a) => {
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
