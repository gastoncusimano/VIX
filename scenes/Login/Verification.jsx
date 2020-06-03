import React, { useState } from 'react'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import { View, Image, SafeAreaView } from 'react-native'
import { Button, withTheme, Text, Title } from 'react-native-paper'
import {
  Cursor,
  CodeField,
  useBlurOnFulfill,
  useClearByFocusCell,
} from 'react-native-confirmation-code-field';

/* ACTIONS CREATORS - OWN COMPONENTS*/
import actions from '../../redux/Auth/actions'
import TextInput from '../../components/InputText'
/* ACTIONS CREATORS END */

/* STYLES */
import { 
  styles, Container
} from './index.style'
import { margin } from '../../styles/mixins'
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../../styles/colors'
/* STYLES END*/

const CELL_COUNT = 6;

const index = ({ 
  loading,
  navigation, 
  verificationId,
  theme: { colors }, 
  checkAuthorization, 
}) => {
  const [value, setValue] = useState('')
  const ref = useBlurOnFulfill({value, cellCount: CELL_COUNT})
  const [props, getCellOnLayoutHandler] = useClearByFocusCell({
    value,
    setValue,
  })
  
  const onSubmit = () => {
    if(value) {
      checkAuthorization({
        verificationId,
        verificationCode: value,
      }, navigation)
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
          <View >
            <View style={styles.root} >
              <CodeField
                ref={ref}
                {...props}
                value={value}
                onChangeText={setValue}
                cellCount={CELL_COUNT}
                rootStyle={styles.codeFiledRoot}
                keyboardType="number-pad"
                renderCell={({index, symbol, isFocused}) => (
                  <Text
                    key={index}
                    style={[styles.cell, isFocused && styles.focusCell]}
                    onLayout={getCellOnLayoutHandler(index)}>
                    {symbol || (isFocused ? <Cursor /> : null)}
                  </Text>
                )}
              />
              <Text style={{ textAlign: "center", marginTop: 20, color: colors.subtitleText }} >Ingresa el codigo recibido por SMS</Text>
            </View>
            <Button 
              mode="contained"
              color={colors.accent}
              style={[margin(0,0,10,0), { paddingVertical: 5 }]}
              onPress={onSubmit}
              loading={loading}
              disabled={!value}
              labelStyle={{ color: colors.text }}
            >Enviar</Button>
          </View>
        </Container>
      </LinearGradient>
    </SafeAreaView>
  )
}

export default connect(
  state => ({
    loading: state.Auth.fetching,
    verificationId: state.Auth.verificationId,
  }), { checkAuthorization: actions.checkAuthorization }
)(withTheme(index)) 