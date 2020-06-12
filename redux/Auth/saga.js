import { 
  takeLatest, 
  all, put, fork, call
} from 'redux-saga/effects'
import actions from './actions'
import { store } from '../store'
import { Notifications } from 'expo'
import * as firebase from "firebase"
import config from '../../utils/constants'
import { AsyncStorage } from 'react-native'
import * as Permissions from 'expo-permissions'

const signUp = (body) =>
  fetch(`https://api.ityou.works/auth/local/register`, {
    method: "POST",
    body,
  })
    .then((res) => res.json())
    .catch((error) => ({ error }))

const fetchUser = (token) =>
  fetch(`https://api.ityou.works/user/me`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((error) => ({ error }))

const validatePhone = (phoneNumber) =>
  fetch(`https://api.ityou.works/user-phones/validate?phone=${phoneNumber}`)
    .then((res) => res.json())
    .catch((err) => ({err}))

const login = (body) => 
  fetch(`https://api.ityou.works/auth/local`, {
    method: "POST",
    body,
  })
    .then((res) => res.json())
    .catch((error) => ({error}))
  
export function* loginRequest() {
  yield takeLatest(actions.LOGIN_REQUEST, function*({ payload, navigation }) {
    const formData = new FormData()

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        yield formData.append(key, payload[key])
      }
    }

    const response = yield call(login, formData)

    if(!response.error) {
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: {
          profile: response.user,
          token: response.jwt
        }
      })
    } else {
      yield put({
        type: actions.LOGIN_ERROR,
        payload: response.error
      })
    }
  })
}
  
export function* loginSuccess() {
  yield takeLatest(actions.LOGIN_SUCCESS, function*({ payload }) {
    console.log(actions.LOGIN_SUCCESS)
    try {
      yield AsyncStorage.setItem('@User:key', JSON.stringify(payload));
    } catch (error) {
      // Error saving data
    }
  })
}

export function* getToken() {
  yield takeLatest(actions.GET_TOKEN_PUSH_NOTIFICATION, function*() {
    const { status } = yield Permissions.getAsync(Permissions.NOTIFICATIONS)

    if(status === 'granted') {
      const token = yield Notifications.getExpoPushTokenAsync()

      yield put({
        type: actions.GET_TOKEN_PUSH_NOTIFICATION_SUCCESS,
        payload: { uuid: token }
      })
    }
  })
}

export function* requestSMS() {
  yield takeLatest(actions.SMS_REQUEST, function*({ payload, navigation }) {
    if (!firebase.apps.length) {
      yield firebase.initializeApp(config.firebaseConfig)
    }

    try {
      const phoneProvider = new firebase.auth.PhoneAuthProvider()
      const verificationId = yield call(
        [phoneProvider,phoneProvider.verifyPhoneNumber],
        payload.phoneNumber,
        payload.recaptchaVerifier.current
      )

      yield put({
        type: actions.SMS_SUCCESS,
        payload: {
          verificationId,
          message: { text: "Verification code has been sent to your phone." }
        },
        navigation
      })
    } catch (err) {
      yield put({
        type: actions.SMS_ERROR,
        payload: {
          message: { text: `Error: ${err.message}`, color: "red" }
        }
      })
    }
  })
}

export function* successSMS() {
  yield takeLatest(actions.SMS_SUCCESS, function*({ navigation }) {
    /// ACTIONS
    yield navigation.push("Verification")
  })
}


export function* errorSMS() {
  yield takeLatest(actions.SMS_ERROR, function*() {
    /// ACTIONS
  });
}

export function* logout() {
  yield takeLatest(actions.LOGOUT, function*() {
    /// ACTIONS
    yield AsyncStorage.removeItem('@User:key')
  });
}

export function* checkVerificationCodeSuccess() {
  yield takeLatest(actions.CHECK_VERIFICATION_CODE_SUCCESS, function*({ navigation }) {
    const { Auth } = store.getState()
    const response = yield call(validatePhone, `${Auth.prefix}${Auth.phoneNumber}`)

    if(response.data[0].exists)
      yield navigation.reset({
        index: 0,
        routes: [{ name: 'Login'}]
      })
    else
      yield navigation.reset({
        index: 0,
        routes: [{ name: 'SignUp'}]
      })
  })
}

export function* checkVerificationCodeError() {
  yield takeLatest(actions.CHECK_VERIFICATION_CODE_ERROR, function*({ payload }) {
    yield alert(payload.message.text)
  })
}

export function* checkVerificationCode() {
  yield takeLatest(actions.CHECK_VERIFICATION_CODE, function*({ payload, navigation }) {
    try {
      const credential = yield firebase.auth.PhoneAuthProvider.credential(
        payload.verificationId,
        payload.verificationCode
      )

      yield firebase.auth().signInWithCredential(credential)

      yield put({
        type: actions.CHECK_VERIFICATION_CODE_SUCCESS,
        payload: {
          message: { text: "Phone authentication successful 👍" }
        },
        navigation
      })
    } catch (err) {
      yield put({
        type: actions.CHECK_VERIFICATION_CODE_ERROR,
        payload: {
          message: { text: "Phone authentication faile" }
        },
        navigation
      })
    }
  });
}

export function* signUpRequest() {
  yield takeLatest(actions.SIGN_UP_REQUEST, function*({ payload }) {
    const formData = new FormData()

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        yield formData.append(key, payload[key])
      }
    }

    const response = yield call(signUp, formData)

    if(!response.error) {
      yield put({
        type: actions.SIGN_UP_REQUEST_SUCCESS,
        payload: {
          profile: response.user,
          token: response.jwt
        }
      })
    } else {
      yield put({
        type: actions.SIGN_UP_REQUEST_ERROR,
        payload: response.error
      })
    }
  });
}

export function* signUpSuccess() {
  yield takeLatest(actions.SIGN_UP_REQUEST_SUCCESS, function*({ payload }) {
    try {
      yield AsyncStorage.setItem('@User:key', JSON.stringify(payload));
      yield put({
        type: actions.LOGIN_SUCCESS,
        payload: payload
      })
    } catch (error) {
      // Error saving data
    }
  })
}

export function* userRequest() {
  yield takeLatest(actions.FETCH_USER, function*({ token }) {
    const response = yield call(fetchUser, token)
    
    if(!response.error) {
      const data = response[0]
      yield put({
        type: actions.FETCH_USER_SUCCESS,
        payload: { profile: data, token }
      })
    } else {
      yield put({
        type: actions.FETCH_USER_ERROR,
        payload: data.error
      })
    }
  })
}

export function* checkAuthorization() {
  yield takeLatest(actions.CHECK_AUTHORIZATION, function*() {
    const data = yield AsyncStorage.getItem('@User:key');
    console.log(data)
    if (data !== null) {
      const dataJson = JSON.parse(data)
      yield put({
        type: actions.FETCH_USER,
        token: dataJson.token,
      });
    } else {
      yield put({
        type: actions.LOGIN_ERROR,
        payload: {
          message: { text: 'User no Found' }
        }
      })
    }
  });
}

export default function* rootSaga() {
  yield all([
    fork(logout),
    fork(getToken),
    fork(errorSMS),
    fork(requestSMS),
    fork(successSMS),
    fork(userRequest),
    fork(loginRequest),
    fork(loginSuccess),
    fork(signUpRequest),
    fork(signUpSuccess),
    fork(checkAuthorization),
    fork(checkVerificationCode),
    fork(checkVerificationCodeSuccess),
  ])
}
