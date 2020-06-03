import styled from 'styled-components'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  appbar: {
    backgroundColor: "#B993D6"
  },
  circleAvatar: {
    position: 'absolute',
    top: 45,
    backgroundColor: 'rgba(0,0,0, .15)',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 50
  },
  circleTextAvatar: {
    opacity: 1,
    fontSize: 16,
    color: 'white',
    fontWeight:'bold'
  },
  welcomeText: {
    position: 'absolute',
    top: 55,
    left: 60
  },
  circleBell: {
    position: 'absolute',
    top: 45,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, .3)',
    width: 40,
    height: 40,
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
