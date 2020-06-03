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
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../../styles/colors'
/* STYLES END*/

const index = ({ navigation, theme: { colors }, loading, login, prefix, phoneNumber }) => {
  const [state, setState] = useState({ 
    username: `${prefix}${phoneNumber}`, 
    password: ""
  })


  const onChange = (fieldName, value) => {
    setState({ ...state, [fieldName]: value })
  }

  const onSubmit = () => {
    if(state.username && state.password) {
      login(state.username, state.password, navigation)
    } 
  }
  
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <LinearGradient colors={[PRIMARY_LIGHT, PRIMARY_DARK]} style={styles.gradient} >
        <Container>
          <Animatable.View animation="bounceIn" style={{ paddingTop: 20 }} >
            <Image 
              style={styles.logo} 
              source={require('../../assets/logo-blanco.png')} 
            />
          </Animatable.View>
          <Form>
            <View style={{ paddingVertical: 20 }} >
              <TextInput
                name="username"
                label="Numero de Telefono"
                value={state.username}
                disabled={true}
                placeholder="Ingrese su numero"
                keyboardType="number-pad"
                onChangeText={onChange}
                iconLeadingShown={false}
              />
              <TextInput 
                type="password"
                name="password"
                label="Contraseña"
                value={state.password}
                placeholder="Ingrese su contraseña"
                onChangeText={onChange} 
                iconLeadingShown={false} />
            </View>
            <View style={{ paddingVertical: 20 }} >
              <Button 
                mode="contained"
                style={margin(0,0,10,0)}
                color={colors.accent}
                loading={loading}
                onPress={onSubmit}
                disabled={loading}
                labelStyle={{ color: colors.text }}
              >{state.loading ? "Ingresando" : "Ingresar"}</Button>
            </View>
          </Form>
        </Container>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default connect(state => ({
  loading: state.Auth.fetching,
  prefix: state.Auth.prefix,
  phoneNumber: state.Auth.phoneNumber,
}), { login: actions.login })(withTheme(index))