import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

/* OWN COMPONENTS */
import Result from '../../scenes/Transference/Result'
import NoFound from '../../scenes/Transference/NoFound'
import Transfer from '../../scenes/Transference'
import SendMoney from '../../scenes/Transference/Send/Send'
import FormDestinyCard from '../../scenes/Transference/FormDestinyCard'
/* OWN COMPONENTS */

const Stack = createStackNavigator()

export default function(props) {
  return(
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{ headerShown: false }}
      initialRouteName="Transfer"
    >
      <Stack.Screen name="Result" component={Result} />
      <Stack.Screen name="NoFound"  component={NoFound} />
      <Stack.Screen name="Transfer" component={Transfer} />
      <Stack.Screen name="SendMoney" component={SendMoney} />
      <Stack.Screen name="DestinyCard" component={FormDestinyCard} />
    </Stack.Navigator>
  )
}