import {createStore} from 'redux'
import {reducer} from './reducers'

export const initialState = {
    charName: "",
    thumbnail: "",
    realm: "Select a realm!",
    realmList: [],
    PVP: {
        twos : {},
        rbgs : {},
        threes : {},
        images: []
    },
    Mounts: {

    },
    isLoading: true,
    isError: false,
    visible: false,
};

export function mapStateToProps(state){
    return{
        realm: state.realm,
        charName: state.charName,
        visible: state.visible,
        realmList: state.realmList,
        isLoading: state.isLoading,
        isError: state.isError,
        PVP: state.PVP,
        thumbnail: state.thumbnail,
    }
}

export const store = createStore(reducer);