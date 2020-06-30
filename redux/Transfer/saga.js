import {
  takeLatest,
  all, put, fork, call
} from 'redux-saga/effects'
import actions from './actions'
import { store } from '../store'

const sendMoney = ({token, body}) =>
  fetch(`https://api.ityou.works/vix/send`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {'Authorization': `Bearer ${token}`},
  })
    .then((res) => res.json())
    .catch((error) => ({ error }))

const fetchCards = (token) =>
  fetch(`https://api.ityou.works/vix/card`, {
    method: 'GET',
    headers: { 'Authorization': `Bearer ${token}` }
  })
    .then((res) => res.json())
    .then((data) => data)
    .catch((error) => ({ error }))

function* sendMoneyRequest() {
  yield takeLatest(actions.SEND_MONEY_REQUEST, function*({ payload, navigation }) {
    const { Auth } = store.getState()
    const formData = new FormData()
    const token = Auth.idToken

    for (const key in payload) {
      if (payload.hasOwnProperty(key)) {
        yield formData.append(key, payload[key])
      }
    }
    const response = yield call(sendMoney, {
      token: token,
      body: formData
    })

    if(!response.error) {
      yield put({ type: actions.SEND_MONEY_SUCCESS })
      yield navigation.push('Result') //Aqui pones la path de transferencia exitosa
      yield put({ type: 'FETCH_USER', token })

      //Luego de esto el SEND_MONEY_SUCCESS deberia disparar un refresh para los datos de usuario actualizados
    } else {
      yield put({ type: actions.SEND_MONEY_ERROR })
      yield navigation.push('NoFound')
      // yield navigation.push('') Aqui pones la path de transferencia fallida
    }
  })
}

function* requestCard() {
  yield takeLatest(actions.CARDS_REQUEST, function*() {
    const { Auth } = store.getState()
    const token = Auth.idToken

    const response = yield call(fetchCards, token)

    if(!response.error) {
      yield put({
        type: actions.CARDS_SUCCESS,
        payload: response
      })
    } else {
      yield put({
        type: actions.CARDS_ERROR,
        payload: response.error
      })
    }
  })
}

function* sendMoneyCardToCard() {
  yield takeLatest(actions.SEND_MONEY_CARD_TO_CARD_REQUEST, function*({ payload, navigation }) {
    const { Auth } = store.getState()
    const token = Auth.idToken

    const response = yield call(sendMoney, { token, payload })

    if(!response.error) {
      yield put({
        type: actions.SEND_MONEY_CARD_TO_CARD_SUCCESS,
        payload: response
      })
      yield navigation.push("Result")
    } else {
      yield put({
        type: actions.SEND_MONEY_CARD_TO_CARD_ERROR,
        payload: response.error
      })
      yield navigation.push("NoFound")
    }
  })
}

export default function* rootSaga() {
  yield all([
    fork(requestCard),
    fork(sendMoneyCardToCard)
  ])
}