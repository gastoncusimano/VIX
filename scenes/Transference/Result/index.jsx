  import React from 'react'
  import { View, Image } from 'react-native'
  import { LinearGradient } from 'expo-linear-gradient'
  import { Appbar, Button, withTheme, Title } from 'react-native-paper'
  
  /* STYLES */
  import { PRIMARY, SECONDARY } from '../../../styles/colors'
  import { Container, styles } from './index.style'
  /* STYLES END*/
  
  const ResultScene = ({ theme: { colors }, navigation}) => {
    const reset = () => {
      return navigation.reset({
        index: 0,
        routes: [{ name: 'Home'}]
      })
    }
    return (
      <>
        <LinearGradient 
          colors={[SECONDARY,PRIMARY]} 
          style={styles.gradient} 
          start={[1, 0.3]} 
          end={[0, 0.6]}
        >
          <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
            <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '33%' }} title="Transferencia"  />
          </Appbar.Header>
        </LinearGradient>
        <LinearGradient 
          end={[0, 0.6]}
          start={[1, .6]}
          colors={[SECONDARY,PRIMARY]} 
          style={{ flex: 1 }}
        >
          <Container>
            <View style={{ flex: 1, justifyContent: "center", alignItems: "center", marginTop: -40 }}>
              <Image style={{ height: 100, width: 100, marginBottom: 20 }} source={require("../../../assets/check.png")} />
              <Title style={{ color: colors.darkText, textAlign: "center" }} >Transacción Exitosa!</Title> 
            </View>
            <Button 
              mode="contained"
              style={{ width: "100%", alignSelf: "flex-end" }}
              theme={{ colors: { primary: colors.accent } }}
              onPress={() => reset()} 
              labelStyle={{ color: colors.text }}
            >
              Aceptar
            </Button>
          </Container>
        </LinearGradient>
      </>
    )
  }
  
  export default withTheme(ResultScene)
  