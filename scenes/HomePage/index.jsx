import React, { useEffect, useState } from 'react'
import { RefreshControl, View, ScrollView, Image, StyleSheet, FlatList} from 'react-native'
import * as _ from 'lodash';
import moment from 'moment';
import { Ionicons } from '@expo/vector-icons'
import { connect } from 'react-redux';
import actions from '../../redux/Auth/actions'
import actionsContact from '../../redux/Contacts/actions'
import * as Animatable from 'react-native-animatable'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Searchbar, Title, Text, Avatar, withTheme, TouchableRipple } from 'react-native-paper'

/* STYLES - ACTIONS - OWN COMPONENTS */
import { PRIMARY, SECONDARY } from '../../styles/colors'
/* STYLES - ACTIONS - OWN COMPONENTS END*/

/* STYLE COMPONENTS */



function Home ({ 
  page,
  theme: { colors }, 
  contacts, 
  navigation, 
  changePage,
  nextPaging,
  getContacts, 
  token,
}) {
  // const [state, setState] = useState({banners: []})
  const [refreshing, setRefreshing] = useState(false);

  // const initializedData = () => {
  //     fetch(`https://api.ityou.works/banners`, {
  //       method: 'GET'
  //     })
  //     .then(function(response) {
  //       return response.json();
  //     })
  //     .then(function(bannerData) {
  //       setState({...state, banners: bannerData })
  //     });
  //   }
  // useEffect(() => {
  //   initializedData()
  // }, [])

  const _onRefresh = () => {
    setRefreshing(true)
    props.fetchUser(props.token)
    setRefreshing(false)
  }


  const filterContacts = (query) => {
    return query 
      ? contacts.filter((data) => data.name.indexOf(query) > -1 ) 
      : contacts
  }

  const [state, setState] = useState({ query: "", searcheable: false })
  const _handleSearch = (query) => setState({ ...state, query })
  const navigationToView = (path, props) => navigation.push(path, { ...props })
  const _handleSearchActive = () => setState({ ...state, searcheable: !state.searcheable })
  const handleNavigate = _.debounce(navigationToView, 180)

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
  

  useEffect(() => {
    if(nextPaging)
      getContacts(page)
  }, [page])
  

  return (
    <View style={{flex: 1, height: '100%', backgroundColor: 'rgb(243,243,243)'}}>
      <ScrollView 
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={_onRefresh}
          />
        }
        style={{ flex: 1, width: "100%"}} >
        
        <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[SECONDARY,PRIMARY]} 
      >
          <FlatList
            data={[1,2,3,4]}
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
            maxToRenderPerBatch={10}
            onEndReachedThreshold={0.1}
          />
      </LinearGradient>






      </ScrollView>
    </View>
  )
}

export default connect(state => ({
  profile: state.Auth.profile,
  token: state.Auth.idToken,
  contacts: {...state.Contacts}
}), {fetchUser: actions.fetchUser,
    changePage: actionsContact.changePage,
    getContacts: actionsContact.getContacts,
    })(withTheme(Home))






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

const styles = StyleSheet.create({
  contactItem: {
    height: 60,
    alignItems: "center",
    marginBottom: 10,
    flexDirection: "row",
    paddingVertical: 5,
    paddingHorizontal: 15,
  },
  avatarIcon: { 
    marginRight: 10, 
    borderWidth: 1,
    backgroundColor: "#FFF",
  }
})