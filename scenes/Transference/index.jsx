import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { View, FlatList,Image, TextInput } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Title, Text, Avatar, withTheme, TouchableRipple } from 'react-native-paper'
import { Feather, AntDesign, FontAwesome } from '@expo/vector-icons'; 
import QuickActions from '../../components/QuickActions/index'

/* STYLES - ACTIONS - OWN COMPONENTS */
import { 
  styles, 
  Container 
} from './index.style'
import actions from '../../redux/Contacts/actions'
import transferActions from '../../redux/Transfer/actions'
import { PRIMARY, SECONDARY, PRIMARY_DARK, PRIMARY_LIGHT } from '../../styles/colors'
/* STYLES - ACTIONS - OWN COMPONENTS END*/



const ContactItem = ({ title, subtitle, image, colors, _numberVerification}) => {
  return (
    <TouchableRipple 
      rippleColor="rgba(0,0,0,.15)" 
      style={styles.contactItem}
      onPress={_numberVerification}
    >
      <>
        {image 
          ? <Avatar.Image source={image} size={50} style={{ marginRight: 10 }} /> 
          : (
            <Avatar.Icon 
              icon="account" 
              size={50} 
              color={SECONDARY}
              style={[styles.avatarIcon, { borderColor: "#cccccc55" }]} 
            />
          )
        }
        <View>
          <Title style={{ color: colors.darkText, fontSize: 16, marginVertical: 0 }} >{title}</Title>
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Ionicons color={colors.subtitleText} name="ios-call" mode="outline" size={16} />
            <Text style={{ color: colors.subtitleText, marginLeft: 5 }} >{subtitle}</Text>
          </View>
        </View>
      </>
    </TouchableRipple>
  )
} 

function TransferScene({ 
  profile,
  theme: { colors }, 
  contacts, 
  navigation, 
  getContacts, 
  cardsRequest,
}) {
  const [state, setState] = useState({ query: "", searcheable: false })
  const _handleSearch = (query) => setState({ ...state, query })
  const navigationToView = (path, props) => navigation.push(path, { ...props })
  const _handleSearchActive = () => setState({ ...state, searcheable: !state.searcheable })
  const handleNavigate = _.debounce(navigationToView, 80)

  const _numberVerification = (object) => {
    let number = object.phoneNumbers[0].number.replace(/\s/g , "").replace(/-/g, "")
    fetch(`https://api.ityou.works/user-phones/validate?phone=${number}`, {
      method: 'GET'
    })
    .then(function(response) {
      return response.json();
    })
    .then(function(response) {
      let exists = response.data[0].exists

      handleNavigate("SendMoney", { user: {...object, ...response.data[1]}, numberParsed: number, exists})
      // if (exists) {
      // } else {
      //   handleNavigate("NoFound", { user: object })
      // }
    });
  }
  const filterContacts = (query) => {
    return query 
      ? contacts.contacts.filter((data) => data.name.indexOf(query) > -1 ) 
      : contacts.contacts
  }

  useEffect(() => {
    if (_.isEmpty(contacts.contacts)) {
      getContacts()
      cardsRequest()
    }
  },[])

  return (
    <>
      <LinearGradient 
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, height: 180, backgroundColor: "#00000000" }}>
          <View style={styles.welcomeText}>
            <Text style={{ color: "white", fontSize: 22 }}>
              Hola{"\n"}
              <Text
                style={{ fontWeight: "bold", color: '#ffac00' }}
              >{`${profile.customer?.name} ${profile.customer?.last_name}`}</Text>
            </Text>
          </View>
          <TouchableRipple  onPress={() => {navigation.openDrawer();}} style={styles.circleBell}>
            <Feather name="menu" size={32} color="white" />
          </TouchableRipple>

          {/* Quick Actions*/}
          <View style={{position: 'absolute', bottom: -15, justifyContent: 'center',  width: '100%'}}>
            <QuickActions navigation={navigation}/>
          </View>
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
      >
        <Container>
          <Text style={{fontSize: 18, color: 'black', paddingHorizontal: 20}}>Selecciona a quien deseas enviarle dinero</Text>
          <View style={styles.searchInput}>
            <AntDesign name="search1" color='rgba(0,0,0, 0.4)' size={22} style={{paddingTop: 10, marginLeft: 10}} />
            <TextInput
                placeholderTextColor="rgba(0,0,0, 0.4)"
                style={{ height: 25, borderColor: 'transparent', fontFamily: 'montserrat', paddingHorizontal: 10, color: "rgba(0,0,0, 0.4)", marginVertical: 8, flex: 1}}
                onChangeText={text => _handleSearch(text)}
                placeholder={"Ingrese nombre o número"}
                value={state.q}
            />
            <TouchableRipple onPress={() => _handleSearch(null)}>
                <FontAwesome name="times-circle" color='rgba(0,0,0, 0.2)' size={15} style={{paddingTop: 13, marginRight: 15}} />
            </TouchableRipple>
            </View>
          <FlatList
            style={{maxHeight: '70%'}}
            data={filterContacts(state.query)}
            ListHeaderComponent={() => (
              <TouchableRipple 
                rippleColor="rgba(0,0,0,.15)" 
                style={{...styles.contactItem, marginVertical: 10}}
                onPress={() => {}}
              >
                <>
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <View style={styles.circleQuick}>
                      <Image  source={require('../../assets/cardNew.png')}/>
                    </View>      
                    <View style={{marginEnd: 130}}>
                        <Title style={{ color: colors.darkText, fontSize: 16, marginVertical: 0 }} > Nro de tarjeta</Title>
                        <Text style={{ color: colors.subtitleText, marginLeft: 5 }} >Elegí esta opción si el destinatario no está en tus contactos</Text>
                    </View>
                  </View>
                </>
              </TouchableRipple>
            )}
            renderItem={({ item }) => (
              <ContactItem 
                title={item.name} 
                image={item.image}
                colors={colors}
                subtitle={item.phoneNumbers ? item.phoneNumbers[0].number : ''}
                _numberVerification={() => _numberVerification(item)}
              />
            )}
            keyExtractor={item => item.id}
          />
        </Container>
      </LinearGradient> 
    </>
  );
}

export default connect(state => ({  
  profile: state.Auth.profile,
  contacts: {...state.Contacts}
}),{
  changePage: actions.changePage,
  getContacts: actions.getContacts,
  cardsRequest: transferActions.cardsRequest
})(
  withTheme(TransferScene)
)