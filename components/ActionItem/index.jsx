import React from 'react'
import PropTypes from 'prop-types'
import * as Animatable from 'react-native-animatable'
import Ionicon from 'react-native-vector-icons/Ionicons'
import Icon from 'react-native-vector-icons/FontAwesome5'
import { Text, Title, withTheme } from 'react-native-paper'
import { View, TouchableOpacity } from 'react-native'

/* STYLES */
import { styles } from './index.style'
/* STYLES END*/


const ActionItem = (props) => {
  const { theme } = props

  return (
    <TouchableOpacity onPress={props.onPress} activeOpacity={0.6} >
      <Animatable.View animation="bounceIn" delay={props.i * 10} style={styles.content}>
          <View style={styles.iconContent}><Icon color={theme.colors.accent} size={20} name={props.iconName}/></View>
          <View style={{ flex: 1 }} >
            <Title style={{ color: theme.colors.darkText }} >{props.title}</Title>
            <Text style={{ color: theme.colors.subtitleText }} >{props.subtitle}</Text>
          </View>
          <Ionicon name="ios-arrow-forward" size={20} color="rgba(0,0,0,.15)" />
      </Animatable.View>
    </TouchableOpacity>
  )
}

ActionItem.prototype = {
  title: PropTypes.string.isRequired,
  onPress: PropTypes.func,
  subtitle: PropTypes.string.isRequired,
  iconName: PropTypes.string,
  iconShown: PropTypes.bool,
}

export default withTheme(ActionItem)
