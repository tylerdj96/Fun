import React from 'react';
import {FlatList, StyleSheet, Text, View, Image} from 'react-native';
import {connect} from 'react-redux';
import {mapStateToProps} from '../services/redux/primary';
import {updateIsLoading} from '../services/redux/actionCreators';
import { ListItem } from 'react-native-elements'


var rarityDict = {1: "Common", 2: "Uncommon", 3: "Rare", 4: "Epic"};

class mountScreen extends React.Component {

    constructor(props){
        super(props);
    }


    componentDidMount(){
        updateIsLoading(true);
        updateIsLoading(false);
    }

    render() {

        console.log(this.props.mounts.collected);

        if(this.props.isLoading){
            return(
                <View style={{flex: 1, padding: 20}}>
                    <Text>Updating...</Text>
                </View>
            )
        }

        return(
            <View style={{flex: 1, paddingTop:20}}>
                <FlatList
                    data={this.props.mounts.collected}
                    renderItem={({ item }) => (

                        <ListItem
                        title={`${item.name}`}
                        subtitle={rarityDict[item.qualityId]}
                        avatar={{ uri: 'https://wow.zamimg.com/images/wow/icons/medium/' + item.icon +'.jpg' }}
                        />
                    )}
                />
            </View>
        );
    }

}

export default connect(mapStateToProps)(mountScreen)


// <View>
// <Image style={{width: 56, height: 56}}
// source={{uri: 'https://wow.zamimg.com/images/wow/icons/medium/' + item.icon +'.jpg'}}/>
// <Text>{item.name}</Text>
// </View>
