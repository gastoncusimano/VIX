import _ from 'lodash'
import React from 'react'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import { TextInput, View, KeyboardAvoidingView, TouchableWithoutFeedback, ScrollView } from 'react-native'
import { Appbar, Text, withTheme, Avatar, Title, Button } from 'react-native-paper'
import actions from '../../../redux/Transfer/actions'
import { connect } from 'react-redux'


/* STYLES */
import { styles, Container } from './index.style'
import { PRIMARY, SECONDARY } from '../../../styles/colors'
/* STYLES */

class SendScene extends React.Component {
  state = {
    ammount: "",
    reason: "",
  }
  onChange = (value, fieldName) => this.setState({ ...this.state, [fieldName]: value })
  handleViewRef = ref => this.view = ref
  bounce = () => this.view.bounceIn(800).then(endState => console.log(endState.finished ? 'bounce finished' : 'bounce cancelled'));
  
  render() {
    const { navigation, theme: { colors }, route: { params }, sendMoney } = this.props
    const handleAnimation = _.debounce(this.bounce, 200)

    return(
      <>
        <LinearGradient 
          colors={[SECONDARY,PRIMARY]} 
          style={styles.gradient} 
          start={[1, 0.3]} 
          end={[0, 0.6]}
        >
          <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
            <Appbar.BackAction onPress={navigation.goBack} />
            <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '19%' }} title="Transferencia"  />
          </Appbar.Header>
        </LinearGradient>
        <LinearGradient 
          end={[0, 0.6]}
          start={[1, .6]}
          colors={[SECONDARY,PRIMARY]} 
          style={{ flex: 1 }}
        >
          <View style={styles.wrapper}>
            <ScrollView style={{ paddingHorizontal: 25 }} >
              <KeyboardAvoidingView behavior="height" style={{ flex: 1 }} >
                <View style={{ flex: 1 }} >
                  <Animatable.View ref={this.handleViewRef} style={styles.wrappInputMoney}>
                    <Text style={[styles.symbol, { color: colors.accent }]}>$</Text>
                    <TextInput
                      value={this.state.ammount} 
                      style={[styles.money, { color: colors.accent }]}
                      caretHidden={true}
                      placeholder="0"
                      keyboardType="numeric"
                      onChangeText={(value) => this.onChange(value, "ammount")}
                      placeholderTextColor={colors.accent}
                    />
                  </Animatable.View>
                  <View style={{ flexDirection: "row", alignItems: "center", paddingVertical: 20, justifyContent: "center" }} >
                    {params.user.image
                      ? <Avatar.Image source={params.user.image} size={30} style={{ marginRight: 10 }} /> 
                      : (
                        <Avatar.Icon 
                          icon="account" 
                          size={40} 
                          color={colors.accent}
                          style={[styles.avatarIcon, { borderColor: "rgba(255,111,31,.25)" }]} 
                        />
                      )
                    }
                    <Title style={{ color: colors.darkText, marginVertical: 0 }}>{params.user.name}</Title>
                  </View>
                  <TouchableWithoutFeedback onPress={this.bounce} >
                    <TextInput 
                      value={this.state.reason} 
                      placeholder="Motivo"
                      onChangeText={(value) => this.onChange(value, "reason")}
                      style={{ borderBottomWidth: 1, borderColor: "rgba(0,0,0,.15)", width: "100%", textAlign: "center", marginVertical: 20 }}
                    />
                  </TouchableWithoutFeedback>
                </View>
                <Button
                    mode="contained"
                    onPress={() => sendMoney(params.numberParsed, this.state.ammount, navigation)}
                    theme={{ colors: { primary: colors.accent } }}
                    style={{ width: "100%", marginTop: 10 }}
                    labelStyle={{ color: colors.text }}>
                    Continuar
                </Button>
              </KeyboardAvoidingView>
            </ScrollView>
          </View>
        </LinearGradient>
      </>
    )
  }
} 

export default connect(state => ({ }), { sendMoney: actions.sendMoney})(withTheme(SendScene))

