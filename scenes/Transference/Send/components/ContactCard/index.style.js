import { StyleSheet } from 'react-native'
import { SECONDARY } from '../../../../../styles/colors'

export const styles = StyleSheet.create({
  contactCard: {
    padding: 10,
    alignItems: 'center',
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#F5F5F5',
    shadowOpacity: .5,
    elevation: 4,
    shadowOffset: {
      height: 2,
      width: 2
    }
  },
  avatar: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderColor: SECONDARY,
    borderWidth: 2,
    marginRight: 20,
    borderRadius: 50,
  },
  initials: {
    color: SECONDARY,
    fontWeight: "bold"
  }
})