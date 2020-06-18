import { 
  takeLatest, 
  all, put, fork , call
} from 'redux-saga/effects'
import actions from './actions'
import { store } from '../store'

const createCard = ({body, token}) =>
  fetch('https://api.ityou.works/cards', {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  })
    .then((res) => res.json())
    .catch((error) => ({error}))

function* createCardRequest() {
  yield takeLatest(actions.CREATE_CARD_REQUEST, function*({ payload, navigation }) {
    const { Auth } = store.getState()
    const response = yield call(createCard, {body: payload, token: Auth.idToken})
    
    if(!response.error) {
      yield put({
        type: actions.CREATE_CARD_SUCCESS,
        payload: response
      })
      yield navigation.goBack()
    } else {
      yield put({
        type: actions.CREATE_CARD_ERROR,
        payload: response.error
      })
      yield alert(JSON.stringify(response.error))
    }
  })
}


export default function* rootSaga() {
  yield all([
    fork(createCardRequest),
  ])
}