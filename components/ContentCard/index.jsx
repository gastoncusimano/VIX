import React from 'react'
import PropTypes from 'prop-types'
import { View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { Text, withTheme, Surface } from 'react-native-paper'
import { Card, Header, Footer, styles } from './index.style'

function  ContentCard(props) {
  const { theme } = props

  return (
    <Surface style={{...styles.card, ...props.cardStyle}} >
      {props.headerShown && 
        <Header>
          <Text style={{ ...styles.headerTitle, ...props.titleStyle }} >{props.title}</Text>
        </Header>
      }
      <View>
        {props.children}
      </View>
      {props.footerShown &&
        <Footer style={props.footerStyle} onPress={props.onPress} underlayColor="rgba(0,0,0,.09)" >
          <View style={{ flexDirection: "row", justifyContent: "space-between" }} >
            <Text style={{ color: "#338FED", fontWeight: "bold" }}>Ver toda tu actividad</Text>
            <Icon name="ios-arrow-forward" size={20} color={"#338FED"} />
          </View>
        </Footer>
      }
    </Surface>
  )
}

ContentCard.prototype = {
  onPress: PropTypes.func,
  children: PropTypes.node.isRequired,
  cardStyle: PropTypes.object,
  titleStyle: PropTypes.object,
  footerShown: PropTypes.bool,
  headerShown: PropTypes.bool,
  footerStyle: PropTypes.object,
}

ContentCard.defaultProps = {
  footerShown: true,
  headerShown: true,
}

export default withTheme(ContentCard)