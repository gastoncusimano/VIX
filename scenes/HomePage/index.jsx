import React, { useEffect, useState } from 'react'
import { RefreshControl, View, ScrollView, Image, StyleSheet, FlatList} from 'react-native'
import { withTheme, TouchableRipple } from 'react-native-paper'
import * as _ from 'lodash';
import moment from 'moment';

import { connect } from 'react-redux';
import actions from '../../redux/Auth/actions'
/* STYLE COMPONENTS */

/* OWN COMPONENTS */
import HeaderHomeCharts from '../../components/HeaderHome/index.js'
import ContentCard from '../../components/ContentCardHome'
import ActivityItem from '../../components/ActivityItemHome'
/* OWN COMPONENTS */

const linedata = {
  labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY'], //LABELS DE ABAJO
  datasets: [
    {
      data: [20, 45, 28, 80, 120], // VALORES
      strokeWidth: 2, // optional
    },
  ],
}; 

const API_URL = "https://api.ityou.works/"

function Item(item) {
  let image_url = item.item.image[0].url
  return (
      <TouchableRipple>
        <View>
          <Image 
            style={{width: '100%', height: 200, width: 310, zIndex: 1, borderRadius: 10, justifyContent:'center', alignContent: 'center',  alignItems: 'center'}}
            source={{uri: `${API_URL}${image_url}`}}>
          </Image>
        </View>
      </TouchableRipple>
  );
}

function Home (props) {
  const [state, setState] = useState({banners: []})
  const [refreshing, setRefreshing] = useState(false);

  const initializedData = () => {
      fetch(`https://api.ityou.works/banners`, {
        method: 'GET'
      })
      .then(function(response) {
        return response.json();
      })
      .then(function(bannerData) {
        setState({...state, banners: bannerData })
      });
    }
  useEffect(() => {
    initializedData()
  }, [])

  const _onRefresh = () => {
    setRefreshing(true)
    props.fetchUser(props.token)
    setRefreshing(false)
  }

  const mapper = {
    dataTransactionToContentCard: (transaction) => {
      return {
        value: transaction.amount,
        status: transaction.debit_or_credit === 'C' ? 'more' : 'less',
        title: transaction.debit_or_credit === 'C' ? "Recibí dinero" : "Envié dinero",
        description: transaction.debit_or_credit === 'C' ? 'Crédito' : "Débito",
        date: moment(transaction.date).format('DD-MM-yyyy')
      }
    }
  }



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
        
      </ScrollView>
    </View>
  )
}

export default connect(state => ({
  profile: state.Auth.profile,
  token: state.Auth.idToken
}), {fetchUser: actions.fetchUser})(withTheme(Home))
