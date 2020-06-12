import styled from 'styled-components'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "#B993D6"
  },
  welcomeText: {
    position: 'absolute',
    top: 55,
    left: 24
  },
  circleBell: {
    position: 'absolute',
    top: 65,
    right: 22,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  amountCard: {
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25
  },
  arrowCollapsable: {
    justifyContent: 'center',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 35
  }
})
