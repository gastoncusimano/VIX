import { connect } from 'react-redux'
import React, { useState, useRef } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import { Button, withTheme, Text } from 'react-native-paper'
import { View, Image, SafeAreaView, TouchableOpacity } from 'react-native'

/* ACTIONS CREATORS - OWN COMPONENTS */
import actions from '../../redux/Auth/actions'
import TextInput from '../../components/InputText'
/* ACTIONS CREATORS - OWN COMPONENTS END */

/* STYLES */
import { 
  styles, Container, Form
} from './index.style'
import { margin } from '../../styles/mixins'
import { BLACK_DARK, BLACK_LIGHT, PRIMARY, SECONDARY } from '../../styles/colors'
/* STYLES END*/

const index = ({ changePhone, navigation, theme: { colors } }) => {
  const [state, setState] = useState({ 
    prefix: "", 
    loading: false, 
    phoneNumber: ""
  })


  const onChange = (fieldName, value) => {
    setState({ ...state, [fieldName]: value })
  }

  const onSubmit = () => {
    setState({ ...state, loading: true })
    if(state.prefix && state.phoneNumber) {
      changePhone(state.prefix, state.phoneNumber)
      setTimeout(() => {
        setState({ ...state, loading: false })
        navigation.push("Confirmation")
      }, 2000);
    } 
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <LinearGradient colors={[BLACK_LIGHT, BLACK_DARK]} style={styles.gradient} >
        <Container>
          <Animatable.View animation="bounceIn" style={{ paddingTop: 20 }} >
            <Image 
              style={styles.logo} 
              source={require('../../assets/ico_negativo.png')} 
            />
          </Animatable.View>
          <Form>
            <View style={{ flexDirection: "row", paddingVertical: 20 }} >
              <TouchableOpacity 
                style={{ flex: 1, paddingRight: 10 }}
                onPress={() => navigation.push(
                  "CountryOptions", 
                  { selectCountry: (country) => onChange("prefix", country), currentCountry: state.prefix })}
              >
                <TextInput
                  name="prefix"
                  label="Seleccionar"
                  value={state.prefix}
                  placeholder="Prefijo"
                  onChangeText={onChange} 
                  iconNameTrealing="angle-down"
                  iconLeadingShown={false}
                  editable={false}
                  iconColorTrealing={SECONDARY}
                  iconTrealingShown={true} />
              </TouchableOpacity>
              <View style={{ flex: 2 }} >
                <TextInput 
                  name="phoneNumber"
                  label="Ingresar"
                  keyboardType="number-pad"
                  value={state.phoneNumber}
                  placeholder="Telefono"
                  onChangeText={onChange} 
                  iconLeadingShown={false} />
              </View>
            </View>
            <View style={{ paddingVertical: 20 }} >
              <Button 
                mode="contained"
                style={margin(0,0,10,0)}
                color={colors.accent}
                loading={state.loading} 
                onPress={onSubmit}
                disabled={!state.prefix || !state.phoneNumber}
                labelStyle={{ color: colors.text }}
              >{state.loading ? "Enviando" : "Enviar"}</Button>
            </View>
          </Form>
        </Container>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default connect(
  state => ({
    prefix: state.Auth.prefix,
    phoneNumber: state.Auth.phoneNumber
  }), { 
    changePhone: actions.changePhoneNumber
  }
)(withTheme(index)) 
