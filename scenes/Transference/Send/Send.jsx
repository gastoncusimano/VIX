import React, { useRef, useState } from 'react'
import { FlatList, View } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Button, withTheme, Text } from 'react-native-paper'

/* STYLES */
import { PRIMARY_LIGHT,PRIMARY_DARK } from '../../../styles/colors'
import { WINDOW_WIDTH } from '../../../styles/mixins'
import { styles } from './index.style'
/* STYLES END*/

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
    steps: [{id: 1}, {id: 2}, {id: 3}]
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
            data={[{id: 1}, {id: 2}, {id: 3}]}
            ref={listRef}
            horizontal
            keyExtractor={item => item.id}
            scrollEnabled={false}
            renderItem={({item}) => (
              <View style={{ width: WINDOW_WIDTH, paddingHorizontal: 15 }} >
                <Text style={{ color: colors.darkText }} >{`HOLA ${item.id}`}</Text>
                <Button mode='contained' onPress={_goToNextPage} >Siguiente</Button>
              </View>
            )}
          />

        </View>
      </LinearGradient>
    </>
  )
}

export default withTheme(SendScene)