import {initialState} from './primary';
import * as ACTIONS from './actionCreators';

export function reducer(state=initialState, action){
    switch(action.type){
        case 'UPDATE_CHAR':
            return{
                ...state,
                //charName: state.charName + "butt!"
                charName: action.value
            };
        case 'UPDATE_REALM':
            return{
                ...state,
                realm: action.value
            };
        case 'UPDATE_REALM_LIST':
            return{
                ...state,
                realmList: action.value
            };    
        // case 'UPDATE_PVP':
        //     return{
        //         ...state,
        //         PVP.twos: action.twos
        //     }; 
        case 'LOADING':
            return{
                ...state,
                isLoading: action.value
            };
        case 'ERROR':
            return{
                ...state,
                isError: action.value
            };
        case 'VISIBLE':
            return{
                ...state,
                visible: action.value
            };
        case 'THUMBNAIL':
            return{
                ...state,
                thumbnail: action.value
            };

        default:
            return state;
    }
}