import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';

/* OWN COMPONENTS */
import Sms from '../../scenes/Login'
import Login from '../../scenes/Login/login'
import SignUp from '../../scenes/SignUp'
import Confirmation from '../../scenes/Login/Confirmation'
import Verification from '../../scenes/Login/Verification'
import CountryOptions from '../../scenes/Login/CountryOptions'
/* OWN COMPONENTS END */


const Stack = createStackNavigator();

export default function StackNavigation() {
  return (
    <Stack.Navigator headerMode="none" >
      <Stack.Screen
        name="Sms"
        component={Sms}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="Login"
        component={Login}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="CountryOptions"
        component={CountryOptions}
      />
      <Stack.Screen
        name="Confirmation"
        component={Confirmation}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="Verification"
        component={Verification}
        options={{ animationEnabled: false }}
      />
      <Stack.Screen
        name="SignUp"
        component={SignUp}
        options={{ animationEnabled: false }}
      />
    </Stack.Navigator>
  );
};