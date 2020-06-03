import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { GRAY_LIGHT } from '../../../styles/colors'

export const styles = StyleSheet.create({
  info: {
    fontSize: 14,
    textAlign: "center",
    marginBottom: 10,
  },
  boxCode: {
    padding: 15,
    marginBottom: 10,
    borderRadius: 4,
    backgroundColor: GRAY_LIGHT,
  },
  code: {
    fontSize: 24,
    fontWeight: "bold"
  },
  payIconContainer: {
    flex: 1,
    flexDirection: "row", 
    justifyContent: "space-between", 
  },
  dialogPayIcon: {
    width: 60, 
    height: 40, 
    resizeMode: "contain"
  },
  payIcon: { 
    width: 50, 
    height: 30, 
    resizeMode: "contain" 
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
