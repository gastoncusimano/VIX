import React, { useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Button, withTheme, Text } from 'react-native-paper'

/* STYLES */
import { PRIMARY_LIGHT,PRIMARY_DARK } from '../../../styles/colors'
import { WINDOW_WIDTH } from '../../../styles/mixins'
import { styles } from './index.style'
/* STYLES END*/
import ContactCard from './components/ContactCard'

const steps = [{
  id: 1,
  component: <Text style={{ color: '#333' }}>STEP 1</Text>
},{
  id: 2,
  component: <Text style={{ color: '#333' }}>STEP 2</Text>
},{
  id: 3,
  component: <Text style={{ color: '#333' }}>STEP 2</Text>
}]

const HeaderList = (currentSlide) => (
  <View style={styles.headerContainer}>
    <View style={styles.itemHeader}>
      <Text>Destino</Text>
      {currentSlide === 0 &&
        <View style={styles.activeIndicator} />
      }
    </View>
    <View style={styles.itemHeader}>
      <Text>Origen</Text>
      {currentSlide === 1 &&
        <View style={styles.activeIndicator} />
      }
    </View>
    <View style={styles.itemHeader}>
      <Text>Monto</Text>
      {currentSlide === 2 &&
        <View style={styles.activeIndicator} />
      }
    </View>
  </View>
)

const SendScene = ({ theme: { colors }, navigation}) => {
  const listRef = useRef(null)
  const [state, setState] = useState({
    currentSlide: 0,
    formData: {
      reason: "",
      ammount: "",
      card: {
        name: '',
        number: '',
        alias: ''
      },
      originCard: {},
      destinyCard: {}
    }
  })

  const _goToNextPage = () => {
    if (state.currentSlide === state.steps.length - 1) 
      return
    else
      setState({ ...state, currentSlide: ++state.currentSlide })

    listRef.current.scrollToIndex({
      index: state.currentSlide,
      animated: true,
    });
  };

  return (
    <>
      <LinearGradient 
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        style={styles.gradient} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }}>
          <Appbar.Content titleStyle={{ fontSize: 18, paddingLeft: '38%' }} title="Transferir"  />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[PRIMARY_LIGHT,PRIMARY_DARK]} 
        style={{ flex: 1 }}
      >
        {HeaderList(state.currentSlide)}
        <View style={styles.wrapper}>
          <FlatList
            data={steps}
            ref={listRef}
            horizontal
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({item}) => (
              <View style={{ width: WINDOW_WIDTH, paddingHorizontal: 15 }} >
                {item.component}
              </View>
            )}
          />

        </View>
      </LinearGradient>
    </>
  )
}

export default withTheme(SendScene)