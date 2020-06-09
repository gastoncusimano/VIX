import { 
  takeLatest, 
  all, put, fork , call
} from 'redux-saga/effects'
import actions from './actions'

const createCard = (body) =>
  fetch('https://api.ityou.works/cards', {
    method: 'POST',
    body: JSON.stringify(body)
  })
    .then((res) => res.json())
    .catch((error) => ({error}))

function* createCardRequest() {
  yield takeLatest(actions.CREATE_CARD_REQUEST, function*({ payload }) {
    console.log(payload)
  })
}


export default function* rootSaga() {
  yield all([
    fork(createCardRequest),
  ])
}