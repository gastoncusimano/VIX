import { 
  takeLatest, 
  all, put, fork , call
} from 'redux-saga/effects'
import _ from 'lodash'
import actions from './actions'
import { Camera } from 'expo-camera'
import * as ImagePicker from 'expo-image-picker'
import * as Permissions from 'expo-permissions'

export function* handleImagePicker() {
  yield takeLatest(actions.GET_IMAGE_USER, function*() {
    const { status } = yield call(
      [Permissions, Permissions.askAsync],
      Permissions.CAMERA_ROLL
    )

    if(status === 'granted') {
      const result = yield call(
        [ImagePicker, ImagePicker.launchImageLibraryAsync],
        {        
          aspect: [4, 3],
          quality: 1,
          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsEditing: true,
        }
      )

      if(!result.cancelled) {
        console.log(result)
        yield put({
          type: actions.GET_IMAGE_USER_SUCCESS,
          payload: result.uri
        })
      }
    } else {
      alert('Sorry, we need camera roll permissions to make this work!');
    }
    /// ACTIONS
  })
}

export function* handleCamera() {
  yield takeLatest(actions.USE_CAMERA, function*() {
    const { status } = yield call([Camera, Camera.requestPermissionsAsync])
    console.log("ENTRA")
    if(status === 'granted') {
      yield put({ type: actions.CAMERA_PERMISSION_SUCCESS })
    } else {
      yield put({ type: actions.CAMERA_PERMISSION_DENIED })
    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(handleCamera),
    fork(handleImagePicker),
  ])
}