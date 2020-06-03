import 'react-native-gesture-handler';
import React, { useEffect } from 'react';
import Router from './navigations/router'
import {StatusBar} from 'react-native';
import { configureFonts, DefaultTheme, Provider as PaperProvider } from 'react-native-paper';
import { store } from './redux/store'
import { useFonts } from '@use-expo/font';
import { AppLoading } from 'expo'
import { Provider, connect } from 'react-redux'


/* COLORS - UTILS*/
import actions from './redux/Auth/actions'
import { PRIMARY, SECONDARY, WHITE, BLACK, GRAY_DARK, GRAY_LIGHT } from './styles/colors'
/* COLORS- UTILS */


const fontConfig = {
  default: {
    regular: {
      fontFamily: 'montserrat',
      fontWeight: 'normal',
    },
    medium: {
      fontFamily: 'montserrat',
      fontWeight: 'normal',
    },
    light: {
      fontFamily: 'montserrat',
      fontWeight: 'normal',
    },
    thin: {
      fontFamily: 'montserrat',
      fontWeight: 'normal',
    },
  },
};


const theme = {
  ...DefaultTheme,
  fonts: configureFonts(fontConfig),
  colors: {
    ...DefaultTheme.colors,
    text: WHITE,
    accent: SECONDARY,
    primary: PRIMARY,
    darkText: BLACK,
    subtitleText: GRAY_DARK,
  }
}


function App(props) {
  let [fontsLoaded] = useFonts({
    'montserrat': require('./assets/Fonts/Montserrat-Medium.ttf'),
  });

  useEffect(() => {
    store.dispatch(actions.getToken())
  }, [])

  if (!fontsLoaded) {
    return <AppLoading />;
  } else {
    return (
      <Provider store={store}>
        <PaperProvider theme={theme} >
          <StatusBar translucent backgroundColor="#00000000" />
          <Router/>
        </PaperProvider>
      </Provider>
    )
  }
}

export default App
