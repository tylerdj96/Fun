import {createStore} from 'redux'
import {reducer} from './reducers'

export const initialState = {
    character: {
        name: "",
        race: "",
        level: "",
        class: "",
        totalHonorableKills: "",
    },
    thumbnail: "",
    realm: "Select a realm!",
    realmList: [],
    PVP: {
        twos : {},
        rbgs : {},
        threes : {},
        
    },
    mounts: {
        numCollected: "",
        numNotCollected: "",
        collected: []
    },
    talents: [
        {selected: false, talents:[{tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}], spec:{name:"", role:"", icon:""}},
        {selected: false, talents:[{tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}], spec:{name:"", role:"", icon:""}},
        {selected: false, talents:[{tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}], spec:{name:"", role:"", icon:""}},
        {selected: false, talents:[{tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}, {tier: "", column: "", spell:{name: "", icon:"", description:""}}], spec:{name:"", role:"", icon:""}},

    ],
    achievementPoints: "",
    images: [],
    isLoading: true,
    isError: false,
    visible: false,
};

export function mapStateToProps(state){
    return{
        realm: state.realm,
        character: state.character,
        visible: state.visible,
        realmList: state.realmList,
        isLoading: state.isLoading,
        isError: state.isError,
        PVP: state.PVP,
        thumbnail: state.thumbnail,
        images: state.images,
        test: state.test,
        mounts: state.mounts,
        talents: state.talents,
        achievementPoints: state.achievementPoints
    }
}

export const store = createStore(reducer);