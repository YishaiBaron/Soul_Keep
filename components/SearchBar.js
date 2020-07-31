//import liraries
import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { AntDesign,Ionicons } from '@expo/vector-icons'; 

// create a component
const SearchBar = () => {
    return (
        <View style={styles.topBar}>
        <Ionicons name="ios-settings" size={24} color="black" style={styles.searchIcon}/>
        <View style={styles.searchSection}>
            <TextInput
      style={styles.textInputStyle}
     // onChangeText={text => this.SearchFilterFunction(text)}
     // value={this.state.text}
      underlineColorAndroid="transparent"
      placeholder="Find Memories"
      
    />

    <AntDesign name="search1" size={20} color="black" style={styles.searchIcon} />
    </View>
    </View>
    );
};

// define your styles
const styles = StyleSheet.create({
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        borderRadius:20,
        backgroundColor: '#FFFFFF',
        marginRight:5



    },
    topBar: {

        flexDirection: 'row',
    
    
        },
textInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  borderColor: '#009688',

},
searchIcon: {
    padding: 10,
},
});

//make this component available to the app
export default SearchBar;
