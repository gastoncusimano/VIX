import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

/* OWN COMPONENTS */
import Cash from '../../scenes/CashIn/Cash'
import CashIn from '../../scenes/CashIn'
import Transfer from '../../scenes/CashIn/Transfer'
import Banks from '../../scenes/CashIn/Transfer/BankSelection'
/* OWN COMPONENTS */

const Stack = createStackNavigator()

export default function(props) {
  return(
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{ headerShown: false }}
      initialRouteName="CashIn"
    >
      <Stack.Screen name="Cash" options={{ title: "Ingreso en efectivo" }} component={Cash} />
      <Stack.Screen name="CashIn" options={{ title: "Elige como ingresar dinero" }} component={CashIn} />
      <Stack.Screen name="Transfer" options={{ title: "Ingreso en transferencia" }} component={Transfer} />
      <Stack.Screen name="Banks" options={{ title: "Ingreso en transferencia" }} component={Banks} />
    </Stack.Navigator>
  )
}