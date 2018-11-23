import {store} from './primary'

export function updateCharacter(value){
    const action = {
        type: 'UPDATE_CHAR',
        value
    };
    store.dispatch(action);
}
export function updateRealm(value){
    const action = {
        type: 'UPDATE_REALM',
        value
    };
    store.dispatch(action);
}

export function updateRealmList(value){
    const action = {
        type: 'UPDATE_REALM_LIST',
        value
    };
    store.dispatch(action);
}
export function updatePVP(value){
    const action = {
        type: 'UPDATE_PVP',
        value
    };
    store.dispatch(action);
}
export function updateVisible(value){
    const action = {
        type: 'VISIBLE',
        value
    };
    store.dispatch(action);
}
export function updateIsLoading(value){
    const action = {
        type: 'LOADING',
        value
    };
    store.dispatch(action);
}
export function updateIsError(value){
    const action = {
        type: 'ERROR',
        value
    };
    store.dispatch(action);
}

export function updateThumbnail(value){
    const action ={
        type: 'THUMBNAIL',
        value
    };
    store.dispatch(action);
}