import React, { useEffect, useState } from 'react'
import { View, ScrollView, ImageBackground, Image, StyleSheet, TouchableWithoutFeedback} from 'react-native'
import { Text, withTheme } from 'react-native-paper';

/* OWN COMPONENTS */



function QuickActions(props) {
  return (
    <View style={{flexDirection: 'row', marginHorizontal: 20, backgroundColor: '#333', borderRadius: 15, marginTop: -35, elevation: 3, zIndex: 8, paddingHorizontal: 10, paddingVertical: 20, justifyContent: 'center', marginBottom: 10, minHeight: 90}}>
      <TouchableWithoutFeedback  onPress={() => props.navigation.navigate("Transference")}>
        <View style={{justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
          <View style={styles.circleQuick}>
            <Image source={require('../../assets/icons/transferir.png')}/>
          </View>      
          <Text style={styles.textQuick}>
            Transferir
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => props.navigation.navigate("CashIn")}>
        <View style={{justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
          <View style={styles.circleQuick}>
            <Image  source={require('../../assets/icons/cargar_dinero.png')}/>
          </View>      
          <Text style={styles.textQuick}>
            Cargar Dinero
          </Text>
        </View>
      </TouchableWithoutFeedback>
      <TouchableWithoutFeedback onPress={() => props.navigation.navigate("Payments")}>
        <View style={{justifyContent: 'center', alignItems: 'center', flexGrow: 1}}>
          <View style={styles.circleQuick}>
            <Image  source={require('../../assets/icons/pagos.png')}/>
          </View>      
          <Text style={styles.textQuick}>
            Pagos
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </View>
  )
}
export default withTheme(QuickActions)

const styles = StyleSheet.create({
 circleQuick: {
  backgroundColor: '#f60900',
  width: 50,
  height: 50,
  alignItems: 'center',
  justifyContent: 'center',
  borderRadius: 50
 },
 textQuick: {
  marginTop: 10,
  fontSize: 12,
  color: 'white'
 }
});