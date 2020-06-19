import React from 'react'
import { View, Image, ScrollView} from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Button, withTheme, Text, TouchableRipple } from 'react-native-paper'
/* STYLES */
import { PRIMARY_LIGHT,PRIMARY_DARK, SECONDARY } from '../../styles/colors'
import { Container, styles } from './index.style'
/* STYLES END*/

const ResultScene = ({ theme: { colors }, navigation}) => {
 
  return (
    <>
      <LinearGradient 
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
        <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '23%' }} title="Mis Tarjetas"  />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        style={{ flex: 1 }}
      >
         <View style={styles.wrapper}>
            <ScrollView style={{ paddingHorizontal: 5 }} >
                <TouchableRipple onPress={() => navigation.push('InsertCard')}>
                  <>
                    <View style={{borderRadius: 7, marginTop: 25, marginHorizontal: 20, padding: 20, borderColor: '#ddd', backgroundColor: '#f6f6f6', borderWidth: 1}}>
                      <View style={{borderRadius: 50, height: 50, width: 50, position: 'absolute', top: -10, right: -10, backgroundColor: SECONDARY, zIndex: 30 }}>
                        <Text style={{color: 'white', fontSize: 36, textAlign: 'center'}}>+</Text>
                      </View>
                      <Image source={require('../../assets/ico_vix.png')} style={{width: 60, height: 25}} />
                      <Image source={require('../../assets/chipcard.png')} style={{width: 50, height: 30, marginTop: 20}} />
                      <View style={{paddingTop: 15, paddingHorizontal: 5}}>
                        <Text style={{color: '#ddd', fontSize: 18}}>0000   0000   0000   0000</Text>
                      </View>
                      <View style={{paddingTop: 5,width: '100%'}}>
                        <Text style={{color: '#ddd', fontSize: 15, textAlign: 'right', marginRight: 20}}>00/00</Text>
                      </View>
                      <View style={{paddingTop: 10,width: '100%'}}>
                        <Text style={{color: '#ddd', fontSize: 16}}>JUAN PABLO GUTIERREZ</Text>
                      </View>
                    </View>
                    <Text style={{color:'black', width:'100%', textAlign:'center', paddingTop: 10, fontSize: 16}}>Agregar tarjeta</Text>
                  </>
                </TouchableRipple>
            </ScrollView>
          </View>
      </LinearGradient>
    </>
  )
}

export default withTheme(ResultScene)
