const _ = require('lodash');

const defaultState = {
    arts: [],
    anime: [],
    series: [],
    types: [],
    genres: [],
    years: ['Не учитывать', "1999", "2006"],
    ratingOptions: ['Не учитывать', "1", "2", "3", "4", "5", "6", "7", "8", "9", "10"],
    sortOptions: [
        {rating: null},
        {date: null},
        {genres: null},
    ],
    radioSort: 'rating',
    target: '',
    forms: {
        addGenreToArt: {inputs: [{name: 'Название арта'}, {name: 'Название жанра'}]}
    }
};

// export const sortBySelects = (arrayToSort, sortOptions, fullArr, target) => {
//     arrayToSort = fullArr.filter(item => item.type === target);
//     sortOptions.forEach(option => {
//         const key = Object.keys(option).toString();
//         arrayToSort = arrayToSort.filter(item => {
//             if (option[key]) return item[key] == option[key];
//             return arrayToSort
//         })
//     })
//     return arrayToSort
// }

export const dispatchSortOptions = (oldOptions, key, newOption) => {
    oldOptions.forEach(option => {
        const oldKey = Object.keys(option).toString();
        if (oldKey === key && newOption !== 'Не учитывать') return option[key] = newOption
        if (oldKey === key) return option[key] = null
    })
    return oldOptions
}

export const artsReducer = (state = defaultState, action) => {
    switch (action.type) {
        case 'GET_ARTS':
            return {...state, arts: action.payload}
        case 'GET_SPECIAL_ART':
            return {
                ...state,
                anime: action.payload.filter(item => item.type === 'anime'),
                series: action.payload.filter(item => item.type === 'series')
            }
        case 'SORT_BY_RADIO':
            return {...state, [state.target]: action.payload.arts.slice()}
        case 'SORT_BY_SELECTS':
            return {...state, [state.target]: action.payload}
        case 'CHANGE_SORT_OPTIONS':
            return {...state, sortOptions: action.payload.slice()}
        case 'CHANGE_TARGET':
            return {...state, target: action.payload}
        case 'CHANGE_RADIO_SORT':
            return {...state, radioSort: action.payload}
        case 'SET_TYPES':
            return {...state, types: action.payload}
        case 'SET_GENRES':
            return {...state, genres: action.payload}
        default:
            return state;
    }
}