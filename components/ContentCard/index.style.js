import styled from 'styled-components'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  headerTitle: {
    color: "#333", 
    fontWeight: "bold",
  },
  card: {
    width: "100%",
    elevation: 4,
    borderRadius: 4,
    marginVertical: 20,
  }
})

export const Card = styled.View`
  width: 100%;
  margin: 20px 0;
  overflow: hidden;
  border-radius: 10px;
  background-color: #FFF;
`
export const Header = styled.View`
  padding: 10px;
  border-color: rgba(0,0,0,.05);
  border-bottom-width: 1px;
`

export const Footer = styled.TouchableHighlight`
  padding: 10px;
  border-color: rgba(0,0,0,.05);
  border-top-width: 1px;
`