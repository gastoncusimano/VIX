import React from 'react'
import { View, ScrollView, RefreshControl, StyleSheet, TouchableHighlight, Dimensions} from 'react-native'

import Animated, { Easing } from 'react-native-reanimated';
import {MaterialIcons} from '@expo/vector-icons'
/* OWN COMPONENTS */
import QuickActions from '../QuickActions/index.js'
import { LinearGradient } from 'expo-linear-gradient';
import { TapGestureHandler, State, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import { connect } from 'react-redux';
import NumberFormat from 'react-number-format';
import * as _ from 'lodash';

import {
  LineChart,
} from 'react-native-chart-kit'
import { Text, withTheme } from 'react-native-paper';

const DEVICE_HEIGHT = Dimensions.get("window").height 

const linedata = {
  labels: ['ENE', 'FEB', 'MAR', 'ABR', 'MAY'], //LABELS DE ABAJO
  datasets: [
    {
      data: [0, 0, 0, 0, 0], // VALORES
      strokeWidth: 2, // optional
    },
  ],
}; 

const {
  Value,
  event,
  block,
  cond,
  eq,
  set,
  Clock,
  startClock,
  stopClock,
  debug,
  timing,
  clockRunning,
  interpolate,
  Extrapolate,
  concat
} = Animated;

function runTiming(clock, value, dest) {
  const state = {
    finished: new Value(0),
    position: new Value(0),
    time: new Value(0),
    frameTime: new Value(0)
  };

  const config = {
    duration: 400,
    toValue: new Value(0),
    easing: Easing.inOut(Easing.ease)
  };

  return block([
    cond(clockRunning(clock), 0, [
      set(state.finished, 0),
      set(state.time, 0),
      set(state.position, value),
      set(state.frameTime, 0),
      set(config.toValue, dest),
      startClock(clock)
    ]),
    timing(clock, state, config),
    cond(state.finished, debug('stop clock', stopClock(clock))),
    state.position
  ]);
}

class HomeHeaderCharts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refreshing: false
    }
    this.graphOpacity = new Value(1);

    this.onStateChange = event([
      {
        nativeEvent: ({ state }) =>
          block([
            cond(
              eq(state, State.END),
              set(this.graphOpacity, runTiming(new Clock(), 1, 0)),
            )
          ])
      }
    ]);

    this.onOpenState = event([
      {
        nativeEvent: ({ state }) =>
        block([
          cond(
            eq(state, State.END),
            set(this.graphOpacity, runTiming(new Clock(), 0, 1)),
            )
          ])
      }
    ]);

    this.heightDividir = interpolate(this.graphOpacity, {
      inputRange: [0, 1],
      outputRange: [DEVICE_HEIGHT / 3.8, DEVICE_HEIGHT / 1.6],
      extrapolate: Extrapolate.CLAMP
    });


    this.arrowDown = interpolate(this.graphOpacity, {
      inputRange: [0, 0.5],
      outputRange: [100, 0],
      extrapolate: Extrapolate.CLAMP
    });
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: "100%"}}>
        <LinearGradient 
          colors={['#F60000', '#FF6F1F']}
          start={[0, 0.6]}
          end={[1, 0.3]}
          style={{
            left: 0,
            right: 0,
            top: 0,
            elevation: 3,
            paddingBottom: 5
          }}>
          <Animated.View
              style={{width: '100%',backgroundColor: "#f9130600", height: this.heightDividir, zIndex: 1, display: 'flex', paddingTop: 35}}
              >
              <TouchableHighlight activeOpacity={0.8} underlayColor="rgba(255,255,255,.1)" style={{borderRadius: 35, minHeight: 50}} onPress={() => this.props.navigation.navigate("Movimientos")}>
                  <View style={styles.amountCard}>
                    <Text style={{fontSize: 23}}>$ <NumberFormat value={!_.isEmpty(this.props.profile.customer.accounts) ? this.props.profile?.customer?.accounts[0]?.balance : 0} displayType={'text'} thousandSeparator={'.'} decimalSeparator={','} decimalScale={2} fixedDecimalScale renderText={value => <Text style={{color: 'white', fontSize: 40}}>{value}</Text>} /></Text>
                    <Text style={{textTransform: 'uppercase', color: 'white', opacity: .9, fontSize: 12}}>Dinero en cuenta</Text>
                    <View style={{position: 'absolute', right: -10}}>
                        <MaterialIcons name="keyboard-arrow-right" color="white" size={32}/>
                    </View>
                  </View>
              </TouchableHighlight>
              <Animated.View style={{ top: 50, opacity: this.graphOpacity}}>
                <LineChart
                  data={this.props.data ? this.props.data : linedata}
                  width={Dimensions.get('window').width} // from react-native
                  height={180}
                  yAxisSuffix=" k"
                  animate
                  animationDuration={300}
                  chartConfig={{
                      fillShadowGradientOpacity: 240,
                      backgroundGradientFromOpacity: 0,
                      backgroundGradientToOpacity: 0.5,
                      backgroundGradientFrom: '#f91306',
                      backgroundGradientTo: '#ff5e1a',
                      decimalPlaces: 0, // optional, defaults to 2dp
                      color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
                      propsForDots: {
                        r: "6",
                        strokeWidth: "2",
                      }
                }}
                bezier
                style={{
                    position: 'absolute',
                    zIndex: 5,
                }}
                />
              </Animated.View>
              <TapGestureHandler onHandlerStateChange={this.onStateChange}>
                <Animated.Text style={{justifyContent: 'center', alignSelf: 'center', position: 'absolute', bottom: 35, opacity: this.graphOpacity}}>
                  <MaterialIcons name="keyboard-arrow-up" color="white" size={32} />
                </Animated.Text>
              </TapGestureHandler>
              <TapGestureHandler onHandlerStateChange={this.onOpenState}>
                <Animated.Text style={{justifyContent: 'center', alignSelf: 'center', position: 'absolute', bottom: 35, opacity: this.arrowDown}}>
                  <MaterialIcons name="keyboard-arrow-down" color="white" size={32} />
                </Animated.Text>
              </TapGestureHandler>
          </Animated.View>
          </LinearGradient>
          <QuickActions navigation={this.props.navigation} />
        </ScrollView>
      </View>
    )
  }
}
export default connect(state => ({
  profile: state.Auth.profile
}), {})(withTheme(HomeHeaderCharts))
// export default withTheme(HomeHeaderCharts)

const styles = StyleSheet.create({
  circleAvatar: {
    position: 'absolute',
    top: 45,
    backgroundColor: 'rgba(0,0,0, .15)',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 10,
    borderRadius: 50
  },
  circleTextAvatar: {
    opacity: 1,
    fontSize: 16,
    color: 'white',
    fontWeight:'bold'
  },
  welcomeText: {
    position: 'absolute',
    top: 55,
    left: 60
  },
  circleBell: {
    position: 'absolute',
    top: 45,
    right: 10,
    backgroundColor: 'rgba(255, 255, 255, .3)',
    width: 40,
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50
  },
  amountCard: {
    flex: 1,
    textAlign: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 25
  },
  arrowCollapsable: {
   
  }
});