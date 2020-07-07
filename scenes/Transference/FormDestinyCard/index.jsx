import _ from 'lodash'
import React, { useState } from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Text, withTheme, Button, TextInput } from 'react-native-paper'

/* STYLES */
import { PRIMARY_LIGHT,PRIMARY_DARK } from '../../../styles/colors'
import { Container, styles } from './index.style'
/* STYLES END*/

const ResultScene = ({ theme: { colors }, navigation, route: { params }}) => {
  const [state, setState] = useState({
    card_holder_name: '',
    card_number: '',
    reference: ''
  })
  const reset = () => {
    return navigation.reset({
      index: 0,
      routes: [{ name: 'Home'}]
    })
  }

  const onChange = (field, value) => {
    setState({ ...state, [field]: value })
  }

  const formHasError = () => {
    for (const key in state) {
      if (_.isEmpty(state[key])) {
        return true
      }
    }

    return false
  }

  const validation = (fieldName) => {
    let field = {
      card_number: state.card_number.length < 16,
      reference: state.reference.length < 6
    }

    return field[fieldName]
  }

  const goBack = async () => {
    await params.handleSetCard("destinyCard", state)
    await navigation.goBack()
  }

  return (
    <>
      <LinearGradient 
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '10%' }} title="Nueva tarjeta destino"  />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        style={{ flex: 1 }}
      >
        <Container>
          <Text style={{ color: colors.darkText, marginBottom: 20 }} >Ingresar los siguientes datos</Text>
          <View style={{ paddingVertical: 10, flex: 1 }} >
            <View style={{ marginBottom: 20 }} >
              <Text 
                style={{ 
                  color: colors.darkText, 
                  marginBottom: 5, 
                  fontWeight: 'bold' 
                }} 
              >Nombre completo del titular</Text>
              <TextInput
                mode="outlined"
                theme={{
                  colors: {
                    text: colors.darkText,
                    background: 'transparent',
                    underlineColor: 'transparent',
                  }
                }}
                value={state.card_holder_name}
                onChangeText={(value) => onChange("card_holder_name", value)}
              />
              <Text style={{ 
                color: colors.subtitleText,
                fontSize: 12, 
                fontStyle: 'italic',
              }}>*Requerido</Text>
            </View>
            <View style={{ marginBottom: 20 }} >
              <Text 
                style={{ 
                  color: colors.darkText, 
                  marginBottom: 5, 
                  fontWeight: 'bold' 
                }} 
              >Nro Tarjeta</Text>
              <TextInput
                mode="outlined"
                theme={{
                  colors: {
                    text: colors.darkText,
                    background: 'transparent',
                    underlineColor: 'transparent',
                  }
                }}
                value={state.card_number}
                placeholder="ej. XXXX XXXX XXXX 1234"
                keyboardType="phone-pad"
                onChangeText={(value) => onChange("card_number", value)}
              />
              {validation('card_number') &&
                <Text style={{ 
                  color: colors.subtitleText,
                  fontSize: 12, 
                  fontStyle: 'italic',
                }}>*La tarjeta debe contener un minimo de 16 digitos</Text>
              }
            </View>
            <View style={{ marginBottom: 20 }} >
              <Text 
                style={{ 
                  color: colors.darkText, 
                  marginBottom: 5, 
                  fontWeight: 'bold' 
                }} 
              >Referencia de tarjeta</Text>
              <TextInput
                mode="outlined"
                theme={{
                  colors: {
                    text: colors.darkText,
                    background: 'transparent',
                    underlineColor: 'transparent',
                  }
                }}
                value={state.reference}
                placeholder="ej. VFRET5"
                onChangeText={(value) => onChange("reference", value)}
              />
              {validation('reference') &&
                <Text style={{ 
                  color: colors.subtitleText,
                  fontSize: 12, 
                  fontStyle: 'italic',
                }}>*La referencia debe contener maximo 6 digitos</Text>
              }
            </View>
          </View>
          <View style={{ marginHorizontal: -15 }} >
            <Button 
              mode="contained"
              color={colors.accent}
              style={{ borderRadius: 0 }}
              disabled={formHasError()}
              onPress={() => goBack()}
              labelStyle={{ color: colors.primary, paddingVertical: 10, fontWeight: "bold" }}
            >Continuar</Button>
          </View>
        </Container>
      </LinearGradient>
    </>
  )
}

export default withTheme(ResultScene)