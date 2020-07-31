import React ,{Component} from "react";
import { View,Alert, Text, StyleSheet, TextInput,Keyboard, TouchableWithoutFeedback,Image } from "react-native";
import Fire from "../Fire";
import { TouchableOpacity } from "react-native-gesture-handler";
import { Octicons, Entypo,AntDesign,Ionicons } from '@expo/vector-icons'; 
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import RadioForm, {RadioButton, RadioButtonInput, RadioButtonLabel} from 'react-native-simple-radio-button';
import * as ImagePicker from 'expo-image-picker'
import DatePicker from 'react-native-datepicker';

const firebase=require('firebase')
require('firebase/firestore')
import * as Permissions from 'expo-permissions'
import Constants from 'expo-constants'


export default class CreateMemory extends Component {
    state = {
       
        textName:'',
        textlastName:'',

        textBirth:'',
        textPassing:'',
        textDescription:'',
        privacy:true,
        imageMemory:null,
        user: {},
        nameError:null,
        lastNameError:null,
        birthError:null,
        passingError:null,
        textDescriptionError:null,
        dateError:null

        
    }

    unsubscribe = null;

    componentDidMount() {
        const user=this.props.uid || Fire.shared.uid
        this.unsubscribe=Fire.shared.firestore.collection('memories').doc(user).onSnapshot(doc=>{
          this.setState({user:doc.data()})
        })
    }
    
    componentWillUnmount() {
        this.unsubscribe();
    }

    getPhotoPermission=async ()=>{
        if(Constants.platform.ios){
          const {status}=await Permissions.askAsync(Permissions.CAMERA_ROLL)
          if(status!='granted'){
            alert('We need permission to access your camera roll')
          }
          else{
            const granted=await PermissionsAndroid.request(
              PermissionsAndroid.PERMISSIONS.CAMERA_ROLL,{
                title:"Social App Camera Permission",
                message:"Social App needs access to your camera",
                buttonNeutral: "Ask Me Later",
                buttonNegative: "Cancel",
                buttonPositive: "OK"
              }
            )
          }
          if(granted!==PermissionsAndroid.RESULTS.GRANTED){
            alert('We need permission to access your camera roll')
          
          }
        }
      }

      handleMemory=()=>{
        Fire.shared.addMemory({
            textName:this.state.textName.trim(),
            textlastName:this.state.textlastName.trim(),
            textBirth:this.state.textBirth,
            textPassing:this.state.textPassing,
            textDescription:this.state.textDescription.trim(),
            privacy:this.state.privacy,
            localUri:this.state.imageMemory
        })
            .then(ref=>{
                
              this.setState({
                textName:'',
                textlastName:'',
                textBirth:'',
                textPassing:'',
                textDescription:'',
                privacy:false,
                imageMemory:null,
                })

              this.props.navigation.goBack();
              route.params.onSelect({ selected: true });

            }).catch(error=>{
              alert(error.message)
            })
      }

      pickImage=async()=>{
        let result=await ImagePicker.launchImageLibraryAsync({
          mediaTypes:ImagePicker.MediaTypeOptions.Images,
        })
        if(!result.cancelled){
          this.setState({imageMemory:result.uri})
        }
      };

   
      
       dateFunc =()=>{
           if (this.state.textBirth) return this.state.textBirth;
           else return "1/1/1900";
       }

    render() {
        const { navigate } = this.props.navigation;
 

        return (

            
    <KeyboardAwareScrollView>
    <TouchableWithoutFeedback 
    onPress={() => Keyboard.dismiss()}> 
            <View style={styles.container}>
            
      <View style={styles.topBar}>
      <TouchableOpacity
      //  onPress={() => this.submitSuggestion(this.props)}
        underlayColor='#fff'
        onPress={() =>
            navigate('profileScreen')}
        >
        <View style={{flex: 1,
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'stretch',
            alignSelf: 'stretch',
            borderRadius: 5,
            padding: 5,
            marginTop: 5,
            marginBottom: 5,}}>

        <AntDesign name="back" size={34} color="#2a9d8f"
       />
        </View>

</TouchableOpacity>

</View>
       
        
<View style={{justifyContent:"center", marginTop:-40}}>
        <Text style={styles.name}>Create Memory</Text>

</View>

                <View style={{ marginTop: 5, alignItems:'center'}}>
              
                    <TouchableOpacity style={styles.photo} onPress={this.pickImage}>
                    <Image source=
                    {
                        this.state.imageMemory
                            ? { uri: this.state.imageMemory }
                            : require("../assets/tempAvatar.jpg")
                    }
                    style={styles.avatar}/>
                    <Text style={styles.add}>{<AntDesign name="edit"/>} Edit Profile Picture </Text>

                  </TouchableOpacity>


                  
                </View>
<View style={{ marginRight:25,
    marginLeft:25,}}>
                {!!this.state.nameError && (
                    <Text style={{ color: "red" }}>{this.state.nameError}</Text>
                  )}

                <TextInput placeholder= "First Name:" 
                
                style={styles.input} onChangeText = {(textName) => {this.setState({textName}); 
                this.setState(() => ({ nameError: "" }));
                        
               
                }
            } />


                {!!this.state.lastNameError && (
                    <Text style={{ color: "red" }}>{this.state.lastNameError}</Text>
                  )}
                <TextInput placeholder= "Last Name:" 
                
                style={styles.input} onChangeText={textlastName=>{this.setState({textlastName});
                this.setState(() => ({ lastNameError: "" }));

                }
            }/>
            {/*    {!!this.state.nameError && (
                  )}
            */}
                <View style={{ flex: 1,
                justifyContent:'center',
                flexDirection: 'row',
                alignItems: "center",


                padding:10}} >
                
                <DatePicker
          style={{width: 160}}
          date={this.state.textBirth} //initial date from state
          mode="date" //The enum of date, datetime and time
          placeholder=   {!!this.state.birthError? (
            <Text style={{ color: "red" }}>{this.state.birthError}</Text>
          ): "Date Of Birth"}
          format="DD/MM/YYYY"
          minDate="01-01-1900"
          maxDate={new Date()}
          confirmBtnText="Confirm"
          cancelBtnText="Cancel"
          customStyles={{
            dateIcon: {
              position: 'absolute',
              left: 0,
              top: 4,
              marginLeft: 0
            },
            dateInput: {
              marginLeft: 30,
              borderWidth:0

            }
          }}
          onDateChange={(date) => {this.setState({textBirth: date})}}

        />
     

        <Octicons name="dash" size={24} color="black" style={{marginLeft:10}}/>
        <DatePicker
        style={{width: 160}}
        date={this.state.textPassing} //initial date from state
        mode="date" //The enum of date, datetime and time
        placeholder= {!!this.state.passingError? (
            <Text style={{ color: "red" }}>{this.state.passingError}</Text>
          ): "Date Of Passing"}
        format="DD/MM/YYYY"
        minDate={this.dateFunc() }
        maxDate={new Date()}
        confirmBtnText="Confirm"
        cancelBtnText="Cancel"
        customStyles={{
          dateIcon: {
      	  display:'none'

          },
          dateInput: {
            marginLeft: 30,

            borderWidth:0
            

          } 
        }}
        onDateChange={(date) => {this.setState({textPassing: date})
        this.setState(() => ({ textDescriptionError: "" }));
    }
    }

      />
      
        </View>
        {!!this.state.dateError && (
            <Text style={{ color: "red" }}>{this.state.dateError}</Text>
          )}
               {/*
             <TextInput placeholder="Date of Birth:" style={styles.input} onChangeText={textBirth=>this.setState({textBirth})} />
                <TextInput placeholder="Date of Passing:" style={styles.input} onChangeText={textPassing=>this.setState({textPassing})} />
            */}

                <Text style={styles.add}>{<AntDesign name="pluscircle"/>} Add More Information </Text>

            {!!this.state.textDescriptionError && (
                <Text style={{ color: "red" }}>{this.state.textDescriptionError}</Text>
              )}
                <TextInput
                multiline={true}
                numberOfLines={4}
                value={this.state.text}
                style={styles.input}
                placeholder="Short description"
                onChangeText={textDescription=>{this.setState({textDescription});
                this.setState(() => ({ textDescriptionError: "" }));
            }
        }
                />

                <View style={styles.radio}>
                <RadioForm
                radio_props=
            {[
                {label: 'Any one can share on', value: true},
                {label: 'page Only I can upload', value: false}
            ]}
                initial={0}
                onPress={(value) => {this.setState({privacy:value})}}

              />
              </View>


                <TouchableOpacity
                style={styles.submit}
              //  onPress={() => this.submitSuggestion(this.props)}
                underlayColor='#fff'
                onPress={() => {   
                    
        if(this.state.textName.trim() === "" || this.state.textBirth > this.state.textPassing || this.state.textlastName.trim() === ""  ||  this.state.textBirth.trim() === "" || this.state.textPassing.trim() === "" || this.state.textDescription.trim() === "" )   {         
                if (this.state.textName.trim() === "") {
                    this.setState(() => ({ nameError: "First name is required" }));
                  } 
                  if (this.state.textlastName.trim() === "") {
                    this.setState(() => ({ lastNameError: "Last name is required" }));
                  }
                  
                  if (this.state.textBirth.trim() === "") {
                    this.setState(() => ({ birthError: "Birth Date is required." }));
                  } 
                  
                  if (this.state.textPassing.trim() === "") {
                    this.setState(() => ({ passingError: "Passing Date is required." }));
                  } 

                  if (this.state.textDescription.trim() === "") {
                    this.setState(() => ({ textDescriptionError: "Description text is required." }));
                  } 
                  if (this.state.textBirth > this.state.textPassing) {
                    this.setState(() => ({ dateError: "The date of birth cannot be later than the date of death" }));
                  } else {
                    this.setState(() => ({ dateError: "" }));

                  }


                }  
                else
                   
                {

{                    this.handleMemory()
}                                      }
                }
            }
                >

      

                  <Text style={styles.submitText}>
            <Entypo name="add-user" size={20} />
            <Text> </Text>
                Create  
                                      </Text>
              </TouchableOpacity>


</View>
</View>

            </TouchableWithoutFeedback>
            </KeyboardAwareScrollView>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: 40,
        padding:16,
        flex: 1
    },
    topBar: {
        justifyContent:'flex-end',
    flexDirection: 'row',

 
    },
    radio:{
        marginTop:5,
  
        
    },
    add:{
        marginTop:5,
        color:"#2a9d8f",
        textAlign:"center"
    },
    textArea: {
        height: 150,
        justifyContent: "flex-start"
      },
    input:{
        textAlignVertical:'top',
        borderColor:"#2a9d8f",
        borderWidth:1,
        marginTop:10,
        borderRadius:20,
        backgroundColor: '#FFFFFF',
       
        padding:10

    },


textInputStyle: {
    flex: 1,
    paddingTop: 10,
    paddingRight: 10,
    paddingBottom: 10,
    paddingLeft: 0,
  borderColor: "#2a9d8f",

},
searchIcon: {
    padding: 10,
},
    profile: {
        marginTop: 64,
        alignItems: "center"
    },
    avatarContainer: {
        shadowColor: "#151734",
        shadowRadius: 30,
        shadowOpacity: 0.4
    },
    avatar: {
        width: 136,
        height: 136,
        borderRadius: 68,
        alignItems: "center"

    },
    name: {
        fontSize: 20,
        fontWeight: "800",
        textAlign:"center",
    },
    statsContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 32
    },
    stat: {
        alignItems: "center",
        flex: 1
    },

    statTitle: {
        color: "#C3C5CD",
        fontSize: 12,
        fontWeight: "500",
        marginTop: 4,
        textAlign: 'center'
        
    },
    submit:{
        marginRight:60,
        marginLeft:60,
        marginTop:5,
        paddingTop:10,
        paddingBottom:10,
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