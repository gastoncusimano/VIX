import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import { Title, Paragraph } from 'react-native-paper'
import * as Animatable from 'react-native-animatable'

/* STYLES */
import { styles, FilledSquare, Amount, Icon } from './index.style'
/* STYLES */

const ActivityItem = ({ status, value, title, description, date }) => {
  const type = status === "more" ? "positive" : "negative"
  return (
    <Animatable.View animation="bounceIn" delay={200} style={styles.containerRow}>
      <FilledSquare type={type}>
        <Icon type={type}>{type === "positive" ? "+" : "-"}</Icon>
      </FilledSquare>
      <View style={{ flex: 1 }} >
        <Title style={styles.title}>{title}</Title>
        <Paragraph style={styles.paragraph} >{description}</Paragraph>
      </View>
      <View>
        <Amount type={type}>{`${value}$`}</Amount>
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