import styled from 'styled-components'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  searchInput: {
    zIndex: 10,
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: "#F7F7F7",
    marginVertical: 18,
    marginHorizontal: 15,
  },
  containerScroll: {
    borderTopEndRadius: 10,
    borderTopStartRadius: 10,
    marginTop: 5,
    backgroundColor: "#FFF",
    height: "100%" 
  },
  footerBtn: {
    width: '80%',
    position: 'absolute',
    bottom: 120,
    textAlign: 'center',
    alignItems: 'center',
    alignSelf:'center',
    color: 'white'
  },
  item: {
    flexDirection: 'row',
    padding: 20,
  },
  title: {
    fontSize: 18,
    color: 'black',
  },
  wrappInputMoney: {
    marginTop: 90,
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
  },
  money: {
    fontSize: 70
  },
  symbol: {
    fontSize: 30,
    marginBottom: 15
  },
})

export const Container = styled.SafeAreaView`
  flex: 1;
  width: 100%;
  padding: ${props => props.fluid ? "0 15px" : "20px 15px"};
  flex-direction: ${props => props.direction ? props.direction : "column"}
`