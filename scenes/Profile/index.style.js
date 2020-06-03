import styled from 'styled-components'
import { StyleSheet } from 'react-native'
import { SECONDARY } from '../../styles/colors'

export const styles = StyleSheet.create({
  circle: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderWidth: 1,
    borderColor: SECONDARY,
    borderRadius: 50,
  },
  title: { fontSize: 20, fontWeight: 'bold' },
  card: {
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: 'rgba(0,0,0,.15)',
    borderWidth: 1,
    borderRadius: 10,
  },
  iconLeft: {
    width: 50,
    height: 50,
    alignItems: 'center',
    marginRight: 10,
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,.15)',
    borderRadius: 50,
  },
  photoIcon: {
    width: 50,
    height: 50,
    alignItems: 'center',
    marginBottom: 10,
    justifyContent: 'center',
    borderColor: 'rgba(0,0,0,.10)',
    borderWidth: 1,
    borderRadius: 50,
  },
  iconContainer: {
    padding: 10, 
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
  }
})

export const Container = styled.SafeAreaView`
  padding: 40px 0;
  border-top-right-radius: 10;
  border-top-left-radius: 10;
  margin-top: 5px;
  background-color: #fff;
  height: 100%;
`

