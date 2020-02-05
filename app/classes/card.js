import * as ApplicationSettings from "tns-core-modules/application-settings";

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

export default class Card {
    constructor(initialState, state, ns = 'Card') {
        this.initialState = initialState;
        this.state = state;
        this.ns = ns;
    }
    get getters() {
        return Object.entries(this.state).reduce((s, d, i, a) => {
            const funcName = 'get' + d[0].substr(0, 1).toUpperCase() + d[0].substr(1);
            return { ...s, [funcName]: (state) => state[d[0]] };
        }, {});
    }
    get actions() {
        const ns = this.ns
        return {
            reset({ state, commit }) {
                commit('RESET');
                ApplicationSettings.setString(ns, JSON.stringify(state));
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
                ApplicationSettings.setString(ns, JSON.stringify(state));
            },
            load({ state, dispatch }) {
                let stored = ApplicationSettings.getString(ns);
                if (stored) {
                    stored = JSON.parse(stored);
                }
                if (stored) {
                    dispatch('set', Object.assign({}, state, stored));
                }
            }
        };
    }
    get mutations() {
        return {
            RESET(state) {
                const newState = this.initialState;
                Object.keys(newState).forEach(key => {
                    state[key] = newState[key]
                });
            },
            ...Object.keys(this.initialState).reduce((s, d, i, a) => {
                let funcName = 'SET_' + d.toUpperCase();
                return { ...s, [funcName]: (state, payload) => { state[d] = payload; } };
            }, {})
        };
    }
}
