import { StyleSheet } from 'react-native'
import { WHITE } from '../../styles/colors'

export const style = StyleSheet.create({
  inputWrapper: {
    borderColor: "rgba(255,255,255,.25)",
    marginBottom: 10,
    flexDirection: "row",
    borderBottomWidth: 2,
  },
  inputLeading: {
    paddingVertical: 13,
    paddingHorizontal: 13,
  },
  inputTrailing: {
    paddingVertical: 2,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  inputName: {
    color: "#DADADA",
    marginBottom: 5
  },
  inputContent: {
    flex: 1,
  },
  input: {
    fontSize: 16,
    color: WHITE
  }
})