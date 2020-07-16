import _ from 'lodash'
import React, { useRef, useState } from 'react'
import { connect } from 'react-redux'
import NumberFormat from 'react-number-format'
import { LinearGradient } from 'expo-linear-gradient'
import { FlatList, View, TextInput, Image, TouchableOpacity, ScrollView } from 'react-native'
import { Appbar, Button, withTheme, Text, TouchableRipple } from 'react-native-paper'

/* STYLES */
import { PRIMARY_LIGHT, PRIMARY_DARK } from '../../../styles/colors'
import { WINDOW_WIDTH } from '../../../styles/mixins'
import { styles } from './index.style'
/* STYLES END*/

import actions from '../../../redux/Transfer/actions'
import ContactCard from './components/ContactCard'

const steps = [{
  id: 1,
  subtitle: "Seleccionar tarjeta destino",
  component: (props) => DestinyOriginStep(props)
}, {
  id: 2,
  subtitle: "Seleccionar tarjeta origen",
  component: (props) => DestinyOriginStep(props)
}, {
  id: 3,
  subtitle: "Ingresar monto",
  component: (props) => AmmountStep(props)
}]

const renderItem = (data, colors, handleSetCard, origin, originCard, destinyCard) => {
  let cardSelected = false

  if (origin) {
    if (!_.isEmpty(originCard)) {
      cardSelected = originCard.id === data.id
    }
  } else {
    if (!_.isEmpty(destinyCard)) {
      cardSelected = destinyCard.id === data.id
    }
  }

  return (
    <View style={{
      marginTop: 10,
      borderColor: !cardSelected ? '#ddd' : colors.accent,
      borderWidth: 1,
      borderRadius: 7,
      backgroundColor: '#f6f6f6',
      width: 300,
      marginRight: 15
    }}>
      <TouchableRipple
        style={{ padding: 20 }}
        rippleColor="rgba(0,0,0,.05)"
        onPress={() => handleSetCard(origin ? 'originCard' : 'destinyCard', data)}
      >
        <>
          <Image source={require('../../../assets/ico_vix.png')} style={{ width: 60, height: 25, alignSelf: 'flex-end' }} />
          <Image source={require('../../../assets/chipcard.png')} style={{ width: 50, height: 30, marginTop: 0 }} />
          <View style={{ paddingTop: 15 }}>
            <NumberFormat
              value={origin ? data.card_number : data.card_number}
              format="#### #### #### ####"
              renderText={(value) => (<Text style={{ color: '#ddd', fontSize: 18 }}>{value}</Text>)}
              displayType={'text'}
            />
          </View>
          <View style={{ flexDirection: 'row-reverse', justifyContent: 'space-between' }} >
            {origin ? (
              <View style={{ paddingTop: 10 }}>
                <Text style={{ color: '#ddd', fontSize: 10, fontWeight: 'bold' }} >EXPIRATION</Text>
                <Text style={{ color: '#ddd', fontSize: 15 }}>{data.expiration_date}</Text>
              </View>
            )
              : (
                <View style={{ paddingTop: 10 }}>
                  <Text style={{ color: '#ddd', fontSize: 10, fontWeight: 'bold' }} >REFERENCE</Text>
                  <Text style={{ color: '#ddd', fontSize: 15 }}>{data.reference}</Text>
                </View>
              )
            }
            <View style={{ paddingTop: 10 }}>
              <Text style={{ color: '#ddd', fontSize: 10, fontWeight: 'bold' }} >{'CARD HOLDER'}</Text>
              <Text style={{ color: '#ddd', fontSize: 16, textTransform: 'uppercase' }}>
                {origin ? data.card_holder_name : data.card_holder_name}
              </Text>
            </View>
          </View>
        </>
      </TouchableRipple>
    </View>
  )
}

const DATA = [{
  Public: null,
  card_brand: {
    created_at: "2020-02-16T15:56:04.000Z",
    id: 1,
    name: "Visa",
    updated_at: "2020-02-16T15:56:04.000Z",
  },
  card_holder_name: "Wilmer Salazar",
  card_issuer: {
    country: null,
    created_at: "2020-02-16T15:53:36.000Z",
    id: 1,
    name: "BBVA",
    updated_at: "2020-02-16T15:53:36.000Z",
  },
  card_number: "4532296200336462",
  card_type: {
    created_at: "2020-02-16T15:53:05.000Z",
    id: 1,
    name: "Crédito",
    updated_at: "2020-02-16T15:55:32.000Z",
  },
  created_at: "2020-07-02T12:14:01.000Z",
  customer: {
    created_at: "2020-05-26T20:50:21.000Z",
    customer_job_type: null,
    customer_marital_status: null,
    customer_sex: null,
    customer_status: null,
    date_of_birth: null,
    dni: null,
    document_number: null,
    document_type: null,
    first_name: "Wilmer",
    id: 12,
    last_name: null,
    name: null,
    nationality: null,
    place_of_birth: null,
    second_name: "Salazar",
    tax_id: null,
    updated_at: "2020-05-27T13:47:14.000Z",
    user: 33,
  },
  expiration_date: "10/25",
  id: 64,
  last_four_digits: null,
  reference: "CCKJE4",
  updated_at: "2020-07-02T12:14:01.000Z",
},
{
  Public: null,
  card_brand: {
    created_at: "2020-02-16T15:56:04.000Z",
    id: 1,
    name: "Visa",
    updated_at: "2020-02-16T15:56:04.000Z",
  },
  card_holder_name: "Gaston cusimano",
  card_issuer: {
    country: null,
    created_at: "2020-02-16T15:53:36.000Z",
    id: 1,
    name: "BBVA",
    updated_at: "2020-02-16T15:53:36.000Z",
  },
  card_number: "4532296200336462",
  card_type: {
    created_at: "2020-02-16T15:53:05.000Z",
    id: 1,
    name: "Crédito",
    updated_at: "2020-02-16T15:55:32.000Z",
  },
  created_at: "2020-07-02T12:14:01.000Z",
  customer: {
    created_at: "2020-05-26T20:50:21.000Z",
    customer_job_type: null,
    customer_marital_status: null,
    customer_sex: null,
    customer_status: null,
    date_of_birth: null,
    dni: null,
    document_number: null,
    document_type: null,
    first_name: "Gaston",
    id: 12,
    last_name: null,
    name: null,
    nationality: null,
    place_of_birth: null,
    second_name: "Cusimanco",
    tax_id: null,
    updated_at: "2020-05-27T13:47:14.000Z",
    user: 33,
  },
  expiration_date: "10/25",
  id: 65,
  last_four_digits: null,
  reference: "CCFE4D",
  updated_at: "2020-07-02T12:14:01.000Z",
}]

const HeaderList = (currentSlide) => (
  <View style={styles.headerContainer}>
    <View style={styles.itemHeader}>
      <Text>Destino</Text>
      {currentSlide === 0 &&
        <View style={styles.activeIndicator} />
      }
    </View>
    <View style={styles.itemHeader}>
      <Text>Origen</Text>
      {currentSlide === 1 &&
        <View style={styles.activeIndicator} />
      }
    </View>
    <View style={styles.itemHeader}>
      <Text>Monto</Text>
      {currentSlide === 2 &&
        <View style={styles.activeIndicator} />
      }
    </View>
  </View>
)

const AmmountStep = ({ onSubmit, item, colors, originCard, destinyCard, usdConvertion, onChange, formData: { ammount }, user }) => (
  <ScrollView  contentContainerStyle={{ flex: 1 }} style={{ width: WINDOW_WIDTH }} >
    <View style={{ paddingHorizontal: 15, flex: 1 }} >
      <View style={{ marginBottom: 40, flexDirection: 'row', justifyContent: 'space-between' }} >
        <View style={{ width: " 50%", marginRight: 5 }} >
          <Text style={{
            color: colors.darkText,
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 20
          }}>Enviar dinero a</Text>
          <ContactCard
            firstName={user.name}
            lastName=""
            reference={destinyCard && destinyCard.reference}
          />
        </View>
        <View style={{ width: " 50%" }}>
          <Text
            style={{
              color: colors.darkText,
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 20
            }}
            numberOfLines={2}
          >Tarjeta Origen</Text>
          <ContactCard
            firstName={(!_.isEmpty(originCard) && originCard.card_holder_name) || ''}
            lastName={''}
            reference={originCard && originCard.reference}
          />
        </View>
      </View>
      <View style={{ marginBottom: 30 }} >
        <Text style={{
          color: colors.darkText,
          fontWeight: "bold",
          fontSize: 16,
          marginBottom: 20
        }}>{item.subtitle}</Text>
        <View style={{ width: "60%", alignSelf: "center", flexDirection: "row" }} >
          <TextInput
            value={ammount}
            style={styles.inputCustom}
            placeholder="$ 0.00"
            placeholderTextColor="#333"
            keyboardType="number-pad"
            onChangeText={(value) => onChange('ammount', value)}
          />
          <Text style={{ color: colors.darkText, fontSize: 18, borderBottomWidth: 1, borderColor: "rgba(0,0,0,.15)" }} >ARS</Text>
        </View>
      </View>
      <View >
        <Text style={{
          color: colors.darkText,
          fontWeight: "bold",
          fontSize: 16,
          marginBottom: 20
        }}>Alicia recibe (aproximadamente)</Text>
        <View style={{ width: "60%", alignSelf: "center" }} >
          <View style={{ width: '100%', alignSelf: "center", flexDirection: "row" }} >
            <TextInput
              value={usdConvertion.toString()}
              style={styles.inputCustom}
              editable={false}
              placeholder="$ 0.00"
              placeholderTextColor="#333"
              keyboardType="number-pad"
              onChangeText={() => { }}
            />
            <Text style={{ color: colors.darkText, fontSize: 18, borderBottomWidth: 1, borderColor: "rgba(0,0,0,.15)" }} >USD</Text>
          </View>
          <Text style={{ color: colors.subtitleText, alignSelf: 'center' }} >Cambio: 1USD = 73,50 ARS</Text>
        </View>
      </View>
    </View>
    <View style={{ width: '100%' }}>
      <View style={{ width: '100%', backgroundColor: '#F5F5F5', padding: 20 }} >
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
          <Text style={{ color: colors.subtitleText, fontSize: 18 }} >Comision VIX</Text>
          <Text style={{ color: colors.subtitleText, fontSize: 18 }} >0 ARS</Text>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
          <Text style={{ fontSize: 20, color: colors.primary, fontWeight: 'bold' }} >TOTAL</Text>
          <Text style={{ color: colors.primary, fontWeight: 'bold', fontSize: 24 }} >{`${ammount || 0} ARS`}</Text>
        </View>
      </View>
      <Button
        mode="contained"
        color={colors.accent}
        style={{ borderRadius: 0 }}
        onPress={onSubmit}
        disabled={_.isEmpty(ammount)}
        labelStyle={{ color: colors.primary, paddingVertical: 10, fontWeight: "bold" }}
      >Continuar</Button>
    </View>
  </ScrollView>
)

const DestinyOriginStep = ({
  destinyCard,
  item, colors,
  handleSetCard,
  _goToNextPage,
  navigation, user,
  origin, originCard, cards
}) => {
  let cardsElement = origin ? cards : user.cards || []
  return (
    <View style={{ width: WINDOW_WIDTH, flex: 1 }} >
      <View style={{ paddingHorizontal: 15, flex: 1 }} >
        <View style={{ marginBottom: 40 }} >
          <Text style={{
            color: colors.darkText,
            fontWeight: "bold",
            fontSize: 16,
            marginBottom: 20
          }}>Enviar dinero a</Text>
          <ContactCard firstName={user.name} lastName="" />
        </View>
        <View>
          <View style={{ flexDirection: 'row', justifyContent: 'space-between' }} >
            <Text style={{
              color: colors.darkText,
              fontWeight: "bold",
              fontSize: 16,
              marginBottom: 20
            }}>{item.subtitle}</Text>
            <TouchableOpacity
              onPress={() => origin
                ? navigation.push("InsertCard")
                : navigation.push("DestinyCard", { handleSetCard })
              }
              activeOpacity={0.5}
            >
              <Text style={{ color: colors.accent, fontWeight: 'bold' }} >Nueva tarjeta</Text>
            </TouchableOpacity>
          </View>
          <View>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
            >
              {cardsElement.map((data) => (
                renderItem(data, colors, handleSetCard, origin, originCard, destinyCard)
              ))}
            </ScrollView>
          </View>
        </View>
      </View>
      <View style={{ width: '100%' }}>
        <Button
          mode="contained"
          disabled={origin ? _.isEmpty(originCard) : _.isEmpty(destinyCard)}
          color={colors.accent}
          style={{ borderRadius: 0 }}
          onPress={() => _goToNextPage()}
          labelStyle={{ color: colors.primary, paddingVertical: 10, fontWeight: "bold" }}
        >Continuar</Button>
      </View>
    </View>
  )
}
const SendScene = ({ theme: { colors }, navigation, route: { params }, ...props }) => {
  const listRef = useRef(null)
  const [state, setState] = useState({
    currentSlide: 0,
    formData: {
      reason: "",
      ammount: "",
      card: {
        name: '',
        number: '',
        alias: ''
      },
      originCard: {},
      destinyCard: {}
    }
  })

  const handleSetCard = (field, value) => {
    setState({ ...state, formData: { ...state.formData, [field]: value } })
  }

  const onChange = (field, value) => {
    setState({ ...state, formData: { ...state.formData, [field]: value } })
  }

  const _goToNextPage = () => {
    if (state.currentSlide === steps.length - 1)
      return
    else
      setState({ ...state, currentSlide: ++state.currentSlide })

    listRef.current.scrollToIndex({
      index: state.currentSlide,
      animated: true,
    });
  };

  const handleConvertUSD = () => {
    let pesos = parseFloat(state.formData.ammount)

    if(!state.formData.ammount) return 0
    return pesos / 75
  }

  onSubmit = () => {
    let payload = {}

    if (_.isEmpty(state.formData.destinyCard) && !_.isEmpty(state.formData.card)) {
      payload = {
        contact: {
          name: params.user.name
        },
        card: {
          reference: state.formData.card.alias,
          card_number: state.formData.card.number,
          card_holder_name: state.formData.card.name,
        },
        amount: state.formData.ammount
      }
    } else {
      payload = {
        contact: {
          name: params.user.name
        },
        card: {
          card: state.formData.destinyCard.id
        },
        amount: state.formData.ammount
      }
    }

    props.sendMoney(payload, navigation)
  }

  return (
    <>
      <LinearGradient
        colors={[PRIMARY_LIGHT, PRIMARY_DARK]}
        style={styles.gradient}
        start={[1, 0.3]}
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '25%' }} title="Transferir" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_LIGHT, PRIMARY_DARK]}
        style={{ flex: 1 }}
      >
        {HeaderList(state.currentSlide)}
        <View style={styles.wrapper}>
          <FlatList
            ref={listRef}
            data={steps}
            style={{ flex: 1, marginBottom: -20 }}
            horizontal
            renderItem={({ item }) =>
              item.component({
                ...state,
                item,
                cards: props.cards,
                colors,
                navigation,
                onChange,
                handleSetCard,
                _goToNextPage,
                onSubmit,
                user: params.user,
                origin: item.id === 2,
                originCard: state.formData.originCard,
                destinyCard: state.formData.destinyCard,
                usdConvertion: (handleConvertUSD()).toFixed(2)
              })
            }
            keyExtractor={item => item.id}
            scrollEnabled={false}
            showsHorizontalScrollIndicator={false}
          />

        </View>
      </LinearGradient>
    </>
  )
}

export default connect(state => ({
  cards: state.InsertCard.cards
}), { sendMoney: actions.sendCardToCard })(withTheme(SendScene))