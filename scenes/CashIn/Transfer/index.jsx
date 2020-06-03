import React, { useState } from 'react'
import { ScrollView, View } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, withTheme, Title, Button, Text, Divider, TouchableRipple, Paragraph } from 'react-native-paper'

/* STYLES */
import { padding } from '../../../styles/mixins'
import { PRIMARY, SECONDARY } from '../../../styles/colors'
import { styles, Container } from './index.style'
/* STYLES END */

const TransferScene = ({ navigation, theme: { colors }, route: { params } }) => {
  const [state, setState] = useState({ bankSelected: "" })
  const selectBank = (bank) => {
    setState({ bankSelected: bank })
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
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '5%' }} title="Transferencia Bancaria" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[SECONDARY,PRIMARY]} 
        style={{ flex: 1 }}
      >
        <ScrollView>
          <Container bg="#E6E6E6" style={{ flex: 1 }}>
            <Container style={padding(20,30,20,30)}>
              <Text style={{ color: colors.subtitleText, marginBottom: 10 }} >CVU:</Text>
              <Title style={{ color: colors.darkText, marginBottom: 20 }} >0000000000000000000000</Title>
              <Button 
                mode="outlined"
                style={{ width: "100%", borderColor: colors.primary }} 
                theme={{ colors: { primary: colors.accent } }} 
                onPress={() => {}}>
                  Copiar
                </Button>
            </Container>
            <Divider style={{ height: 2 }} />
            <Container style={padding(20,30,20,30)}>
            <Text style={{ color: colors.subtitleText, marginBottom: 10 }} >Alias:</Text>
                <Title style={{ color: colors.darkText, marginBottom: 20 }} >example.gollet</Title>
                <Button 
                  mode="outlined"
                  style={{ width: "100%", borderColor: colors.primary }} 
                  theme={{ colors: { primary: colors.accent } }} 
                  onPress={() => {}}>
                    Copiar
                </Button>
            </Container>
            <Divider style={{ height: 15 }} />
            <TouchableRipple onPress={() => params.handleNavigate("Banks", { selectBank })} rippleColor="rgba(0,0,0,.05)" style={styles.rippleButtom} >
              <>
                <Title style={{ color: colors.darkText }} >{state.bankSelected  ? state.bankSelected.name : "Cómo Transferir"}</Title>
                <Ionicons size={20} color="rgba(0,0,0,.15)" name="ios-arrow-forward" />
              </>
            </TouchableRipple>
            <Divider style={{ height: 1 }} />
            <Container style={{...padding(20,30,20,30), alignItems: "flex-start"}}>
              <View style={styles.rowContainer} >
                <Text style={{ color: colors.subtitleText }} >1. </Text>
                <Paragraph style={{ color: colors.subtitleText, ...styles.paragraph }} >Copiá tu CVU o Alias de Gollet</Paragraph>
              </View>
              <View style={styles.rowContainer} >
                <Text style={{ color: colors.subtitleText }} >2. </Text>
                <Paragraph style={{ color: colors.subtitleText, ...styles.paragraph }} >Ingresa al home banking del banco y dirigete a la seccion de Transferencia</Paragraph>
              </View>
              <View style={styles.rowContainer} >
                <Text style={{ color: colors.subtitleText }} >3. </Text>
                <Paragraph style={{ color: colors.subtitleText, ...styles.paragraph }} >Completa los datos de tu CVU !y listo¡</Paragraph>
              </View>
            </Container>
          </Container>
        </ScrollView>
      </LinearGradient>
    </>
  )
}

export default withTheme(TransferScene)
