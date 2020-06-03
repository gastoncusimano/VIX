import _ from 'lodash'
import { connect } from 'react-redux'
import React, { useState } from 'react'
import { LinearGradient } from 'expo-linear-gradient'
import * as Animatable from 'react-native-animatable'
import { Button, withTheme, Text, Checkbox } from 'react-native-paper'
import { View, Image, ScrollView, KeyboardAvoidingView } from 'react-native'

/* ACTIONS CREATORS - OWN COMPONENTS */
import actions from '../../redux/Auth/actions'
import TextInput from '../../components/InputText'
/* ACTIONS CREATORS - OWN COMPONENTS END */

/* STYLES */
import { 
  styles, Container, Form
} from './index.style'
import { margin } from '../../styles/mixins'
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../../styles/colors'
/* STYLES END*/

const index = ({ 
  prefix,
  signUp, 
  loading, 
  navigation, 
  phoneNumber, 
  theme: { colors },
}) => {
  const [state, setState] = useState({ 
    dni: "",
    name: "", 
    email: "",
    terms: false,
    lastName: "",
    password: "",
  })


  const onChange = (fieldName, value) => {
    setState({ ...state, [fieldName]: value })
  }

  const onSubmit = () => {
    const data = {
      dni: state.dni,
      name: state.name,
      terms: state.terms,
      email: state.email,
      password: state.password,
      username: `${prefix}${phoneNumber}`,
      last_name: state.lastName,
      user_phone: `${prefix}${phoneNumber}`
    }
    let formHasErrors = []

    for (const key in data) {
      if (data[key] === '' || data[key] === false) {
        formHasErrors.push({ [key]: "isRequired" })
      }
    }

    if(!formHasErrors.length > 0) { signUp(data) }
  }
  
  return (
    <LinearGradient colors={[PRIMARY_LIGHT, PRIMARY_DARK]} style={styles.gradient} >
      <ScrollView style={{ flex: 1 }} >
        <Container>
            <Animatable.View animation="bounceIn">
              <Image 
                style={styles.logo} 
                source={require('../../assets/logo-blanco.png')} 
              />
            </Animatable.View>
            <Form>
              <View style={{ marginBottom: 10 }} >
                <TextInput 
                  name="name"
                  value={state.name}
                  inputStyle={{ textAlign: "center", paddingBottom: 5 }}
                  styleContainer={{ marginBottom: 0 }}
                  placeholder="Nombre"
                  onChangeText={onChange} 
                  iconLeadingShown={false} 
                />
                <TextInput 
                  name="lastName"
                  value={state.lastName}
                  inputStyle={{ textAlign: "center", paddingBottom: 5 }}
                  styleContainer={{ marginBottom: 0 }}
                  placeholder="Apellido"
                  onChangeText={onChange} 
                  iconLeadingShown={false} 
                />
                <TextInput 
                  name="email"
                  value={state.email}
                  inputStyle={{ textAlign: "center", paddingBottom: 5 }}
                  styleContainer={{ marginBottom: 0 }}
                  placeholder="Email"
                  onChangeText={onChange} 
                  iconLeadingShown={false} 
                />
                <TextInput 
                  name="dni"
                  value={state.dni}
                  inputStyle={{ textAlign: "center", paddingBottom: 5 }}
                  styleContainer={{ marginBottom: 0 }}
                  placeholder="DNI"
                  keyboardType="number-pad"
                  onChangeText={onChange} 
                  iconLeadingShown={false} 
                />
                <TextInput 
                  name="password"
                  type="password"
                  value={state.password}
                  inputStyle={{ textAlign: "center", paddingBottom: 5 }}
                  styleContainer={{ marginBottom: 0 }}
                  placeholder="Ingrese su contraseña"
                  onChangeText={onChange} 
                  iconLeadingShown={false} 
                />
              </View>
              <View style={{ flexDirection: "row", alignItems: "center", }}>
                <Checkbox
                  status={state.terms ? 'checked' : 'unchecked'}
                  onPress={() => { setState({ ...state, terms: !state.terms }); }}
                />
                <Text>Acepto Términos y Condiciones</Text>
              </View>
              <View style={{ marginTop: 20 }} >
                <Button 
                  mode="contained"
                  style={margin(0,0,10,0)}
                  color={colors.accent}
                  loading={loading} 
                  onPress={onSubmit}
                  disabled={loading}
                  labelStyle={{ color: colors.text }}
                >{loading ? "Enviando" : "Enviar"}</Button>
              </View>
            </Form>
        </Container>
      </ScrollView>
    </LinearGradient>
  )
}

export default connect(state => ({
  prefix: state.Auth.prefix,
  loading: state.Auth.fetching,
  phoneNumber: state.Auth.phoneNumber,
}), {
  signUp: actions.signUp
})(withTheme(index)) 