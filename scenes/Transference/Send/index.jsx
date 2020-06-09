import _ from 'lodash'
import React from 'react'
import Ionicons from 'react-native-vector-icons/Ionicons'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Text, withTheme, Avatar, Title, Button, TouchableRipple } from 'react-native-paper'
import { TextInput, View, KeyboardAvoidingView, TouchableOpacity, TouchableWithoutFeedback, ScrollView, Image } from 'react-native'
import actions from '../../../redux/Transfer/actions'
import { connect } from 'react-redux'


/* STYLES */
import { styles, Container } from './index.style'
import { PRIMARY, SECONDARY } from '../../../styles/colors'
/* STYLES */

const ContactItem = ({ title, subtitle, image, colors }) => {
  return (
    <TouchableRipple
      rippleColor="rgba(0,0,0,.15)"
      style={styles.contactItem}
    >
      <>
        {image
          ? <Avatar.Image source={image} size={50} style={{ marginRight: 10 }} />
          : (
            <Avatar.Icon
              icon="account"
              size={50}
              color={colors.accent}
              style={[styles.avatarIcon, { borderColor: "rgba(0,0,0,.25)" }]}
            />
          )
        }
        <View>
          <Title style={{ color: colors.darkText, fontSize: 18, marginVertical: 0 }} >{title}</Title>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons color={colors.subtitleText} name="ios-call" mode="outline" size={16} />
            <Text style={{ color: colors.subtitleText, marginLeft: 5 }} >{subtitle}</Text>
          </View>
        </View>
      </>
    </TouchableRipple>
  )
}

class SendScene extends React.Component {
  state = {
    ammount: "",
    reason: "",
    addCard: false,
    card: {
      name: '',
      number: '',
      alias: ''
    }
  }
  toggleAddCard = () => this.setState({ ...this.state, addCard: true })
  onChangeCard = (field, value) => this.setState({ ...this.state, card: { ...this.state.card, [field]: value } })
  onChange = (value, fieldName) => this.setState({ ...this.state, [fieldName]: value })
  handleViewRef = ref => this.view = ref
  bounce = () => this.view.bounceIn(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));

  render() {
    const { navigation, theme: { colors }, route: { params }, sendMoney } = this.props
    const handleAnimation = _.debounce(this.bounce, 200)

    return (
      <>
        <LinearGradient
          colors={[SECONDARY, PRIMARY]}
          style={styles.gradient}
          start={[1, 0.3]}
          end={[0, 0.6]}
        >
          <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '19%' }} title="Transferencia" />
          </Appbar.Header>
        </LinearGradient>
        <LinearGradient
          end={[0, 0.6]}
          start={[1, .6]}
          colors={[SECONDARY, PRIMARY]}
          style={{ flex: 1 }}
        >
          <View style={styles.wrapper}>
            <ScrollView style={{ paddingHorizontal: 25 }} >
              <ContactItem
                title={params.user.name}
                image={params.user.image}
                colors={this.props.theme.colors}
                subtitle={params.numberParsed}
              />
              {params.exists &&
                <View>
                  <View style={{ flexDirection: 'row' }} >
                    <View style={{ width: 20, height: 20, backgroundColor: colors.accent, borderRadius: 50, marginRight: 10 }} />
                    <Text style={{ color: colors.darkText, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }} >Seleccione la tarjeta de destino</Text>
                  </View>
                  <ScrollView contentContainerStyle={styles.cardContainer} horizontal >
                    <>
                      {[{
                        id: '1',
                        alias: 'Tarjeta A'
                      }, {
                        id: '2',
                        alias: 'Tarjeta B'
                      }].map((card, i) => (
                        <TouchableRipple key={i} onPress={() => { }} rippleColor="rgba(0,0,0,.25)" >
                          <View style={styles.card}>
                            <Image style={{ marginBottom: 5 }} source={require('../../../assets/icons/card.png')} />
                            <Text style={{ color: colors.subtitleText }}>{card.alias}</Text>
                          </View>
                        </TouchableRipple>
                      ))}
                      <TouchableRipple style={{ width: 70, alignItems: 'center', padding: 5 }} onPress={this.toggleAddCard} rippleColor="rgba(0,0,0,.25)">
                        <>
                          <View style={styles.btnMore}>
                            <Ionicons name="ios-add" size={20} color="#FFF" />
                          </View>
                          <Text style={{ color: colors.accent, textAlign: 'center' }}>Agregar Tarjeta</Text>
                        </>
                      </TouchableRipple>
                    </>
                  </ScrollView>
                </View>
              }
              {this.state.addCard || !params.exists &&
                <View>
                  <View style={{ flexDirection: 'row' }} >
                    <View style={{ width: 20, height: 20, backgroundColor: colors.accent, borderRadius: 50, marginRight: 10 }} />
                    <Text style={{ color: colors.darkText, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }} >Ingresa la tarjeta de destino</Text>
                  </View>
                  <View>
                    <TextInput
                      value={this.state.card.name}
                      placeholder="Nombre y Apellido del titular"
                      onChangeText={(value) => this.onChangeCard("name", value)}
                      placeholderTextColor={colors.darkText}
                      style={styles.inputMotivo}
                    />
                    <TextInput
                      value={this.state.card.number}
                      placeholder="Nro de Tarjeta"
                      onChangeText={(value) => this.onChangeCard("number", value)}
                      placeholderTextColor={colors.darkText}
                      style={styles.inputMotivo}
                    />
                    <TextInput
                      value={this.state.card.alias}
                      placeholder="Alias de Tarjeta"
                      onChangeText={(value) => this.onChangeCard("alias", value)}
                      placeholderTextColor={colors.darkText}
                      style={styles.inputMotivo}
                    />
                  </View>
                </View>
              }
              <View style={{ flex: 1, marginBottom: 20 }} >
                <Animatable.View ref={this.handleViewRef} style={styles.wrappInputMoney}>
                  <Text style={[styles.symbol, { color: colors.primary }]}>$</Text>
                  <TextInput
                    value={this.state.ammount}
                    style={[styles.money, { color: colors.primary }]}
                    caretHidden={true}
                    placeholder="0"
                    keyboardType="numeric"
                    onChangeText={(value) => this.onChange(value, "ammount")}
                    placeholderTextColor={colors.primary}
                  />
                </Animatable.View>
                <Text style={{ color: colors.subtitleText, textTransform: 'uppercase', textAlign: 'center' }}>comision de visa: $0</Text>
                <TouchableWithoutFeedback onPress={this.bounce} >
                  <TextInput
                    value={this.state.reason}
                    placeholder="Motivo"
                    onChangeText={(value) => this.onChange(value, "reason")}
                    placeholderTextColor={colors.darkText}
                    style={styles.inputMotivo}
                  />
                </TouchableWithoutFeedback>
              </View>
              <View>
                <View style={{ flexDirection: 'row' }} >
                  <View style={{ width: 20, height: 20, backgroundColor: colors.accent, borderRadius: 50, marginRight: 10 }} />
                  <Text style={{ color: colors.darkText, fontSize: 16, fontWeight: 'bold', marginBottom: 10 }} >Seleccione la tarjeta de origen</Text>
                </View>
                <ScrollView contentContainerStyle={styles.cardContainer} horizontal >
                  <>
                    {[{
                      id: '1',
                      alias: 'Tarjeta A'
                    }, {
                      id: '2',
                      alias: 'Tarjeta B'
                    }].map((card, i) => (
                      <TouchableRipple key={i} onPress={() => { }} rippleColor="rgba(0,0,0,.25)" >
                        <View style={styles.card}>
                          <Image style={{ marginBottom: 5 }} source={require('../../../assets/icons/cardSolid.png')} />
                          <Text style={{ color: colors.subtitleText }}>{card.alias}</Text>
                        </View>
                      </TouchableRipple>
                    ))}
                    <TouchableRipple style={{ width: 70, alignItems: 'center', padding: 5 }} onPress={() => navigation.push('InsertCard')} rippleColor="rgba(0,0,0,.25)">
                      <>
                        <View style={styles.btnMore}>
                          <Ionicons name="ios-add" size={20} color="#FFF" />
                        </View>
                        <Text style={{ color: colors.accent, textAlign: 'center' }}>Agregar Tarjeta</Text>
                      </>
                    </TouchableRipple>
                  </>
                </ScrollView>
              </View>
              <Button
                mode="contained"
                onPress={() => sendMoney(params.numberParsed, this.state.ammount, navigation)}
                theme={{ colors: { primary: colors.accent } }}
                style={{ width: "100%", marginTop: 10 }}
                labelStyle={{ color: colors.text }}>
                Enviar
                </Button>
            </ScrollView>
          </View>
        </LinearGradient>
      </>
    )
  }
}

export default connect(state => ({}), { sendMoney: actions.sendMoney })(withTheme(SendScene))

