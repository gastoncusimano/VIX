import React from 'react'
import { styles } from './index.style'
import { View, Text } from 'react-native'

function ContactCard({firstName, lastName}) {
  return (
    <View style={styles.contactCard}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{`${firstName.charAt()}${lastName.charAt()}`}</Text>
      </View>
      <Text style={{ fontSize: 16 }}>{`${firstName} ${lastName}`}</Text>
    </View>
  )
}

export default ContactCard
