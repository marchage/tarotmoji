import Card, { initialState as initS } from '../../classes/card'


const initialState = () => ({
    timestamp: '',
    pastPresFut: Array(3).fill({ ...initS }),
    celticCross: Array(10).fill({ ...initS }) // @TODO
});

// State object
const state = initialState();
const cTpl = new Card(state, 'Reading');

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
    ...cTpl.getters // should register getPastPresFut and getCelticCros
}

// Actions 
const actions = cTpl.actions;

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
    ...cTpl.mutations
}

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
