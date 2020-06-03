import _ from 'lodash'
import React from 'react'
import { TextInput, View, Image, TouchableWithoutFeedback } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import { Appbar, Text, withTheme, TouchableRipple, Button } from 'react-native-paper'


/* STYLES */
import { styles, Container } from './index.style'
/* STYLES */

class Payments extends React.Component {
  state = {
  }
  render() {
    const { navigation } = this.props
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
          start={[1, .6]} 
          end={[0, 0.6]} 
          colors={['#FF6F1F', '#F60000']} 
        >
          <View style={styles.containerScroll}>
            {item.debt ? 
                <View style={{alignItems: 'center', marginTop: 60, flex: 1, maxHeight: '100%'}}>
                    <Text style={{color: 'black', fontSize: 18}}>Número de cuenta</Text>
                    <TextInput
                        placeholderTextColor="#FF6F1F"
                        style={{ height: 25, borderColor: '#FF6F1F',borderBottomWidth: 1, width:'80%', textAlign: 'center', paddingHorizontal: 10, color: "#FF6F1F", marginTop: 30}}
                        onChangeText={text => this.setState({...this.state, q: text})}
                        placeholder={"xxxxxxxxxxx"}
                        keyboardType='number-pad'
                        value={this.state.q}
                    />
                    <Text style={{color: '#00000055', fontSize: 12, marginTop: 10}}>Tiene hasta 11 dígitos</Text>
                    <TouchableRipple onPress={() => alert("Proximamente")}>
                        <Text style={{color: '#00000055', fontSize: 16, marginTop: 30}}>¿Dónde encontrarlo?</Text>
                    </TouchableRipple>
                    <View style={styles.footerBtn}>
                        <Button
                            mode="contained"
                            onPress={() => navigation.push("AmountPayment", {item: item})}
                            theme={{ colors: { primary:  '#FF6F1F'} }}
                            style={{ width: "100%", alignSelf: "flex-end", borderRadius: 6 }}
                            labelStyle={{ color: 'white' }}>
                                Buscar
                        </Button>
                    </View>
                </View>
            :
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, maxHeight: '55%'}}>
                  <Image source={require('../../assets/OK.png')} style={{width: 80, height: 80}} />
                  <Text style={{color: 'black', paddingTop: 30, fontSize: 20}}>No hay deudas</Text>
              </View>
            }
          </View>
        </LinearGradient>
      
      </>
    )
  }
} 


export default withTheme(Payments)
