import * as ApplicationSettings from "tns-core-modules/application-settings";
import { initialState as initS } from '../../classes/card'


const initialState = () => ({
    timestamp: '',
    pastPresFut: Array(3).fill({ ...initS }),
    celticCross: Array(10).fill({ ...initS }) // @TODO
});

// State object
const state = initialState();

// Getter functions
const getters = {
    past(state) {
        return state.pastPresFut[0];
    },
    present(state) {
        return state.pastPresFut[1];
    },
    future(state) {
        return state.pastPresFut[2];
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
    }, {}),
    SET_PAST(state, payload) {
        state.pastPresFut[0] = payload;
    },
    SET_PRESENT(state, payload) {
        state.pastPresFut[1] = payload;
    },
    SET_FUTURE(state, payload) {
        state.pastPresFut[2] = payload;
    }
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
