import styled from 'styled-components'
import { StyleSheet } from "react-native"
import { PRIMARY, SECONDARY, BLACK, BLACK_LIGHT } from '../../styles/colors'

export const styles = StyleSheet.create({
  gradient: {
    flex: 1,
  },
  logo: { 
    width: 180, 
    height: 180, 
    alignSelf: "center",
    resizeMode: "contain", 
  },
  phoneNumberTitle: { 
    color: SECONDARY, 
    fontSize: 26, 
    paddingVertical: 20,
  },
  root: { paddingVertical: 20 },
  title: {textAlign: 'center', fontSize: 30},
  codeFiledRoot: {marginTop: 20},
  cell: {
    width: 40,
    height: 40,
    fontSize: 24,
    textAlign: 'center',
    lineHeight: 38,
    borderColor: BLACK_LIGHT,
    borderBottomWidth: 3,
  },
  focusCell: { borderColor: SECONDARY },
})

export const Container = styled.View`
  flex: 1;
  padding: 20px;
`

export const Form = styled.View`

`