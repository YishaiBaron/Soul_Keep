import React, { memo } from "react";
import { View, FlatList,Text, StyleSheet, TextInput, Image, Linking } from "react-native";
import Fire from "../Fire";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Entypo,AntDesign,Ionicons } from '@expo/vector-icons'; 
import moment from "moment";


export default class ProfileScreen extends React.Component {
    state = {
        user: {}, 
        tempDoc: [], 
        name:"Jaina"       
    }

    unsubscribe = null;

    componentDidMount() {
        const user = this.props.uid || Fire.shared.uid;

        this.unsubscribe = Fire.shared.firestore
            .collection("users")
            .doc(user)
            .onSnapshot(doc => {
                this.setState({ user: doc.data() });
            });
            
           // const currentUser = firebase.auth().currentUser.uid;
       
           const events =  Fire.shared.firestore.collection('memories')
           events.get().then((querySnapshot) => {
               const tempDoc = querySnapshot.docs.map((doc) => {
                 return { id: doc.id, ...doc.data()
               
               }
                 
               })
               this.setState({tempDoc});
 
             })

    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    renderPost = post => {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.feedItem}>
            <Image source={
               post.image
                ? { uri: post.image
                }
                : require("../assets/tempAvatar.jpg")
            } style={styles.avatarMini}  resizeMode="cover" />
                <View style={{ flex: 1 }}>


                    <View style={{ flexDirection: "row", justifyContent: "space-between", alignItems: "center" }}>
                        <View>

                        <TouchableOpacity
                          underlayColor='#fff'
                          onPress={() =>
                              navigate('memoryMain', 
                             { name: 'Brent' }
                             )
                         }
                          >

                            <Text style={styles.name}>{post.textName} {post.textlastName}  </Text>
                            <Text style={styles.timestamp}>{post.textBirth} - {post.textPassing}  </Text>

{/*                   
             <Text style={styles.timestamp}>{moment(post.timestamp).fromNow()}</Text>
        */}
        </TouchableOpacity>
                        </View>

                        <Ionicons name="ios-more" size={24} color="#73788B" />
                    </View>
                    <Text style={styles.post}>{post.textDescription}</Text>
                   
                    <View style={{ flexDirection: "row" }}>
                        <Ionicons name="ios-heart-empty" size={24} color="#73788B" style={{ marginRight: 16 }} />
                        <Ionicons name="ios-chatboxes" size={24} color="#73788B" />
                    </View>
                </View>
            </View>
        );
    };

    render() {
        const { navigate } = this.props.navigation;

        return (
            <View style={styles.container}>
            
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

         
                <View style={{ marginTop: 10, alignItems: "center"}}>
                    <View style={styles.avatarContainer}>
                        <Image
                            source={
                                this.state.user.avatar
                                    ? { uri: this.state.user.avatar }
                                    : require("../assets/tempAvatar.jpg")
                            }
                            style={styles.avatar}
                        />
                    </View>
                    <Text style={styles.name}>{this.state.user.name}</Text>

                    <Entypo name="open-book" size={24} color="black" style={{paddingTop:20}}/>
                    <Text >My Diary</Text>

                  
                </View>


                <TouchableOpacity
                style={styles.submit}
              //  onPress={() => this.submitSuggestion(this.props)}
                underlayColor='#fff'
                onPress={() =>
                    navigate('createMemory')}
                >

                  <Text style={styles.submitText}>
            <Entypo name="add-user" size={20} />
            <Text> </Text>
                Create a Profile for your loved one 
                                      </Text>
              </TouchableOpacity>



                <View style={styles.statsContainer}>


                <TouchableOpacity
                >

                <View style={styles.stat}>
                    <Text style={styles.statAmount}>Following</Text>

                </View>
                </TouchableOpacity>

                   

                    <TouchableOpacity
                    onPress = {this.getMarkers}>
                
                    <View style={styles.stat}>
                        <Text style={styles.statAmount}>My Memories</Text>

                    </View>
                    </TouchableOpacity>


                </View>



               
                <FlatList
                style={styles.feed}
                data={this.state.tempDoc}
                renderItem={({ item }) => this.renderPost(item)}
                keyExtractor={item => item.id}
            >
      
            
            </FlatList>  


                <Text style={styles.statTitle}>Find memories and keep in touch</Text>

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,

        flex: 1
    },
    topBar: {

    flexDirection: 'row',


    },
    
    feed: {
        marginHorizontal: 16
    },
    feedItem: {
        backgroundColor: "#FFF",
        borderRadius: 5,
        padding: 8,
        flexDirection: "row",
        marginVertical: 8
    },
    searchSection: {
        flex: 1,
        flexDirection: 'row',
        borderRadius:20,
        backgroundColor: '#FFFFFF',
        marginRight:5



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
    profile: {
        marginTop: 20,
        alignItems: "center"
    },
    avatarContainer: {

    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68
    },
    avatarMini: {
        width: 80,
        height: 80,
        borderRadius: 18,
        marginRight: 16
    },
    name: {
        marginTop: 24,
        fontSize: 16,
        fontWeight: "600"
    },
    timestamp: {
        fontSize: 11,
        color: "#C4C6CE",
        marginTop: 4
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "center",
        alignContent: "center"
    },
    postImage: {
        width: undefined,
        height: 150,
        borderRadius: 5,
        marginVertical: 16
    },
    stat: {
        padding:10,
        width:120,
        borderWidth:1,
        borderColor:"black",
        borderRadius:30,
        margin:10,
        backgroundColor:"#F39C12"
    },

    statAmount: {
        color:'black',
        fontSize: 15,
        fontWeight: "300",
        textAlign:"center"

    },
    statTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4,
        textAlign: 'center'
        
    },
    submit:{
        marginRight:30,
        marginLeft:30,
        marginTop:10,
        paddingTop:20,
        paddingBottom:20,
        backgroundColor:'#2a9d8f',
        borderRadius:30,
        borderWidth: 1,
        borderColor: '#fff'
      },
      submitText:{
          color:'#fff',
          textAlign:'center',
      },
  
});