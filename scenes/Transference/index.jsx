import _ from 'lodash'
import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import { Ionicons } from '@expo/vector-icons'
import * as Animatable from 'react-native-animatable'
import { View, FlatList } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Searchbar, Title, Text, Avatar, withTheme, TouchableRipple } from 'react-native-paper'


/* STYLES - ACTIONS - OWN COMPONENTS */
import { 
  styles, 
  Container 
} from './index.style'
import actions from '../../redux/Contacts/actions'
import { PRIMARY, SECONDARY } from '../../styles/colors'
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
              color={colors.accent}
              style={[styles.avatarIcon, { borderColor: "rgba(255,111,31,.25)" }]} 
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
  page,
  theme: { colors }, 
  contacts, 
  navigation, 
  changePage,
  nextPaging,
  getContacts, 
}) {
  const [state, setState] = useState({ query: "", searcheable: false })
  const _handleSearch = (query) => setState({ ...state, query })
  const navigationToView = (path, props) => navigation.push(path, { ...props })
  const _handleSearchActive = () => setState({ ...state, searcheable: !state.searcheable })
  const handleNavigate = _.debounce(navigationToView, 180)

  const getItemLayout = (data, index) => ({length: 50, offset: 50 * index, index})
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
      handleNavigate("SendMoney", { user: object, numberParsed: number, exists})
      // if (exists) {
      // } else {
      //   handleNavigate("NoFound", { user: object })
      // }
    });
  }
  const filterContacts = (query) => {
    return query 
      ? contacts.filter((data) => data.name.indexOf(query) > -1 ) 
      : contacts
  }

  useEffect(() => {
    if(nextPaging)
      getContacts(page)
  }, [page])
  
  return (
    <>
      <LinearGradient 
        colors={[SECONDARY,PRIMARY]} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
          {!state.searcheable ? (
            <>
              <Appbar.BackAction onPress={navigation.goBack} color="white" />
              <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '25%' }} title="Transferencia" />
              <Appbar.Action icon="magnify" color="white" onPress={_handleSearchActive} />
            </>
          ) : (
            <Animatable.View animation="slideInRight" duration={500} style={{flex: 1  }}>
              <Searchbar
                icon="arrow-left"
                value={state.query}
                theme={{ colors: { text: colors.darkText } }}
                iconColor={colors.darkText}
                inputStyle={{ fontSize: 16 }}
                placeholder="Ingrese un nombre o telefono"
                onIconPress={_handleSearchActive}
                onChangeText={_handleSearch}
                placeholderTextColor={colors.subtitleText}
              />
            </Animatable.View>
          )}
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[SECONDARY,PRIMARY]} 
      >
        <Container>
          <FlatList
            data={filterContacts(state.query)}
            ListHeaderComponent={() => (
              <View style={{ paddingHorizontal: 15 }}>
                <Title style={{ color: colors.subtitleText, marginVertical: 0, marginBottom: 10 }} >Contactos</Title>
              </View>
            )}
            initialNumToRender={10}
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
            onEndReached={changePage}
            getItemLayout={getItemLayout}
            maxToRenderPerBatch={10}
            onEndReachedThreshold={0.1}
          />
        </Container>
      </LinearGradient>
    </>
  );
}

export default connect(state => ({ ...state.Contacts }),{
  changePage: actions.changePage,
  getContacts: actions.getContacts,
})(
  withTheme(TransferScene)
)