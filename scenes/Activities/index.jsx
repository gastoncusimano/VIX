import _ from 'lodash';
import moment from 'moment';
import { connect } from 'react-redux'
import React, { useEffect, useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { Appbar, Text } from 'react-native-paper'
import { styles, Container } from './index.style'
import { LinearGradient } from 'expo-linear-gradient'


import actions from '../../redux/Auth/actions'

/* ASSETS - OWN COMPONENTS */
import { PRIMARY_DARK, PRIMARY_LIGHT } from '../../styles/colors'
import ActivityItem from '../../components/ActivityItemHome'
/*ASSETS - OWN COMPONENTS */

function ActivitiesScene({ navigation, data, filters, ...props }) {
  const [refreshing, setRefreshing] = useState(false);

  const mapper = {
    dataTransactionToContentCard: (transaction) => {
      let customer = transaction.related_transaction.customer
      let initials = `${ customer.first_name ? customer.first_name.charAt(0).toUpperCase() : 'N'}${customer.second_name ? customer.second_name.charAt(0).toUpperCase() : "N"}`
      return {
        initials,
        date: moment(transaction.date).format('DD-MM-yyyy'),
        title: `${customer.first_name} ${customer.second_name}`,
        value: transaction.amount,
        status: transaction.debit_or_credit === 'C' ? 'more' : 'less',
        description: transaction.debit_or_credit === 'C' ? 'Crédito' : "Débito",
      }
    }
  }

  const [state, setState] = useState({transactions: []})
  useEffect(() => {
    fetch(`https://api.ityou.works/vix/transactions`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${props.token}`
        }
      }).then((res) => res.json()).then((res) => console.log(res))
  }, [])
  // https://api.ityou.works/vix/transactions
  const _onRefresh = () => {
    setRefreshing(true)
    props.fetchUser(props.token)
    setRefreshing(false)
  }

  return (
    <>
      <LinearGradient 
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }} >
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '15%' }} title="Última Actividad" />
          <Appbar.Action icon="tune" onPress={() => navigation.push("Filtros")} />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
      >
        <Container>
          {!_.isEmpty(props.transactions) ?
            <FlatList
              refreshControl={
                <RefreshControl
                  refreshing={refreshing}
                  onRefresh={_onRefresh}
                />
              }
              data={_.reverse(props.transactions)}
              renderItem={({ item }) => <ActivityItem {...mapper.dataTransactionToContentCard(item)} onPress={() => navigation.push("Filters")} />}
              keyExtractor={item => item.id.toString()}
            />
           :
          <Text style={{color: '#333', fontSize: 18, padding: 16}}>No hay movimientos</Text>}
        </Container>
      </LinearGradient>
    </>
  )
}

export default connect(state => ({
  transactions: !_.isEmpty(state.Auth.profile.customer?.transactions) ? state.Auth.profile.customer?.transactions :  [],
  token: state.Auth.idToken,
  filters: state.Activities.filters,
}),
{fetchUser: actions.fetchUser})(ActivitiesScene)