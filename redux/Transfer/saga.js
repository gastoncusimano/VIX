import {
  takeLatest,
  all, put, fork, call
} from 'redux-saga/effects'
import actions from './actions'
import { store } from '../store'

const sendMoney = ({token, body}) =>
  fetch(`https://api.ityou.works/transactions/send`, {
    method: 'POST',
    body,
    headers: {
      'Authorization': `Bearer ${token}`
    },
  })
    .then((res) => res.json())
    .catch((error) => ({ error }))

function* sendMoneyRequest() {
  yield takeLatest(actions.SEND_MONEY_REQUEST, function*({ payload, navigation }) {
    const { Auth } = store.getState()
    const formData = new FormData()
    const token = Auth.idToken
    console.log(token)

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

export default function* rootSaga() {
  yield all([
    fork(sendMoneyRequest),
  ])
}