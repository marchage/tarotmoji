import * as ApplicationSettings from "@nativescript/core/application-settings";
import * as Layouts from '../../data/layouts';
import { ObservableArray } from 'tns-core-modules/data/observable-array';

const entries = new Map([
    ['timestamp', ''],
    ['views', 0],
    ['type', ''],
    ['positions', new ObservableArray([])],
]);

const initialState = (type /* 'PPF' || 'CC' */) => {
    const newState = Object.fromEntries(entries);
    // positions is a complex type
    newState.positions = Layouts[`init${type}State`](); // @see https://stackoverflow.com/a/56843411
    return newState;
}

// State object
const state = initialState('PPF');

// Getter functions
const getters = {
    past(state) {
        if (typeof (state.positions || {}).getItem !== 'function') return;
        return state.type === 'PPF' ? state.positions.getItem(0) : state.positions.getItem(6);
    },
    present(state) {
        if (typeof (state.positions || {}).getItem !== 'function') return;
        return state.type === 'PPF' ? state.positions.getItem(1) : state.positions.getItem(4);
    },
    future(state) {
        if (typeof (state.positions || {}).getItem !== 'function') return;
        return state.type === 'PPF' ? state.positions.getItem(2) : state.positions.getItem(10);
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
        if (!data.skipAS) ApplicationSettings.setString('Readings', JSON.stringify(state));
    },
    load({ state, dispatch }) {
        let stored = ApplicationSettings.getString('Readings');
        if (stored) {
            stored = JSON.parse(stored);
        }
        if (stored) {
            dispatch('set', { ...state, ...stored, skipAS: true });
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
    SET_POSITIONS(state, payload) {
        // copy old data, overwrite with new data (@TODO that doesn't sound right)
        // shallow data required, or we need deepClone
        // @TODO keep an eye out for cards flipping boolean values... how do they get overwritten?
        state.positions = state.positions.map((pos, i, a) => ({ ...pos, ...payload[i] }));
    }
}
// add mutations (for primitive types)
for (const k of entries.keys()) {
    let funcName = 'SET_' + k.toUpperCase();
    if (!mutations[funcName])
        mutations[funcName] = (state, payload) => { state[k] = payload; };
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
