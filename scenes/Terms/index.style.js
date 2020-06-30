import styled from 'styled-components'

export const Container = styled.View`
  height: 100%;
  margin-top: 5px;
  padding-top: 10px;
  margin-bottom: 25px;
  flex-direction: ${props => props.direction ? props.direction : "column"};
  background-color: #fff;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`