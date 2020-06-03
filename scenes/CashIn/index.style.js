import styled from 'styled-components'
import { StyleSheet } from "react-native";
import { GRAY_LIGHT } from '../../styles/colors'

export const styles = StyleSheet.create({
  content: {
    alignItems: "center",
    flexDirection: "row",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,.15)",
  },
  iconContent: {
    width: 50,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    marginRight: 10,
    borderRadius: 50,
    borderColor: 'rgba(0,0,0,.15)'
  }
})

export const Container = styled.View`
  height: 100%;
  padding: ${props => props.direction ? "0" : "0 15px" };
  flex-wrap: wrap;
  margin-top: 5px;
  flex-direction: ${props => props.direction ? props.direction : "column"};
  background-color: #fff;
  border-top-left-radius: 10;
  border-top-right-radius: 10;
`
