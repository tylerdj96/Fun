import React from 'react';
import {StyleSheet, View, Image, Picker, FlatList} from 'react-native';
import {connect} from 'react-redux';
import {updateRealm, updatePVP, updateVisible, updateRealmList, updateIsLoading, updateIsError, updateThumbnail, updateImages, updateMounts} from '../services/redux/actionCreators';
import {mapStateToProps} from '../services/redux/primary';
import { DrawerActions } from 'react-navigation-drawer';
import {
    Button,
    Text, Container,
    Body, Header, Icon, Left, Right, Content, Spinner
} from 'native-base';
import {ListItem} from "react-native-elements";
import ModalFilterPicker from "react-native-modal-filter-picker";

function isEmpty(obj) {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
}

class achievementScreen extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            //achievementPoints: 0
        }
    }

    render() {

        console.log('The props achievement points are: ' + this.props.achievementPoints);
        //console.log('The state achievement points are: ' + this.state.achievementPoints);

        if(this.props.isLoading){
            return(
                <Container style={{backgroundColor: '#000000'}}>
                    <Header />
                    <Content contentContainerStyle={{alignItems: 'center', justifyContent: 'center'}}>
                        <Spinner color = 'white'/>
                    </Content>
                </Container>
            )
        }


        return(
            <Container style={{backgroundColor: '#000000'}}>
                <Header>
                    <Left>
                        <Button transparent     onPress = {() => {
                            this.props.navigation.navigate('Home')
                        }}>
                            <Icon name='home' />
                        </Button>
                    </Left>
                    <Body><Text>Achievement Points</Text></Body>
                    <Right>
                        <Button transparent onPress={() => {this.props.navigation.openDrawer()}}>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>
                    <Content>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>Total Achievement Points for {this.props.character.name}: {this.props.achievementPoints}</Text>
                    </Content>


            </Container>
        );

    }

    onShow = () => {
        updateVisible(true);
    };


    onCancel = () => {
        updateVisible(false);
    }

}

export default connect(mapStateToProps)(achievementScreen)



