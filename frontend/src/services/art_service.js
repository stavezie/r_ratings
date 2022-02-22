import {store} from "../redux/store/store";
import ArtsHttp from "../http/artsHttp";
import _ from "lodash";
import {isLoading} from "../redux/actions/globalActions";

const dispatch = store.dispatch;

export async function getArts() {
    const response = await ArtsHttp.getArts()
    if (response) {
        let data = response.data;
        const genresToArts = await ArtsHttp.getArtsGenres()
        const genres = await ArtsHttp.getGenres()
        data.forEach(item => {
            item.genres = [];
            genresToArts.data.forEach(genreToArt => {
                genres.data.forEach(genre => {
                    if (item.id === genreToArt.artId && genre.id === genreToArt.genreId) {
                        item.genres.push(genre.name)
                    }
                })
            })
        })
        dispatch({type: 'GET_ARTS', payload: data});
        dispatch({type: 'GET_SPECIAL_ART', payload: data});
    }
}

export async function getTypes() {
    const response = await ArtsHttp.getTypes()
    if (response) {
        let data = response.data;
        dispatch({type: 'SET_TYPES', payload: data});
    }
}

export async function getGenres() {
    const response = await ArtsHttp.getGenres()
    if (response) {
        let data = response.data;
        const genres = [{name: 'Не учитывать'}]
        data.forEach(i => genres.push({name: i.name, id: i.id}))
        dispatch({type: 'SET_GENRES', payload: genres});
    }
}

export async function getItem(id) {
    let item;
    await ArtsHttp.getOneArt(id).then(async (res) => {
        item = res.data;
        await ArtsHttp.getArtGenres(id).then((genres) => {
            item.genres = genres.data.map(genre => genre.name)
        })


    });
    return item
}

export async function addGenreToArt(artId, genreId) {
    await ArtsHttp.addGenreToArt(artId, genreId)
}

export function selectSortedArts(state, settings = {}) {
    let arr = state.artsReducer[settings.target];
    let sortOptions = state.artsReducer.sortOptions
    arr = settings.sortBy !== 'name' ? _.sortBy(arr, item => item[settings.sortBy]).reverse() : _.sortBy(arr, item => item[settings.sortBy])
    sortOptions.forEach(option => {
        const key = Object.keys(option).toString();
        // eslint-disable-next-line array-callback-return
        arr = arr.filter(item => {
            console.log(item[key])
            if (item[key] !== null) {
                if (option[key] && typeof (item[key]) === 'object') {
                    return item[key].includes(option[key]);
                } else if (option[key] && typeof (item[key]) === 'number') return item[key] == option[key];
                return arr
            }
        })
    })
    return arr;
}