import React, { useState, useEffect, useRef } from 'react';
import Ionicon from 'react-native-vector-icons/Ionicons'
import { Camera } from 'expo-camera';
import { connect } from 'react-redux'
import { Text, View, TouchableOpacity } from 'react-native';

import actions from '../../redux/Profile/actions'
import { styles } from './index.style'
import { SECONDARY } from '../../styles/colors'

function CameraScene(props) {
  const [type, setType] = useState(Camera.Constants.Type.front)
  const [flash, setFlash] = useState(null)
  const [cameraRef, setCameraRef] = useState(null)

  useEffect(() => {
    (async () => {
      props.useCamera()
    })();
  }, []);

  async function snap() {
    if(cameraRef) {
      let photo = await cameraRef.takePictureAsync()
      await props.takePicture(photo.uri)
      await props.navigation.goBack()
    }
  }

  function toggleFlash() {
    const { on, off } = Camera.Constants.FlashMode
    setFlash(flash === on ? off : on)
  }

  if (props.hasPermission === null) {
    return <View />;
  }
  if (props.hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={{ flex: 1 }}>
      <Camera 
        ref={ref => setCameraRef(ref)} 
        style={{ flex: 1 }} 
        type={type}
        flashMode={flash}
      >
        <View 
          style={{
            flex: 1,
            alignItems: 'flex-start',
            flexDirection: 'row',
            justifyContent: 'flex-end',
            backgroundColor: 'transparent',
            paddingVertical: 30,
            paddingHorizontal: 20
          }}
        >
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={toggleFlash}>
            <Ionicon name={flash ? 'ios-flash' : 'ios-flash-off'} size={25} color="#FFF" />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flex: 1,
            alignItems: 'flex-end',
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: 'transparent',
            padding: 20
          }}>
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => {
              setType(
                type === Camera.Constants.Type.back
                  ? Camera.Constants.Type.front
                  : Camera.Constants.Type.back
              );
            }}>
            <Ionicon name='md-reverse-camera' size={25} color="#FFF" />
          </TouchableOpacity>
          <TouchableOpacity
            style={{
              width: 60,
              height: 60,
              alignItems: 'center',
              justifyContent: 'center',
              borderWidth: 3,
              borderColor: '#FFF',
              borderRadius: 50,
              backgroundColor: SECONDARY
            }}
            onPress={snap}>
            <View style={{ borderWidth: 2, borderColor: '#333', width: 55, height: 55, borderRadius: 50, alignItems: 'center', justifyContent: 'center' }} >
              <Ionicon name='md-camera' size={25} color="#FFF" />
            </View>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.cameraIcon}
            onPress={() => {}} 
          >
            <Ionicon name='md-close' size={25} color="#FFF" />
          </TouchableOpacity>
        </View>
      </Camera>
    </View>
  );
}

export default connect(state => ({
  hasPermission: state.Profile.hasPermission
}), { 
  useCamera: actions.useCamera, 
  takePicture: actions.snap,
})(CameraScene)