import _ from 'lodash'
import React from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { View } from 'react-native'
import { connect } from 'react-redux'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Text, withTheme, TouchableRipple } from 'react-native-paper'

import {styles, Container} from '../index.style'
import { PRIMARY, SECONDARY } from '../../../styles/colors'

const PersonalDataScene = ({ navigation, profile, theme }) => {
  const navigationToView = (path, props) => navigation.push(path, { ...props })
  const handleNavigate = _.debounce(navigationToView, 180)

  return (
    <>
      <LinearGradient 
        colors={[SECONDARY,PRIMARY]} 
        start={[1, 0.3]} 
        end={[0, 0.6]}
      >
        <Appbar.Header style={{ elevation: 0, backgroundColor: "#00000000" }} >
          <Appbar.BackAction onPress={navigation.goBack} />
          <Appbar.Content titleStyle={{ fontSize: 18, alignSelf: 'center', marginLeft: '-20%' }} title="Datos Personales" />
        </Appbar.Header>
      </LinearGradient>
      <LinearGradient 
        end={[0, 0.6]}
        start={[1, .6]}
        colors={[SECONDARY,PRIMARY]} 
      >
        <Container>
          <View style={{ alignItems: 'center' }}>
            <TouchableRipple
              rippleColor="rgba(0,0,0,.05)" 
              style={[styles.circle, { alignItems: 'center', justifyContent: 'center' }]}
            >
              <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                <Icon name="camera" size={20} color={SECONDARY} />
              </View>
            </TouchableRipple>
          </View>
          <View style={{ justifyContent: 'center', paddingHorizontal: 30 }} >
            <View style={{ alignItems: 'center',marginBottom: 20 }} >
              <Text style={{ color: theme.colors.subtitleText }}>Nombre</Text>
              <Text style={{ color: theme.colors.darkText, fontSize: 18 }} >{`${profile.name} ${profile.last_name}`}</Text>
            </View>
            <View style={{ alignItems: 'center',marginBottom: 20 }} >
              <Text style={{ color: theme.colors.subtitleText }}>Mail</Text>
              <Text style={{ color: theme.colors.darkText }} >{profile.email}</Text>
            </View>
            <View style={{ alignItems: 'center',marginBottom: 20 }} >
              <Text style={{ color: theme.colors.subtitleText }}>DNI</Text>
              <Text style={{ color: theme.colors.darkText }} >{profile.dni}</Text>
            </View>
          </View>
        </Container>
      </LinearGradient>
    </>
  )
}

export default connect(state => ({
  profile: state.Auth.profile
}), {})(withTheme(PersonalDataScene))
