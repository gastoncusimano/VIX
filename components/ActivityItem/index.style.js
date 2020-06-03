import styled from 'styled-components'
import { StyleSheet } from 'react-native'

export const FilledSquare = styled.View`
  width: 40px;
  height: 40px;
  margin-right: 10px;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  border-color: ${props => props.type === 'negative' ? "#EE2E31" : "#8CA6DB"};
  border-width: 1px;
  border-radius: 50px;
  background-color: ${props => props.type === 'negative' ? "rgba(238, 46, 49, .3)" : "rgba(140, 166, 219, .3)"};
`

export const Amount = styled.Text`
  color: ${props => props.type === 'negative' ? "#EE2E31" : "#61E294" };
  font-size: 16px;
  line-height: 30px;
`
export const Icon = styled.Text`
  color: ${props => props.type === 'negative' ? "#EE2E31" : "#8CA6DB"};
  font-size: 18px;
  margin-top: -3px;
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
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 0
  },
  paragraph: {
    color: "rgba(0,0,0,.3)",
    marginVertical: 0
  }
})