export const entries = new Map([
    ['id', -1],
    ['timestamp', ''],
    ['major', false],
    ['name', ''],
    ['meaning', ''],
    ['emoji', ''],
    ['emoji1', ''],
    ['emoji2', ''],
    ['icon', ''],
    ['reversed', false]
]);

// all shallow values, otherwise use lodash deepcopy (already included)
export const initCardState = () => Object.fromEntries(entries);
