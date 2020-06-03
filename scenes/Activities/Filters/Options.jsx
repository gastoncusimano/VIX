import _ from 'lodash'
import React from 'react'
import { View, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { TouchableRipple, withTheme, Appbar, Text } from 'react-native-paper'

/* STYLES */
import { styles, Container } from './index.style'
import { PRIMARY, SECONDARY } from '../../../styles/colors'
/* STYLES END */

const SelectionScene = ({ navigation, route, theme: { colors } }) => {
  const { params: { options, currentFilter, _handleFilters } } = route
  const _handleSelect = async (value) => {
    await _handleFilters(value)
    await navigation.goBack()
  }

  return (
    <>
      <LinearGradient 
        colors={[SECONDARY,PRIMARY]} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content title="Filtros" subtitle="Movimientos" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[SECONDARY,PRIMARY]} 
      >
        <View style={{ borderTopEndRadius: 10, borderTopStartRadius: 10, marginTop: 5, backgroundColor: "#FFF", height: "100%", overflow: "hidden" }} >
          <FlatList
            data={options}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => {
              let stylesArray = [styles.filterItem, styles.optionsItem]

              if(_.isEqual(item, currentFilter))
                stylesArray.push(styles.activeItem)

              return (
                <TouchableRipple onPress={() => _handleSelect(item)} style={stylesArray} >
                  <Text style={{ color: colors.darkText, textTransform: "capitalize", fontSize: 16 }}>{item.name}</Text>
                </TouchableRipple>
              )
            }}
          />
        </View>
      </LinearGradient>
    </>
  )
}

export default withTheme(SelectionScene)
