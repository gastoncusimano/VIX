import React from 'react'
import { styles } from './index.style'
import { View, Text } from 'react-native'

function ContactCard({firstName, lastName, reference}) {
  return (
    <View style={styles.contactCard}>
      <View style={styles.avatar}>
        <Text style={styles.initials}>{`${firstName.charAt()}${lastName.charAt()}`}</Text>
      </View>
      <View style={{ flex: 1 }} >
        <Text numberOfLines={1} style={{ fontSize: 16 }}>{`${firstName} ${lastName}`}</Text>
        {reference && <Text numberOfLines={1} style={{ fontSize: 16 }}>{`Ref: ${reference}`}</Text>}
      </View>
    </View>
  )
}

export default ContactCard
