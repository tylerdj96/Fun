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

class talentScreen extends React.Component {

    constructor(props){
        super(props);
        this.state ={
            specNumber: 0
        }
    }


    talentListMapper = () =>{
        var talent_list = [];

        for (var talentNum in this.props.talents){
            // console.log(spec.spec);
            if(this.props.talents[talentNum].spec !== undefined && this.props.talents[talentNum].talents.length != 0) {
                var temp_object = {key: talentNum, label: this.props.talents[talentNum].spec.name};
                talent_list.push(temp_object);
            }
        }
        console.log(talent_list);
        return talent_list;
    };

    render() {

        console.log(this.state.specNumber);

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
                    <Body><Text>Talents</Text></Body>
                    <Right>
                        <Button transparent onPress={() => {this.props.navigation.openDrawer()}}>
                            <Icon name='menu'/>
                        </Button>
                    </Right>
                </Header>
                <Content>
                    <Button iconRight info onPress={this.onShow} style = {{padding: 10, alignSelf:'center'}}>
                        <Text>Change Specialization...</Text>
                        <Icon name='globe'/>
                    </Button>
                    <ModalFilterPicker
                        visible={this.props.visible}
                        onSelect={this.onSelect}
                        onCancel={this.onCancel}
                        options={this.talentListMapper()}
                    />
                    <Image style={{padding: 26, width: 112, height: 112}} source={{uri: 'https://wow.zamimg.com/images/wow/icons/large/' + this.props.talents[this.state.specNumber].talents[this.state.specNumber].spec.icon + '.jpg'}}/>
                    <Text style={{color: 'white', fontWeight: 'bold'}}>{this.props.talents[this.state.specNumber].talents[this.state.specNumber].spec.name}</Text>
                    <FlatList
                        data={this.props.talents[this.state.specNumber].talents}
                        renderItem={({ item }) => (

                            <ListItem
                                title={item.spell.name}
                                hideChevron={true}
                                titleStyle={{ alignItems: 'center', justifyContent:'center', color: 'white'}}
                                containerStyle={{ alignItems: 'center', justifyContent:'center'}}
                                avatar={{ uri: 'https://wow.zamimg.com/images/wow/icons/medium/' + item.spell.icon +'.jpg' }}
                            />
                        )}
                    />
                </Content>

            </Container>
        );

    }

    onShow = () => {
        updateVisible(true);
    };

    onSelect = (specNumber) => {
        this.state.specNumber = specNumber;
        updateVisible(false);
    };


    onCancel = () => {
        updateVisible(false);
    }

}

export default connect(mapStateToProps)(talentScreen)



