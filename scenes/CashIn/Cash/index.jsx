import React, { useState } from 'react'
import { View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Text, Appbar, withTheme, Divider, Button } from 'react-native-paper'

/* STYLES && MIXINS */
import { padding } from '../../../styles/mixins'
import { Container, styles } from './index.style'
import { PRIMARY, SECONDARY } from '../../../styles/colors'
/* STYLES && MIXINS END*/

/* OWN COMPONENTS */
import ModalInstructions from './ModalInstructions'
/* OWN COMPONENTS END */
const CashScene = ({ navigation, theme }) => {
  const [isVisibleInformation, setVisibility] = useState(false)
  const _handleDialog = () => setVisibility(!isVisibleInformation)
  return (
    <>
      <LinearGradient 
        colors={[SECONDARY,PRIMARY]} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '33%' }}title="Efectivo"/>
          <Appbar.Action icon="share-variant" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[SECONDARY,PRIMARY]} 
        style={{ flex: 1 }}
      >
        <Container bg="#E6E6E6" style={{ flex: 1 }} >
          <Container bg="#FFF" style={padding(20,30,20,30)}>
            <Text style={{...styles.info, color: theme.colors.darkText }}>
              Muestrale este código al cajero e ingresá un monto mayor a $ 50
            </Text>
            <View style={styles.boxCode}>
              <Text style={{...styles.code, color: theme.colors.primary}}>96781 98781</Text>
            </View>
            <Button theme={{ colors: { primary: theme.colors.subtitleText } }} onPress={_handleDialog} >Instrucciones para el cajero</Button>
          </Container>
          <Divider style={{ height: 2 }} />
          <Container bg="#FFF" direction="row" style={padding(20,30,20,30)} >
            <Text style={{ color: theme.colors.darkText, marginRight: 10 }}>Hacelo en: </Text>
            <View style={styles.payIconContainer} >
              <Image style={styles.payIcon} source={require("../../../assets/pagofacil.png")} />
              <Image style={styles.payIcon} source={require("../../../assets/rapipago.png")} />
              <Image style={styles.payIcon} source={require("../../../assets/cobroexpress.png")} />
            </View>
          </Container>
        </Container>
      </LinearGradient>
      <ModalInstructions visible={isVisibleInformation} _handleDialog={_handleDialog} />
    </>
  )
}

export default withTheme(CashScene)
