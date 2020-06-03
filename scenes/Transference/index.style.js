import { StyleSheet } from 'react-native'
import styled from "styled-components";

export const styles = StyleSheet.create({
  contactItem: {
    height: 60,
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  avatarIcon: { 
    marginRight: 10, 
    borderWidth: 1,
    backgroundColor: "#FFF",
  }
})

export const Container = styled.View`
  height: 100%;
  margin-top: 5px;
  padding-top: 10px;
  margin-bottom: 25px;
  flex-direction: ${props => props.direction ? props.direction : "column"};
  background-color: #fff;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`