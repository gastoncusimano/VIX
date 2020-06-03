import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { SECONDARY } from '../../../styles/colors'

export const Container = styled.ScrollView`
  padding: 0 15px;
  background-color: #fff;
`

export const styles = StyleSheet.create({
  filterItem: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  container: {
    paddingVertical: 20,
    paddingHorizontal: 15,
  },
  contentWrapper: {
    flex: 1,
    overflow: "hidden", 
    marginTop: 5, 
    backgroundColor: "#FFF",
    borderTopEndRadius: 10, 
    borderTopStartRadius: 10, 
  },
  optionsItem: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(0,0,0,.15)",
  },
  activeItem: {
    borderLeftWidth: 4,
    borderLeftColor: SECONDARY,
  }
})