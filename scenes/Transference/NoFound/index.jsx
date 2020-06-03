import React from 'react'
import { View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { withTheme, Appbar, Title, Paragraph, Button } from 'react-native-paper'
import { PRIMARY, SECONDARY } from '../../../styles/colors'

/* STYLES */
import { Container, styles } from './index.style'
/* STYLES END*/

const NoFoundScene = ({ theme: { colors }, navigation }) => {
  return (
    <>
      <LinearGradient 
        colors={[SECONDARY,PRIMARY]} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }} >
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '18%' }} title="Transferencia" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[SECONDARY,PRIMARY]} 
      >
      <Container>
        <View style={{ flex: 1, paddingTop: 110}} >
          <Title style={{ color: colors.darkText, textAlign: "center" }} >Vas a tener que invitar a esta persona a Gollet</Title>
          <Paragraph style={{ color: colors.subtitleText, textAlign: "center" }} >
            Cuando se descargue la app vas a poder enviarle dinero las veces que quieras
          </Paragraph>
          <Button 
            mode="contained"
            style={{ width: "90%", alignContent: 'center', alignSelf: 'center', marginTop: 90 }}
            theme={{ colors: { primary: colors.accent } }}
            onPress={() => {}} 
            labelStyle={{ color: colors.text }} >
              Invitar por Whatsapp
            </Button>
        </View>
      </Container>
      </LinearGradient>
    </>
  )
}

export default withTheme(NoFoundScene)
