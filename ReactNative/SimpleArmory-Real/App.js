import React from "react"
import {View, Text} from 'react-native'
import {Drawer} from "./services/navigators.js"
import {Stack} from "./services/navigators.js"
import {Provider} from "react-redux"
import {createStore} from 'redux'
import {AppRegistry} from "react-native"

const initialState = {
    charName: ""
};

function reducer(state=initialState, action){
    switch(action.type){
        case 'UPDATE':
            return{
                ...state,
                charName: action.value
            };
        default:
            return state;


    }
}
const store = createStore(reducer);

export default class app extends React.Component{

    render(){
        return(
            <Provider store={store}>
            <Stack/>
            </Provider>
        )
    }

}
