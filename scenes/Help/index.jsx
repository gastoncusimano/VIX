import React from 'react'
import { Appbar } from 'react-native-paper'
import { Container } from './index.style'
import { LinearGradient } from 'expo-linear-gradient'
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../../styles/colors'

export default function index({ navigation }) {
  return (
    <>
      <LinearGradient 
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }} >
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, alignSelf: 'center', marginLeft: '-20%' }} title="Ayuda" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
      >
        <Container>
        </Container>
      </LinearGradient> 
    </>
  )
}