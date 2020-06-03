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
      onPress={() => navigation.push("FormPayment", {item: item} )}
      rippleColor="rgba(0,0,0,.15)">
      <View style={{flexDirection: 'row', paddingHorizontal: 20, paddingVertical: 10}} key={item.type}>
        <View style={{width: '75%'}}>
          <Text style={styles.title}>{item.name} </Text>
          <Text style={{fontSize: 12, color: 'black', opacity: 0.4}}>{item.type}</Text>
        </View>
      </View>
    </TouchableRipple>
    : <View style={{borderTopWidth: 1, borderColor: 'rgba(0,0,0,0.1)', marginHorizontal: 16}}></View>
  );
}

class Payments extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            data: [
            {
              type: "Impuesto",
              debt: true,
              name: 'AFIP',
            },
            {
              type: "Agua",
              debt: false,
              name: 'Aguas Mendocinas',
            },
            {
              type: "Internet",
              debt: false,
              name: 'Arlink',
            },
            {
              type: "Internet",
              debt: true,
              name: 'Arnet',
            },
            {
              type: "Impuesto",
              debt: true,
              name: 'ATM',
            },
            {
              type: "Impuesto",
              debt: false,
              name: 'ATM - Automotor',
            },
            {
              type: "Telefonia",
              debt: true,
              name: 'Claro',
            },
            {
              type: "Internet",
              debt: false,
              name: 'Claro Hogar',
            },
            {
              type: "Television",
              debt: true,
              name: 'DirectTV',
            },
            {
              type: "Internet",
              debt: true,
              name: 'DirectTV Fibra',
            },
            {
              type: "Luz",
              debt: true,
              name: 'Edesur',
            },
            {
              type: "Luz",
              debt: true,
              name: 'Edemsa',
            },
            {
              type: "Gas",
              debt: false,
              name: 'Ecogas',
            },
            {
              type: "Internet",
              debt: true,
              name: 'Fibertel',
            },
            {
              type: "Gas",
              debt: false,
              name: 'Metrogas',
            },
            {
              type: "Telefonia",
              debt: true,
              name: 'Movistar',
            },
            {
              type: "Internet",
              debt: true,
              name: 'Movistar Fibra',
            },
            {
              type: "Internet",
              debt: true,
              name: 'Speedy',
            },
            {
              type: "Telefonia",
              debt: true,
              name: 'Personal',
            },
            {
              type: "Telefonia",
              debt: true,
              name: 'Tuenti',
            },
            ],
            q: ""
        }
    }
  

    
    render() {
        const filterCompany = (query) => {
            return query 
              ? this.state.data.filter((data) => data.name.indexOf(query) > -1 ) 
              : this.state.data
          }
        const { navigation } = this.props
        return(
        <>
            <LinearGradient 
                colors={['#FF6F1F', '#F60000']} 
                style={styles.gradient} 
                start={[1, 0.3]} 
                end={[0, 0.6]}>
                <Appbar.Header  style={{ elevation: 0, backgroundColor: "#00000000" }} >
                <Appbar.BackAction onPress={navigation.goBack} />
                <Appbar.Content titleStyle={{ fontSize: 20, paddingLeft:'12%' }} title="Buscar Empresa" />
                </Appbar.Header>
            </LinearGradient>
            <LinearGradient 
                start={[1, .6]} 
                end={[0, 0.6]} 
                colors={['#FF6F1F', '#F60000']}>
                <View style={styles.containerScroll}>
                <TouchableWithoutFeedback onPress={() => navigation.push("SearchCompany")}>
                    <View style={styles.searchInput}>
                    <AntDesign name="search1" color='rgba(0,0,0, 0.4)' size={22} style={{paddingTop: 10, marginLeft: 10}} />
                    <TextInput
                        placeholderTextColor="rgba(0,0,0, 0.4)"
                        style={{ height: 25, borderColor: 'transparent', fontFamily: 'montserrat', paddingHorizontal: 10, color: "rgba(0,0,0, 0.4)", marginVertical: 8, flex: 1}}
                        onChangeText={text => this.setState({...this.state, q: text})}
                        placeholder={"Buscar"}
                        value={this.state.q}
                        autoFocus
                    />
                    <TouchableRipple onPress={() => navigation.goBack()}>
                        <FontAwesome name="times-circle" color='rgba(0,0,0, 0.2)' size={15} style={{paddingTop: 13, marginRight: 15}} />
                    </TouchableRipple>
                    </View>
                </TouchableWithoutFeedback>
                <Text style={{color: 'black', fontWeight: 'bold', paddingLeft: 18, fontSize: 20}}>Servicios / Impuestos</Text>
                <View style={{maxWidth: '100%', height: '70%', paddingHorizontal: 5, paddingVertical: 10}}>
                    <FlatList
                    data={filterCompany(this.state.q)}
                    renderItem={({ item }) => <Item item={item} navigation={navigation} />}
                    keyExtractor={item => `${item.type}_${item.name}`}
                    />
                </View>
                </View>
            </LinearGradient>
        </>
        )
    }
} 


export default withTheme(Payments)
