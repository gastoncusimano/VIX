import { connect } from 'react-redux'
import React, { useState } from 'react'
import { FlatList, RefreshControl } from 'react-native'
import { Appbar, Text } from 'react-native-paper'
import { styles, Container } from './index.style'
import { LinearGradient } from 'expo-linear-gradient'
import * as _ from 'lodash';
import moment from 'moment';


import actions from '../../redux/Auth/actions'

/* ASSETS - OWN COMPONENTS */
import { PRIMARY, SECONDARY } from '../../styles/colors'
import ActivityItem from '../../components/ActivityItemHome'
/*ASSETS - OWN COMPONENTS */

function ActivitiesScene({ navigation, data, filters, ...props }) {
  const [refreshing, setRefreshing] = useState(false);

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

  const _onRefresh = () => {
    setRefreshing(true)
    props.fetchUser(props.token)
    setRefreshing(false)
  }

  
  return (
    <>
      <LinearGradient 
        colors={[SECONDARY,PRIMARY]} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }} >
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '22%' }} title="Movimientos" />
          <Appbar.Action icon="tune" onPress={() => navigation.push("Filtros")} />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[SECONDARY,PRIMARY]} 
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
   token: state.Auth.idToken}),
  {fetchUser: actions.fetchUser})(ActivitiesScene)