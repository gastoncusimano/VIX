import React from 'react'
import PropTypes from 'prop-types'
import { View, Text, Image } from 'react-native'
import { Portal, Dialog, Button, withTheme, Title } from 'react-native-paper'

/* STYLES */
import { styles } from './index.style'
/* STYLES END*/

const ModalInstructions = (props) => {
  const { theme } = props
  return (
    <View>
      <Portal>
        <Dialog
          visible={props.visible}
          onDismiss={props._handleDialog}>
          <Dialog.Title style={{ textAlign: "center", fontSize: 18 }} theme={{ colors: { text: theme.colors.darkText } }} >Dile al cajero que elija esta opción</Dialog.Title>
          <Dialog.Content>
            {[{
              title: "Mercado Libre / Pago - Ingreso / Tarjeta",
              image: require('../../../assets/pagofacil.png'),
            }, {
              title: "Ingreso de dinero - Tarjeta prepagada",
              image: require('../../../assets/rapipago.png'),
            }, {
              title: "Recarga Mercado Pago",
              image: require('../../../assets/cobroexpress.png'),
            }].map((data, i) => (
              <View key={i} style={{ alignItems: "center", marginBottom: 10 }} >
                <Image style={styles.dialogPayIcon} source={data.image}/>
                <Title style={{ color: theme.colors.darkText, fontSize: 16, textAlign: "center" }} >{data.title}</Title>
              </View>
            ))}
          </Dialog.Content>
          <Dialog.Actions style={{ justifyContent: "center" }} >
            <Button onPress={props._handleDialog}>Entendido</Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  )
}

ModalInstructions.defaultProps = {
  visible: true,
  _handleDialog: () => {},
}

ModalInstructions.prototype = {
  visible: PropTypes.bool.isRequired,
  _handleDialog: PropTypes.func.isRequired,
}

export default withTheme(ModalInstructions)
