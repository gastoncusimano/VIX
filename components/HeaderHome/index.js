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
  }
  render() {
    return (
      <View style={{flex: 1}}>
        <ScrollView 
          showsVerticalScrollIndicator={false}
          style={{ flex: 1, width: "100%"}}>
        <LinearGradient 
          colors={['#00315f', '#004e97']}
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
          </Animated.View>
          </LinearGradient>
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