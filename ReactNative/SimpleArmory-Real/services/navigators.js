import {createDrawerNavigator, createStackNavigator, DrawerActions} from 'react-navigation'
import React, {Component} from 'react';

import HomeScreenR from '../screens/homeScreenR.js'
import characterDetailScreen from '../screens/characterDetailScreen.js'

//Drawers for Char->Other
import pvpDetailsScreen from '../screens/pvpDetailsScreen.js'
import mountScreen from '../screens/mountScreen.js'

export const Drawer = createDrawerNavigator({
    Character: {
        screen: characterDetailScreen
    },
    PvP: {
        screen: pvpDetailsScreen
    },
    Mounts: {
        screen: mountScreen
    },
    },
{ drawerPosition: 'right'}

);

export const Stack = createStackNavigator({
        Home: {
            screen: HomeScreenR
        },
        Drawer: {
            screen : Drawer
        },
    },
    {
        initialRouteName: 'Home'
    });
