import Card, { initialState as initS } from '../../classes/card';


const initialState = () => ({ timestamp: '', ...initS });

// State object
const state = initialState();
const cTpl = new Card(state, 'Cotd');

// Getter functions
const getters = {
    getTimestamp(state) {
        return state.timestamp;
    },
    ...cTpl.getters
};

// Actions 
const actions = cTpl.actions;

// Mutations
const mutations = {
    SET_TIMESTAMP(state, payload) {
        state.timestamp = payload;
    },
    ...cTpl.mutations
};

export default {
    namespaced: true,
    state,
    getters,
    actions,
    mutations
}
