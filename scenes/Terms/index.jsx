import React, { useState, useEffect } from 'react'
import { View } from 'react-native'
import { Container } from './index.style'
import { LinearGradient } from 'expo-linear-gradient'
import { PRIMARY_DARK, PRIMARY_LIGHT, SECONDARY } from '../../styles/colors'
import { Appbar, Text, ActivityIndicator, withTheme } from 'react-native-paper'

function index({ navigation, theme: colors }) {
  const [state, setState] = useState({ data: null, loading: false, error: null })

  const fetchData = () => {
    fetch(`https://api.ityou.works/vix/tos`)
      .then((res) => res.json())
      .then((res) => {
        setState({ ...state, loading: false, data: res.data[0].tos })
      })
      .catch((error) => {
        setState({ ...state, loading: false, error })
      })
  }

  useEffect(() => {
    setState({ ...state, loading: true })
    fetchData()
  },[])

  return (
    <>
      <LinearGradient 
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }} >
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, alignSelf: 'center', marginLeft: '-20%' }} title="Terminos y Condiciones" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
      >
        <Container>
          <View style={{ paddingHorizontal: 20 }} >
            {state.loading 
              ? <ActivityIndicator animating={true} color={SECONDARY} />
              : <Text style={{ color: colors.darkText }} >{state.data}</Text>
            }
          </View>
        </Container>
      </LinearGradient> 
    </>
  )
}

export default withTheme(index)

