import _ from 'lodash'
import React from 'react'
import { TextInput, View, FlatList, TouchableWithoutFeedback } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable'
import { Appbar, Text, withTheme, TouchableRipple, Button } from 'react-native-paper'
import {AntDesign, FontAwesome} from '@expo/vector-icons'
import { List } from 'react-native-paper';


/* STYLES */
import { styles, Container } from './index.style'
/* STYLES */

function Item({ item, navigation }) {
  return (
    !item.line ? 
      <TouchableRipple
      onPress={() => navigation.push("ShowPayment", {item: item} )}
      rippleColor="rgba(0,0,0,.15)">
      <View style={styles.item} key={item.type}>
        <View style={{width: '75%'}}>
          <Text style={styles.title}>{item.name} </Text>
          <Text style={{fontSize: 12, color: 'black', opacity: 0.4}}>{item.type}</Text>
        </View>
        <View>
          <Text style={{fontSize: 18, textAlign: 'right', color: item.debt ? '#f60000' : '#00c766' }}>{item.debt ?  `$ ${parseFloat(item.amount).toFixed(2)}` : "Sin deuda"}</Text>
          {item.debt ? 
            <Text style={{fontSize: 12, color: 'black', opacity: 0.4, textAlign: 'right'}}>Deuda</Text>
          : null}
        </View>
      </View>
    </TouchableRipple>
    : <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.1)', marginHorizontal: 16}}></View>
  );
}

class Payments extends React.Component {
  state = {
    data: [
      {
        type: "Gas",
        name: 'Ecogas',
        amount: 2300,
        debt: true,
      },
      {
        type: "Impuesto",
        name: 'AFIP',
        amount: 5780,
        debt: true,
      },
      {
        type: "Luz",
        name: 'Edesur',
        amount: 800,
        debt: true,
      },
      {
        type: "",
        name: '',
        amount: 0,
        line: true,
        debt: false,
      },
      {
        type: "Internet",
        name: 'Cablevision',
        amount: '2300',
        debt: false,
      },
      {
        type: "Telefonía",
        name: 'Personal',
        amount: '2300',
        debt: false,
      },
      {
        type: "Internet",
        name: 'DirectTV',
        amount: '2300',
        debt: false,
      },
      {
        type: "Telefonía",
        name: 'Movistar',
        amount: '2300',
        debt: false,
      },
   ],
  }
  render() {
    const { navigation } = this.props

    return(
      <>
      <LinearGradient 
        colors={['#FF6F1F', '#F60000']} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header  style={{ elevation: 0, backgroundColor: "#00000000" }} >
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 20, paddingLeft:'30%' }} title="Pagos" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        start={[1, .6]} 
        end={[0, 0.6]} 
        colors={['#FF6F1F', '#F60000']} 
      >
        <View style={styles.containerScroll}>
          <TouchableWithoutFeedback onPress={() => navigation.push("SearchCompany")}>
            <View style={styles.searchInput}>
              <AntDesign name="search1" color='rgba(0,0,0, 0.4)' size={22} style={{paddingTop: 10, marginLeft: 10}} />
              <Text
                style={{ height: 25, borderColor: 'transparent', paddingHorizontal: 10, color: "rgba(0,0,0, 0.4)", marginVertical: 8, paddingTop:3, flex: 1}}
              >Buscar</Text>
              <FontAwesome name="times-circle" color='rgba(0,0,0, 0.2)' size={15} style={{paddingTop: 13, marginRight: 15}} />
            </View>
          </TouchableWithoutFeedback>
          <Text style={{color: 'black', fontWeight: 'bold', paddingLeft: 18, fontSize: 20}}>Mis Servicios / Impuestos</Text>
          <View style={{maxWidth: '100%', height: '60%', paddingHorizontal: 5, paddingVertical: 10}}>
            <FlatList
              data={this.state.data}
              renderItem={({ item }) => <Item item={item} navigation={navigation} />}
              keyExtractor={item => `${item.type}_${item.name}`}
            />
          </View>
          <View style={styles.footerBtn}>
            <Button
              mode="contained"
              onPress={() => navigation.push("Scanner")}
              theme={{ colors: { primary:  '#FF6F1F'} }}
              style={{ width: "100%", alignSelf: "flex-end", borderRadius: 6 }}
              labelStyle={{ color: 'white' }}>
                LEER CÓDIGO DE BARRAS
            </Button>
          </View>
        </View>
      </LinearGradient>
      </>
    )
  }
} 


export default withTheme(Payments)
