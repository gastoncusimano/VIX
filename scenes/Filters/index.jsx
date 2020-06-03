import React from 'react'
import { View, Text } from 'react-native'
import * as Animatable from 'react-native-animatable'

const index = () => {
  return (
    <Animatable.View animation="slideOutUp" >
      <Text>Filtros</Text>
    </Animatable.View>
  )
}

export default index
