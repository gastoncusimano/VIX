import { StyleSheet } from 'react-native'
import { BLACK_DARK } from '../../../styles/colors'

export const styles = StyleSheet.create({
  listItem: {
    padding: 10,
    alignItems: "center",
    flexDirection: "row",
  },
  activeItem: {
    borderLeftWidth: 4,
    borderLeftColor: BLACK_DARK,
  },
  wrapper: { 
    marginTop: 5, 
    height: "100%", 
    backgroundColor: "#FFF", 
    borderTopEndRadius: 10, 
    borderTopStartRadius: 10, 
  }
})