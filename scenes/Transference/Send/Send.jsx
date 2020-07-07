import React, { useRef, useState } from 'react'
import { FlatList, View, TextInput, Image, TouchableOpacity } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Button, withTheme, Text, TouchableRipple } from 'react-native-paper'

/* STYLES */
import { PRIMARY_LIGHT,PRIMARY_DARK } from '../../../styles/colors'
import { WINDOW_WIDTH } from '../../../styles/mixins'
import { styles } from './index.style'
/* STYLES END*/
import ContactCard from './components/ContactCard'

const steps = [{
  id: 1,
  subtitle: "Seleccionar tarjeta destino",
  component: (props) => DestinyOriginStep(props)
},{
  id: 2,
  subtitle: "Seleccionar tarjeta origen",
  component: (props) => DestinyOriginStep(props)
},{
  id: 3,
  subtitle: "Ingresar monto",
  component: (props) => AmmountStep(props)
}]

const renderItem = (data, colors) => {
  return(
    <>
      <View style={{borderRadius: 7, marginTop: 10, padding: 20, borderColor: '#ddd', backgroundColor: '#f6f6f6', borderWidth: 1}}>
        <Image source={require('../../../assets/ico_vix.png')} style={{width: 60, height: 25}} />
        <Image source={require('../../../assets/chipcard.png')} style={{width: 50, height: 30, marginTop: 20}} />
        <View style={{paddingTop: 15, paddingHorizontal: 5}}>
          <Text style={{color: '#ddd', fontSize: 18}}>{data.item.item.card_number}</Text>
        </View>
        <View style={{paddingTop: 5,width: '100%'}}>
          <Text style={{color: '#ddd', fontSize: 15, textAlign: 'right', marginRight: 20}}>{data.item.item.expiration_date}</Text>
        </View>
        <View style={{paddingTop: 10,width: '100%'}}>
          <Text style={{color: '#ddd', fontSize: 16, textTransform: 'uppercase'}}>{data.item.item.card_holder_name}</Text>
        </View>
      </View>
      <Text 
        style={{
          color:colors.subtitleText, 
          width:'100%', 
          paddingTop: 10, 
          fontSize: 14,
          fontWeight: 'bold'
        }}>Seleccionada</Text>
    </>
  )
}

const DATA = [
  {
  item: {
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
      first_name: "Cuenta",
      id: 12,
      last_name: null,
      name: null,
      nationality: null,
      place_of_birth: null,
      second_name: "Cuenta",
      tax_id: null,
      updated_at: "2020-05-27T13:47:14.000Z",
      user: 33,
    },
    expiration_date: "10/25",
    id: 64,
    last_four_digits: null,
    reference: "Jajd",
    updated_at: "2020-07-02T12:14:01.000Z",
  },
},
]

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

const AmmountStep = ({ submit, item, colors }) => (
  <View style={{ width: WINDOW_WIDTH, flex: 1 }} >
    <View style={{ paddingHorizontal: 15, flex: 1 }} >
      <View style={{ marginBottom: 40, flexDirection: 'row', justifyContent: 'space-between' }} >
        <View style={{ width: " 50%", marginRight: 5 }} >
          <Text style={{ 
            color: colors.darkText, 
            fontWeight: "bold", 
            fontSize: 16,
            marginBottom: 20
          }}>Enviar dinero a</Text>
          <ContactCard firstName="Gastón" lastName="Cusimano" reference="XXFE4" />
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
          <ContactCard firstName="Bco." lastName="Supervisor" reference="CCFE4" />
        </View>
      </View>
      <View>
        <Text style={{ 
          color: colors.darkText, 
          fontWeight: "bold", 
          fontSize: 16,
          marginBottom: 20
        }}>{item.subtitle}</Text>
        <View style={{ width: "60%", alignSelf: "center", flexDirection: "row" }} >
          <TextInput
            value=""
            style={styles.inputCustom}
            placeholder="$ 0.00"
            placeholderTextColor="#333"
            keyboardType="number-pad"
            onChangeText={() => {}} 
          />
          <Text style={{ color: colors.darkText, fontSize: 18, borderBottomWidth: 1, borderColor: "rgba(0,0,0,.15)" }} >ARS</Text>
        </View>
      </View>
    </View>
    <View style={{ width: '100%' }}>
      <Button 
        mode="contained"
        color={colors.accent}
        style={{ borderRadius: 0 }}
        onPress={() => {}}
        labelStyle={{ color: colors.primary, paddingVertical: 10, fontWeight: "bold" }}
      >Continuar</Button>
    </View>
  </View>
)

const DestinyOriginStep = ({ handleSetCard, _goToNextPage, item, colors, navigation}) => (
  <View style={{ width: WINDOW_WIDTH, flex: 1 }} >
    <View style={{ paddingHorizontal: 15, flex: 1 }} >
      <View style={{ marginBottom: 40 }} >
        <Text style={{ 
          color: colors.darkText, 
          fontWeight: "bold", 
          fontSize: 16,
          marginBottom: 20
        }}>Enviar dinero a</Text>
        <ContactCard firstName="Gastón" lastName="Cusimano" />
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
            onPress={() => item.id === 2 
              ? navigation.push("InsertCard") 
              : navigation.push("DestinyCard", { handleSetCard })
            }
            activeOpacity={0.5}
          >
            <Text style={{ color: colors.accent, fontWeight: 'bold' }} >Nueva tarjeta</Text>
          </TouchableOpacity>
        </View>
        <FlatList
          data={DATA}
          renderItem={(data) => renderItem(data, colors)}
          keyExtractor={({item}) => item.id}
        />
      </View>
    </View>
    <View style={{ width: '100%' }}>
      <Button 
        mode="contained"
        color={colors.accent}
        style={{ borderRadius: 0 }}
        onPress={() => _goToNextPage()}
        labelStyle={{ color: colors.primary, paddingVertical: 10, fontWeight: "bold" }}
      >Continuar</Button>
    </View>
  </View>
)

const SendScene = ({ theme: { colors }, navigation}) => {
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
    setState({ ...state, [field]: value })
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

  return (
    <>
      <LinearGradient 
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '25%' }} title="Transferir"  />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        style={{ flex: 1 }}
      >
        {HeaderList(state.currentSlide)}
        <View style={styles.wrapper}>
          <FlatList
            data={steps}
            ref={listRef}
            style={{ flex: 1, marginBottom: -20 }}
            horizontal
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({item}) => item.component({_goToNextPage, item, colors, navigation, handleSetCard})}
          />

        </View>
      </LinearGradient>
    </>
  )
}

export default withTheme(SendScene)