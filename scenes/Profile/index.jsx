import _ from 'lodash'
import React, { useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome5'
import Ionicon from 'react-native-vector-icons/Ionicons'
import { connect } from 'react-redux'
import * as Animatable from 'react-native-animatable'
import { View, Image } from 'react-native'
import { LinearGradient } from 'expo-linear-gradient'
import { Appbar, Text, withTheme, TouchableRipple, Modal, Portal } from 'react-native-paper'

import actions from '../../redux/Profile/actions'
import {styles, Container} from './index.style'
import { PRIMARY, SECONDARY } from '../../styles/colors'

const ProfileScene = ({ navigation, profile, theme, pickImage, image, deleteImage }) => {
  const [visible, setVisible] = useState(false)
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
          <Appbar.Content titleStyle={{ fontSize: 18, alignSelf: 'center', marginLeft: '-20%' }} title="Mi Perfil" />
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
              onPress={() => setVisible(true)}
              rippleColor="rgba(0,0,0,.05)" 
              style={[styles.circle, { alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }]}
            >
              {image 
                ? <Image source={{ uri: image }} style={{ resizeMode: 'cover', width: '100%', height: '100%' }} /> 
                : (
                <View style={{ alignItems: 'center', justifyContent: 'center' }} >
                  <Icon name="camera" size={20} color={SECONDARY} />
                </View>
              )}
            </TouchableRipple>
            <View style={{ alignItems: 'center', marginBottom: 20 }} >
              <Text style={[styles.title, { color: theme.colors.darkText }]}>{`${profile.name} ${profile.last_name}`}</Text>
              <Text style={[styles.subtitle, { color: theme.colors.subtitleText }]}>{profile.email}</Text>
            </View>
          </View>
          <View style={{ justifyContent: 'center', paddingHorizontal: 30 }} >
            <TouchableRipple rippleColor="rgba(0,0,0,.05)" style={{ marginBottom: 10 }} onPress={() => {}} >
              <View style={styles.card} >
                <View style={styles.iconLeft}>
                  <Text style={{ color: SECONDARY, fontWeight: 'bold' }} >CVU</Text>
                </View>
                <View style={{ flex: 1 }} ><Text style={{ color: theme.colors.darkText }} >Mi CVU</Text></View>
                <Ionicon name="ios-arrow-forward" size={20} color="rgba(0,0,0,.15)" />
              </View>
            </TouchableRipple>
            <TouchableRipple rippleColor="rgba(0,0,0,.05)" style={{ marginBottom: 10 }}  onPress={() => navigation.push("PersonalData")} >
              <View style={styles.card} >
                <View style={styles.iconLeft}>
                  <Icon name="address-card" size={20} color={SECONDARY} />
                </View>
                <View style={{ flex: 1 }} ><Text style={{ color: theme.colors.darkText }} >Datos personales</Text></View>
                <Ionicon name="ios-arrow-forward" size={20} color="rgba(0,0,0,.15)" />
              </View>
            </TouchableRipple>
          </View>
        </Container>
      </LinearGradient>
      <Portal>

        <Modal 
          visible={visible}
          dismissable={true}
          onDismiss={() => setVisible(false)}
          onRequestClose={() => setVisible(false)}
          contentContainerStyle={{ flex: 1, justifyContent: 'flex-end' }}
        >
          <Animatable.View animation="slideInUp" >
            <View style={{ backgroundColor: '#fff', paddingVertical: 10, paddingHorizontal: 20 }}>
              <View>
                <Text style={{ color: theme.colors.subtitleText, marginBottom: 10 }} >Foto de Perfil</Text>
                <View></View>
              </View>
              <View style={{ flexDirection: 'row', paddingBottom: 20 }} >
                <TouchableRipple style={{ marginRight: 10 }} rippleColor="rgba(0,0,0,.15)"  onPress={() => {setVisible(false); handleNavigate('Camera')}}>
                  <View style={styles.iconContainer} >
                    <View style={styles.photoIcon}>
                      <Ionicon name="ios-camera" size={30} color={SECONDARY} />
                    </View>
                    <Text style={{ color: theme.colors.darkText }} >Camara</Text>
                  </View>
                </TouchableRipple>

                <TouchableRipple style={{ marginRight: 10 }} rippleColor="rgba(0,0,0,.15)"  onPress={() => pickImage()} >
                  <View style={styles.iconContainer} >
                    <View style={styles.photoIcon}>
                      <Ionicon name="md-images" size={30} color={SECONDARY} />
                    </View>
                    <Text style={{ color: theme.colors.darkText }} >Galeria</Text>
                  </View>
                </TouchableRipple>
              </View>

              <View style={{ alignItems: 'flex-start' }} >
                <TouchableRipple style={{ marginRight: 10 }} rippleColor="rgba(0,0,0,.15)"  onPress={deleteImage}>
                  <View style={styles.iconContainer} >
                    <View style={styles.photoIcon}>
                      <Ionicon name="md-trash" size={30} color={SECONDARY} />
                    </View>
                    <Text style={{ color: theme.colors.darkText }} >Eliminar</Text>
                  </View>
                </TouchableRipple>
              </View>
            </View>
          </Animatable.View>
        </Modal>
      </Portal>
    </>
  )
}

export default connect(state => ({
  profile: state.Auth.profile,
  image: state.Profile.image,
}), { 
  pickImage: actions.pickImage,
  deleteImage: actions.deleteImage,
})(withTheme(ProfileScene))
