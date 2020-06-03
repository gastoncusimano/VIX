import _ from 'lodash'
import React from 'react'
import { TextInput, View, Image } from 'react-native'
import * as Animatable from 'react-native-animatable'
import { Appbar, Text, withTheme, Title, Button } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient';


/* STYLES */
import { styles, Container } from './index.style'
/* STYLES */

class Result extends React.Component {
  state = {
    ammount: "",
    reason: "",
  }
  onChange = (value, fieldName) => this.setState({ ...this.state, [fieldName]: value })
  handleViewRef = ref => this.view = ref
  bounce = () => this.view.bounceIn(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
  
  render() {
    const { navigation, theme: { colors }, route: { params } } = this.props
    const reset = () => {
        return navigation.reset({
          index: 0,
          routes: [{ name: 'Home'}]
        })
      }
      const { item }  = this.props.route.params
    
    return(
      <>
      <LinearGradient 
        colors={['#FF6F1F', '#F60000']} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header  style={{ elevation: 0, backgroundColor: "#00000000" }} >
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 20, paddingLeft:'30%' }} title="Pagos" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        style={{flex: 1}}
        start={[1, .6]} 
        end={[0, 0.6]} 
        colors={['#FF6F1F', '#F60000']} 
      >
        <View style={styles.containerScroll}>
          <Text style={{color: '#FF6F1F', fontWeight: 'bold', paddingLeft: 18,marginTop: 20, fontSize: 22}}>{item.name}</Text>
          <Text style={{color: 'black', opacity: 0.4, paddingLeft: 18, fontSize: 12}}>{item.type}</Text>
          <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: -40 }}>
            <Image style={{ height: 100, width: 100, marginBottom: 20 }} source={require("../../assets/cross.png")} />
            <Title style={{ color: colors.darkText, textAlign: "center" }} >Transacción Fallida!</Title> 
            </View>
            <View style={{
             width: '85%',
             position: 'absolute',
             bottom: 20,
             textAlign: 'center',
             alignItems: 'center',
             alignSelf:'center',
             color: 'white'
          }}>
            <Button
              mode="contained"
              onPress={() => reset()}
              theme={{ colors: { primary: colors.accent } }}
              style={{ width: "94%", marginHorizontal: 10}}
              labelStyle={{ color: colors.text }}>
                Volver
              </Button>
          </View>
            
        </View>
        </LinearGradient>
      </>
    )
  }
} 

export default withTheme(Result)
