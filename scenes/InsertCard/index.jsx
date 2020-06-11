import _ from 'lodash'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import Ionicons from 'react-native-vector-icons/Ionicons'
import NumberFormat from 'react-number-format'
import { TextInputMask } from 'react-native-masked-text'
import { LinearGradient } from 'expo-linear-gradient'
import { View, TextInput, ScrollView } from 'react-native'
import { Appbar, Button, withTheme, Text, Title, Checkbox, TouchableRipple } from 'react-native-paper'

/* STYLES */
import actions from '../../redux/InsertCard/actions'
import { Container, styles } from './index.style'
import { PRIMARY_DARK, PRIMARY_LIGHT, SECONDARY } from '../../styles/colors'
/* STYLES END*/

const InsertCard = ({ theme: { colors }, navigation, submitCard, loading }) => {
  const [state, setState] = useState({
    cvv: '',
    public: false,
    reference: '',
    card_number: '',
    expiration_date: '',
    card_holder_name: '',
    card_type: { id: 1 },
    card_brand: { id: 1 },
    card_issuer: { id: 1 }
  })

  const takePicture = (image) => {
    setState({ ...state, cardImage: image })
  }

  onChange = (field, value) => {
    setState({ ...state, [field]: value })
  }

  validateFields = () => {
    let values = {...state}
    for (const key in values) {
      if (_.isEmpty(values[key]) && key !== 'public') {
        delete values[key]
      }
    }

    for (const key in state) {
      if (!values.hasOwnProperty(key)) {
        return false
      }
    }

    return true
  }

  const submit = () => {
    if(validateFields()) {
      submitCard(state, navigation)
    }
  }

  return (
    <>
      <LinearGradient
        colors={[PRIMARY_DARK, PRIMARY_LIGHT]}
        start={[1, 0.3]}
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
          <Appbar.BackAction onPress={navigation.goBack} color="white" />
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '15%' }} title="Ingresar Tarjeta" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_DARK, PRIMARY_LIGHT]}
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Container>
            <View  style={{ marginBottom: 20 }}>
              <TouchableRipple 
                style={{ alignItems: 'center' }} 
                onPress={() => navigation.push("Camera", { takePicture: (image) => takePicture(image) })} 
                rippleColor="rgba(0,0,0,.15)" 
              >
                <>
                  <Ionicons name="md-camera" style={{ marginBottom: 40 }} size={50} color={SECONDARY} />
                  <Text style={{ color: colors.subtitleText }}>Por favor tome una foto de la tarjeta que desee ingresar</Text>
                </>
              </TouchableRipple>
              <View>
                <TextInput
                  value={state.card_holder_name}
                  placeholder="Nombre y Apellido del titular"
                  onChangeText={(value) => onChange("card_holder_name", value)}
                  placeholderTextColor={colors.darkText}
                  style={styles.input}
                />
                <TextInput
                  value={state.card_number}
                  placeholder="Nro de Tarjeta"
                  onChangeText={(value) => onChange("card_number", value)}
                  placeholderTextColor={colors.darkText}
                  style={styles.input}
                />
                <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
                  <TextInputMask
                    type="datetime"
                    style={[styles.input, { width: '48%' }]}
                    value={state.expiration_date}
                    options={{ format: 'MM/YY' }}
                    placeholder="Vencimiento"
                    placeholderTextColor={colors.darkText}
                    onChangeText={text => onChange('expiration_date', text)}
                  />
                  <TextInput
                    value={state.cvv}
                    placeholder="CVV"
                    onChangeText={(value) => onChange("cvv", value)}
                    placeholderTextColor={colors.darkText}
                    style={[styles.input, { width: '48%' }]}
                  />
                </View>
                <View>
                  <TextInput
                    value={state.reference}
                    placeholder="Alias de Tarjeta"
                    onChangeText={(value) => onChange("reference", value)}
                    placeholderTextColor={colors.darkText}
                    style={styles.input}
                  />
                  <Text style={{ color: colors.subtitleText }} >El Alias debe contener como minimo 6 digitos</Text>
                </View>
              </View>
            </View>
            <View style={{ padding: 20, borderWidth: 1, borderRadius: 10, borderColor: SECONDARY, marginBottom: 20 }} >
              <Title style={{ color: colors.darkText, fontSize: 16 }}>Por favor seleccione el destino de la tarjeta ingresada</Title>
              <View>
                <View style={{ flexDirection: 'row', alignItems: 'center' }} >
                  <Checkbox
                    status={state.public ? 'checked' : 'unchecked'}
                    onPress={() => { onChange('public', !state.public); }}
                    uncheckedColor={SECONDARY}
                  />
                  <Text style={{ color: colors.darkText }} >Recibir Dinero</Text>
                </View>
              </View>
            </View>
            <View>
              <Button 
                mode="contained" 
                color={colors.accent} 
                onPress={submit}
                loading={loading}
                disabled={loading}
                labelStyle={{ color: colors.primary }} 
              >Confirmar</Button>
            </View>
          </Container>
        </ScrollView>
      </LinearGradient>
    </>
  )
}

export default connect(state => ({
  loading: state.InsertCard.fetching
}), { submitCard: actions.submitCard })(withTheme(InsertCard))