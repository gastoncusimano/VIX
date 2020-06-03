import React from 'react'
import PropTypes from 'prop-types'
import { View, TouchableWithoutFeedback } from 'react-native'
import {Feather} from '@expo/vector-icons'

import { Card, Header, Footer } from './index.style'
import {Text,  withTheme } from 'react-native-paper'

function CardHomeContent(props) {
  return (
    <View style={{marginHorizontal: 20, backgroundColor: 'white', marginVertical: 20, elevation: 3, borderRadius: 10}}>
      <Header>
        <Text style={{ color: "#333", textAlign: "center", fontWeight: "bold", fontSize: 21 }} >{props.header}</Text>
        {props.withIcon ?
          <TouchableWithoutFeedback onPress={props.onPress} >
            <Feather name="plus" size={24} color='black' style={{position: 'absolute',top: 12.5, right: 15}}/>
          </TouchableWithoutFeedback>
         : null
        }
      </Header>
      <View>
        {props.children}
      </View>
    </View>
  )
}

export default withTheme(CardHomeContent)
