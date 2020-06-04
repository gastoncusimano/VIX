import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { SECONDARY } from '../../../styles/colors'

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
    paddingVertical: 20,
    backgroundColor: "#FFF",
    borderTopEndRadius: 10, 
    borderTopStartRadius: 10,
  },  
  contactItem: {
    height: 60,
    alignItems: "center",
    marginBottom: 20,
    flexDirection: "row",
    paddingVertical: 5,
  },
  avatarIcon: { 
    marginRight: 10, 
    borderWidth: 1,
    backgroundColor: "#FFF",
  },
  cardContainer: {
    justifyContent: 'flex-end',
  },
  card: {
    padding: 5,
    marginRight: 10,
  },
  btnMore: {
    width: 35,
    height: 35,
    marginBottom: 5,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    backgroundColor: SECONDARY,
  },
  inputMotivo: { 
    width: "100%", 
    textAlign: "center", 
    borderColor: "rgba(0,0,0,.15)", 
    marginVertical: 20,
    borderBottomWidth: 1, 
  }
})

export const Container = styled.SafeAreaView`
  flex: 1;  
  padding: 20px 15px;
  justify-content: center;
  flex-direction: ${props => props.direction ? props.direction : "column"}
`