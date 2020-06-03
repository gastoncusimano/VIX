import React, { useRef } from 'react'
import * as firebase from 'firebase'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Image, SafeAreaView } from 'react-native'
import { Button, withTheme, Text, Title } from 'react-native-paper'
import { FirebaseRecaptchaVerifierModal } from 'expo-firebase-recaptcha'

/* ACTIONS CREATORS */
import actions from '../../redux/Auth/actions'
/* ACTIONS CREATORS END */

/* STYLES */
import { 
  styles, Container
} from './index.style'
import { margin } from '../../styles/mixins'
import { BLACK_DARK, BLACK_LIGHT, PRIMARY, SECONDARY } from '../../styles/colors'
/* STYLES END*/

const index = ({ navigation, theme: { colors }, authSMS, loading, ...props }) => {
  const firebaseConfig = firebase.apps.length ? firebase.app().options : undefined
  const recaptchaVerifier = useRef(null)

  const onSubmit = () => {
    authSMS({ 
      phoneNumber: `${props.prefix}${props.phoneNumber}`,
      recaptchaVerifier
    }, navigation)
  }
  return (
    <SafeAreaView style={{ flex: 1 }} >
      <FirebaseRecaptchaVerifierModal ref={recaptchaVerifier} firebaseConfig={firebaseConfig} />
      <LinearGradient colors={[BLACK_LIGHT, BLACK_DARK]} style={styles.gradient} >
        <Container>
          <Animatable.View animation="bounceIn" style={{ paddingTop: 20 }} >
            <Image 
              style={styles.logo} 
              source={require('../../assets/ico_negativo.png')} 
            />
          </Animatable.View>
          <View>
            <View style={{ width: "50%", alignSelf: "center" }} >
              <Text style={{ textAlign: "center" }} >Se enviará un SMS de confirmación al siguiente número:</Text>
            </View>
            <View style={{ paddingVertical: 20 }} >
              <View style={{ alignSelf: "center", marginBottom: 10 }} >
                <Title style={styles.phoneNumberTitle} >{`${props.prefix} ${props.phoneNumber}`}</Title>
                <Text style={{ textAlign: "center", paddingVertical: 10 }}>¿Es correcto?</Text>
              </View>
              <View style={{ flexDirection: "row", justifyContent: "center" }} >
                <Button 
                  mode="outlined"
                  style={[margin(0,10,10,0), { flex: 1, borderColor: colors.accent }]}
                  color={colors.accent}
                  onPress={() => navigation.goBack()}
                  disabled={loading}
                  labelStyle={{ color: colors.text }}
                >Cancelar</Button>
                <Button 
                  mode="contained"
                  style={[margin(0,0,10,0), { flex: 1 }]}
                  color={colors.accent}
                  loading={loading}
                  onPress={onSubmit}
                  labelStyle={{ color: colors.text }}
                >Aceptar</Button>
              </View>
            </View>
          </View>
        </Container>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default connect(
  state => ({
    prefix: state.Auth.prefix,
    loading: state.Auth.fetching,
    phoneNumber: state.Auth.phoneNumber,
  }), {
    authSMS: actions.authSMS
  }
)(withTheme(index)) 