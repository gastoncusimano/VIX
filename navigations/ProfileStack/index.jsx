import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'

/* OWN COMPONENTS */
import Profile from '../../scenes/Profile'
import Camera from '../../scenes/Camera'
import PersonalData from '../../scenes/Profile/PersonalData'
/* OWN COMPONENTS */

const Stack = createStackNavigator()


export default function(props) {
  return(
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      headerMode="screen"
      initialRouteName="Profile"
    >
      <Stack.Screen name="Camera" component={Camera}/>
      <Stack.Screen name="Profile" component={Profile}/>
      <Stack.Screen name="PersonalData" component={PersonalData}/>
    </Stack.Navigator>
  )
}