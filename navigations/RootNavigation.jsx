import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { createStackNavigator } from '@react-navigation/stack'
import { Image, ActivityIndicator } from 'react-native'

/* OWN COMPONENTS */
import Login from './LogInStack/LoginNavigation'
import actions from '../redux/Auth/actions'
import AppNavigation from '../components/SideMenu'
/* OWN COMPONENTS */



const Stack = createStackNavigator()

function Root(props) {
  useEffect(() => {
    props.checkSession()
  }, [])

  if(!props.isReady) {
    return (
      <LinearGradient 
        colors={['#F60000', '#FF6F1F']}
        start={[0, 0.6]}
        end={[1, 0.3]}
        style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
      >
        <Image style={{ width: 200, height: 200, resizeMode: 'contain' }}  source={require('../assets/ico_negativo.png')} />
        <ActivityIndicator size="large" color="#FFF" />
      </LinearGradient>
    )
  }
  return(
    <Stack.Navigator  headerMode="none">
      {props.isLoggedIn ? (
        <Stack.Screen
          name="Home"
          options={{ title: '' }}
          component={AppNavigation}
        />
      ) : (
        <Stack.Screen
          name="SignIn"
          component={Login}
          options={{
            title: 'Sign In',
            headerShown: false,
            animationTypeForReplace: !props.isLoggedIn ? 'pop' : 'push'
          }}
        />
      )}
    </Stack.Navigator>
  )
}

export default connect(
  state => ({
    uuid: state.Auth.uuid,
    isReady: state.Auth.isReady,
    fetching: state.Auth.fetching,
    isLoggedIn: state.Auth.idToken !== null,
  }), { checkSession: actions.checkSession }
)(Root)