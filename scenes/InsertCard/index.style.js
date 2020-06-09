import styled from 'styled-components'
import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
  gradient: { flex: 1 },
  input: { 
    width: "100%", 
    textAlign: "center", 
    borderColor: "rgba(0,0,0,.15)", 
    marginVertical: 20,
    borderBottomWidth: 1, 
  }
})

export const Container = styled.View`
  flex: 1;
  padding: 30px;
  margin-top: 5px;
  background-color: #fff;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`