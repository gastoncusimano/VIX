
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

/* OWN COMPONENTS */
import MyCards from '../../scenes/MyCards/index'
/* OWN COMPONENTS */

const Stack = createStackNavigator()

export default function(props) {
  return(
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{ headerShown: false }}
      initialRouteName="Cards"
    >
      <Stack.Screen name="Cards" options={{ title: "Mis tarjetas" }} component={MyCards} />
    </Stack.Navigator>
  )
}