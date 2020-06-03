import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

/* OWN COMPONENTS */
import Payments from '../../scenes/Payments'
import BarCodeScanner from '../../scenes/Payments/barcodeScanner'
import ShowPayment from '../../scenes/Payments/showPayment'
import SearchCompany from '../../scenes/Payments/searchCompany'
import FormPayment from '../../scenes/Payments/formPayment'
import AmountPayment from '../../scenes/Payments/amountInput'
import ResultPayment from '../../scenes/Payments/result'

/* OWN COMPONENTS */

const Stack = createStackNavigator()

export default function(props) {
  return(
    <Stack.Navigator
      headerMode="screen"
      screenOptions={{ headerShown: false }}
      initialRouteName="Payments"
    >
      <Stack.Screen name="Payments" options={{ title: "Pagos" }} component={Payments} />
      <Stack.Screen name="Scanner" options={{ title: "Scanner" }} component={BarCodeScanner} />
      <Stack.Screen name="ShowPayment" options={{ title: "ShowPayment" }} component={ShowPayment} />
      <Stack.Screen name="SearchCompany" options={{ title: "SearchCompany", animationEnabled: false }} component={SearchCompany} />
      <Stack.Screen name="FormPayment" options={{ title: "FormPayment"}} component={FormPayment} />
      <Stack.Screen name="AmountPayment" options={{ title: "AmountPayment"}} component={AmountPayment} />
      <Stack.Screen name="ResultPayment" options={{ title: "ResultPayment", animationEnabled: false}} component={ResultPayment} />
    </Stack.Navigator>
  )
}