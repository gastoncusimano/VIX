import styled from 'styled-components'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  wrappInputMoney: {
    marginLeft: -15,
    paddingVertical: 30,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  money: {
    fontSize: 70
  },
  symbol: {
    fontSize: 30,
  },
  avatarIcon: { 
    marginRight: 10, 
    borderWidth: 1,
    backgroundColor: "#FFF",
  },
  wrapper: {
    flex: 1,
    marginTop: 5,
    paddingBottom: 10,
    backgroundColor: "#FFF",
    borderTopEndRadius: 10, 
    borderTopStartRadius: 10,
  }
})

export const Container = styled.SafeAreaView`
  flex: 1;  
  padding: 20px 15px;
  justify-content: center;
  flex-direction: ${props => props.direction ? props.direction : "column"}
`