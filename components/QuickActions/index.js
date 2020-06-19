import React, { useEffect, useState } from 'react'
import { View, ScrollView, ImageBackground, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import { Text, withTheme } from 'react-native-paper';

/* OWN COMPONENTS */



function QuickActions(props) {
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 10, alignItems: 'center', borderRadius: 15, width: '100%',  zIndex: 8, paddingHorizontal: 10, paddingVertical: 20, justifyContent: 'center', marginBottom: 10, minHeight: 90}}>
      <TouchableWithoutFeedback  onPress={() => {}}>
        <View style={{justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
          <View style={styles.circleQuick}>
            <Image source={require('../../assets/solicitardinero.png')}/>
          </View>      
          <Text style={styles.textQuick}>
            SOLICITAR{"\n"}DINERO
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => props.navigation.navigate("CashIn")}>
        <View style={{justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
          <View style={styles.circleQuick}>
            <Image  source={require('../../assets/ultimosmovimientos.png')}/>
          </View>      
          <Text style={styles.textQuick}>
            ÚLTIMOS{"\n"}MOVIMIENTOS
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => {}}>
        <View style={{justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
          <View style={styles.circleQuick}>
            <Image  source={require('../../assets/misvisas.png')}/>
          </View>      
          <Text style={styles.textQuick}>
            MIS VISA
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
export default withTheme(QuickActions)

const styles = StyleSheet.create({
 circleQuick: {
  width: 50,
  paddingHorizontal: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 50
 },
 textQuick: {
  marginTop: 10,
  fontSize: 12,
  color: 'white',
  textAlign: 'center'
 }
});