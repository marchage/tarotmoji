import * as ApplicationSettings from "@nativescript/core/application-settings";

const initS = () => ({
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
const initPPFS = () => [
    // texts: @source https://www.simplytarot.com/tarot-spreads/past-present-future-tarot-spread/
    // icm with the word "seeker" from @see https://divinationandfortunetelling.com/articles/2017/4/30/the-celtic-cross-tarot-spread
    { title: 'Past', ...initS(), detail: 'past - highlights people, situations and/or influences from the past that still have an affect on the seeker' },
    { title: 'Present', ...initS(), detail: 'present - illustrates the current situation and key people who may bear influence on the seeker' },
    { title: 'Future', ...initS(), detail: 'future - based on what is happening now: the natural follow on, or outcome, for the seeker' }
];
const initCCS = () => [
    // titles from @source https://i.pinimg.com/474x/b9/d6/04/b9d60400bb7b33a7872bf7b87012a86c--tarot-spreads-celtic-crosses.jpg
    // texts from @source https://divinationandfortunetelling.com/articles/2017/4/30/the-celtic-cross-tarot-spread
    { title: 'Significator', ...initS(), detail: 'significator - determines the positions of the rest of the reading' },
    { title: 'Covering Card', ...initS(), detail: 'covers seeker - outlines the situation which the seeker finds themselves in' },
    { title: 'Crossing Card', ...initS(), detail: 'crosses seeker - indicates the problem which the seeker is going through and why they have come for a reading' },
    { title: 'Crown', ...initS(), detail: 'crowns seeker - usually shows the best the seeker can hope for out of the situation' },
    { title: 'Grave', ...initS(), detail: 'below seeker - it drives the psychological reasons why the seeker wishes to know what is going to happen in the future instead of letting it just be as it will be' },
    { title: 'Past Influence', ...initS(), detail: 'behind seeker - concerns the recent past of the situation at hand' },
    { title: 'Future Influence', ...initS(), detail: 'in front of seeker - what can be expected in the very short term future' },
    { title: 'Personal', ...initS(), detail: 'seeker him/her self - outlines the seeker and their attitude towards the situation in general' },
    { title: 'Environmental', ...initS(), detail: 'seeker’s house - outlines the environment which the seeker finds themselves in which influences the question' },
    { title: 'Psychological', ...initS(), detail: 'hopes & fears - read a ‘positive’ card in this position as hopes and negative cards as ‘fears’' },
    { title: 'Future', ...initS(), detail: 'outcome - shows the long term outcome which the seeker will get for the whole situation' }
];
const initialState = (type /* 'PPF' || 'CC' */) => ({
    timestamp: '',
    views: 0,
    type,
    positions: initPPFS()
});

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
