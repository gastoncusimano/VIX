import _ from 'lodash'
import React from 'react'
import { View, Image, TouchableWithoutFeedback } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient';
import * as Animatable from 'react-native-animatable'
import { Appbar, Text, withTheme, TouchableRipple, Button, List, Checkbox } from 'react-native-paper'
import {AntDesign, FontAwesome} from '@expo/vector-icons'


/* STYLES */
import { styles, Container } from './index.style'
import { ScrollView } from 'react-native-gesture-handler';
/* STYLES */

class ShowPayment extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            total: 0,
            data: [{
                id: 123456785,
                expires: "10/05/2020",
                amount: 800,
                checked: true,
            },{
                id: 123456786,
                expires: "10/04/2020",
                amount: 300,
                checked: false,
            },{
                id: 123456787,
                expires: "10/02/2020",
                amount: 700,
                checked: false,
            },{
                id: 123456788,
                expires: "11/01/2020",
                amount: 1200,
                checked: false,
            },{
                id: 123456789,
                expires: "07/12/2019",
                amount: 300,
                checked: false,
            }]
        }
    }
    componentDidMount() {
        this.sumTotal()
    }

    sumTotal = () => {
        let total = _.sumBy(this.state.data, (obj) => obj.checked ? obj.amount : 0)
        this.setState({...this.state, total: total})
    }
   
  render() {
    const { navigation } = this.props
    const { item }  = this.props.route.params

    const onCheckChanged = (id) => {
        const data = this.state.data;
        const index = data.findIndex(x => x.id === id);
        data[index].checked = !data[index].checked;
        this.setState({...this.state, data});
        this.sumTotal();
    }

    
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
          <Text style={{color: '#FF6F1F', fontWeight: 'bold', paddingLeft: 18,marginTop: 20, fontSize: 22}}>{item.name}</Text>
          <Text style={{color: 'black', opacity: 0.4, paddingLeft: 18, fontSize: 12}}>{item.type}</Text>
          {item.debt ? 
                <View style={{paddingHorizontal:5}}>
                    <ScrollView>
                        <List.Section>
                            {this.state.data?.map(objeto => <List.Item
                                title={objeto.id}
                                description={`Vencimiento: ${objeto.expires}`}
                                titleStyle={{color:'black'}}
                                descriptionStyle={{color: 'rgba(0,0,0,.4)', fontSize: 12}}
                                left={() =>  <Checkbox
                                    status={objeto.checked ? 'checked' : 'unchecked'}
                                    onPress={() => onCheckChanged(objeto.id) }
                                />}
                                right={() =><Text style={{color:'#F60000', fontSize:16, paddingTop: 10}}>$ {parseFloat(objeto.amount).toFixed(2)}</Text>} /> 
                            )}
                        </List.Section>
                    </ScrollView>
                    <View>
                        <Text style={{color:'black', borderTopWidth: 1, paddingLeft: 40, paddingTop: 26, marginHorizontal: 10, fontSize:18, borderColor: 'rgba(0,0,0,.1)'}}>TOTAL:</Text>
                        <Text style={{color: '#f60000', right: 10, top: 26, fontSize: 18,position: 'absolute'}}>$ {parseFloat(this.state.total).toFixed(2)}</Text>
                    </View>
                    <View style={{marginTop:30}}>
                        <Text style={{color: '#FF6F1F', borderWidth: 1, borderColor: '#FF6F1F', marginHorizontal:10, borderRadius: 10, padding: 7, textAlign:'center'}}>TU SALDO ES DE $ 122.37</Text>
                        <Button 
                            mode="contained"
                            style={{ width: "94%", marginHorizontal: 10, marginTop: 10 }}
                            theme={{ colors: { primary: '#FF6F1F' } }}
                            onPress={() => {alert("Pago cancelado, saldo insuficiente")}} 
                            labelStyle={{ color: 'white'}}
                            >
                                Pagar
                            </Button>
                    </View>
                </View>
          :
            <View style={{alignItems: 'center', justifyContent: 'center', flex: 1, maxHeight: '55%'}}>
                <Image source={require('../../assets/OK.png')} style={{width: 80, height: 80}} />
                <Text style={{color: 'black', paddingTop: 30, fontSize: 20}}>No hay deudas</Text>
            </View>
          
          }
        </View>
        </LinearGradient>
      </>
    )
  }
} 


export default withTheme(ShowPayment)
