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
  },
  circleQuick: {
    backgroundColor: '#ffac00',
    width: 50,
    marginRight: 10,
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    paddingHorizontal: 15,
   },
   searchInput: {
    zIndex: 10,
    flexDirection: 'row',
    borderRadius: 25,
    backgroundColor: "#F7F7F7",
    marginVertical: 18,
    marginHorizontal: 15,
  },
  welcomeText: {
    top: 0,
    position: 'absolute',
    left: 24
  },
  circleBell: {
    position: 'absolute',
    right: 22,
    top: 10,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
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