import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { GRAY_LIGHT, WHITE } from '../../../styles/colors'

export const styles = StyleSheet.create({
  listItem: {
    padding: 15,
    marginBottom: 1,
    backgroundColor: GRAY_LIGHT,
  },
  rippleButtom: {
    width: "100%",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 30,
    backgroundColor: WHITE,
  },
  paragraph: { marginVertical: 0 },
  rowContainer: {
    marginBottom: 10,
    flexDirection: "row", 
  }
})

export const Container = styled.View`
  width: 100%;
  align-items: center;
  flex-direction: ${props => props.direction ? props.direction : "column"};
  background-color: ${props => props.bg ? props.bg : '#fff'};
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`