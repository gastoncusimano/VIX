import React from 'react'
import PropTypes from 'prop-types'
import { View, Text  } from 'react-native'
import { Title, Paragraph} from 'react-native-paper'
import * as Animatable from 'react-native-animatable'
import NumberFormat from 'react-number-format';

import {AntDesign} from '@expo/vector-icons'
/* STYLES */
import { styles, FilledSquare, Amount } from './index.style'
/* STYLES */

const ActivityItem = ({ status, value, title, description, date }) => {
  const name = status === "more" ? "arrowright" : "arrowleft"
  return (
    <Animatable.View animation="bounceIn" delay={200} style={styles.containerRow}>
      <FilledSquare type={name}>
        <AntDesign name={name} size={22} color={name === 'arrowleft' ? "#f60900" : "#00c767"}/>
      </FilledSquare>
      <View style={{ flex: 1 }} >
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.paragraph} >{description}</Paragraph>
      </View>
      <View style={{alignItems: "flex-end"}}>
        <NumberFormat value={value} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale prefix={'$ '} renderText={value => <Amount type={name}>{value}</Amount>} />
        <Paragraph style={styles.paragraph} >{date}</Paragraph>
      </View>
    </Animatable.View>
  )
}

ActivityItem.prototype = {
  data: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
}

export default ActivityItem