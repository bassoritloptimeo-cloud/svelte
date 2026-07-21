

function createStateComparator() {
    let savedState = {};

    return function(state) {
        const changedElements = {};
        for (const [key, value] of Object.entries(state)) {
            changedElements[key] = savedState[key] !== value;
        }
        savedState = {...maze};
        return changedElements;
    }
}
