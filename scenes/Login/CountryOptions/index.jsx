import _ from 'lodash'
import React from 'react'
import { FontAwesome5 } from "@expo/vector-icons"
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView, FlatList, View } from 'react-native'
import { Appbar, withTheme, Title, TouchableRipple, Avatar, Text } from 'react-native-paper'

/* STYLES - UTILITIES */
import { styles } from './index.style'
import countrys from '../../../utils/countrys'
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../../../styles/colors'
/* STYLES - UTILITIES */

const CountryOptions = ({ navigation, theme: { colors }, route: { params } }) => {
  const { currentCountry, selectCountry } = params

  const handleRipple = async (object) => {
    await selectCountry(object)
    await navigation.goBack()
  }
  return (
    <>
      <LinearGradient 
        colors={[PRIMARY_LIGHT, PRIMARY_DARK]} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header theme={{ colors: { primary: "#333" } }} style={{ elevation: 0, backgroundColor: "#00000000" }} >
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18 }} title="Seleccione su pais" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_LIGHT, PRIMARY_DARK]}
      >
        <View style={{ borderTopEndRadius: 10, borderTopStartRadius: 10, marginTop: 5, backgroundColor: "#FFF", height: "100%" }} >
          <FlatList
            data={countrys}
            keyExtractor={item => item.code.toString()}
            renderItem={({ item }) => {
              let stylesArray = [styles.listItem]

              if(_.isEqual(item.prefix, currentCountry))
                stylesArray.push(styles.activeItem)
              return(
                <TouchableRipple 
                  style={stylesArray}
                  rippleColor="rgba(0,0,0,.15)" 
                  onPress={() => handleRipple(item.prefix)} >
                  <>
                    <Avatar.Image size={50} source={item.image} />
                    <View style={{ marginLeft: 10, flex: 1 }} >
                      <Title style={{ color: colors.darkText }} >{item.name}</Title>
                      <Text style={{ color: colors.subtitleText }} >{item.prefix}</Text>
                    </View>
                    <FontAwesome5 color="rgba(0,0,0,.15)" size={20} name="angle-right"  />
                  </>
                </TouchableRipple>
              )
            }}
          />
        </View>
      </LinearGradient>
    </>
  )
}

export default withTheme(CountryOptions)