import React from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import { SafeAreaView, FlatList, View } from 'react-native'
import { Appbar, withTheme, Title, TouchableRipple } from 'react-native-paper'

import { banks } from './data'
import { styles } from './index.style'
import { PRIMARY, SECONDARY } from '../../../styles/colors'

const BankScene = ({ navigation, theme: { colors }, route: { params } }) => {
  const handleRipple = async (object) => {
    await params.selectBank(object)
    await navigation.goBack()
  }
  return (
    <>
      <LinearGradient 
        colors={[SECONDARY,PRIMARY]} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18 }} title="Seleccioná tu banco" subtitle="Cargar Dinero" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[SECONDARY,PRIMARY]} 
      >
        <View style={{ 
          height: "100%", 
          marginTop: 5, 
          overflow: "hidden",
          backgroundColor: "#FFF", 
          borderTopEndRadius: 10, 
          borderTopStartRadius: 10, 
        }}>
          <FlatList
            data={banks}
            keyExtractor={item => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableRipple 
                style={styles.listItem}
                rippleColor="rgba(0,0,0,.15)" 
                onPress={() => handleRipple(item)} >
                <Title style={{ color: colors.darkText }} >{item.name}</Title>
              </TouchableRipple>
            )}
          />
        </View>
      </LinearGradient>
    </>
  )
}

export default withTheme(BankScene)