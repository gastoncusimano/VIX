import styled from 'styled-components'
import { StyleSheet } from 'react-native'

export const FilledSquare = styled.View`
  width: 40px;
  height: 40px;
  align-items: center;
  margin-right: 10px;
  justify-content: center;
  overflow: hidden;
  border-width: 1px;
  border-color: rgba(0,0,0,.15);
  border-radius: 50px;
`

export const Amount = styled.Text`
  color: ${props => props.type === 'arrowleft' ? "#f60900" : "#00c767" };
  font-size: ${props => props.type === 'arrowleft' ? 15 : 17}px;
  font-weight: bold;
  line-height: 30px;
`

export const styles = StyleSheet.create({
  containerRow: { 
    padding: 15,
    alignItems: "center",
    borderColor: "rgba(0,0,0,.05)",
    flexDirection: "row", 
    borderBottomWidth: 1,
  },
  title: {
    color: 'black',
    fontSize: 16,
    marginVertical: 0,
  },
  paragraph: {
    color: "rgba(0,0,0,.3)",
    marginVertical: 0,
    fontSize: 12,
  }
})