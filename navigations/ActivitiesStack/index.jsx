import React from 'react'
import { Appbar, Avatar } from 'react-native-paper'
import { LinearGradient } from 'expo-linear-gradient'
import { createStackNavigator } from '@react-navigation/stack'

/* OWN COMPONENTS */
import Activities from '../../scenes/Activities'
import Filtros from '../../scenes/Activities/Filters'
import Options from '../../scenes/Activities/Filters/Options'
/* OWN COMPONENTS */

const Stack = createStackNavigator()


export default function(props) {
  return(
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      headerMode="screen"
      initialRouteName="Movimientos"
    >
      <Stack.Screen name="Filtros" component={Filtros}/>
      <Stack.Screen name="Options" component={Options}/>
      <Stack.Screen name="Movimientos" component={Activities}/>
    </Stack.Navigator>
  )
}