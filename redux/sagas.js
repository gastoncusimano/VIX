import { all } from 'redux-saga/effects'

import authSagas from './Auth/saga'
import InsertCard from './InsertCard/saga'
import profileSagas from './Profile/saga'
import contactsSagas from './Contacts/saga'
import TransferSagas from './Transfer/saga'
import activitiesSagas from './Activities/saga'

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    InsertCard(),
    profileSagas(),
    contactsSagas(),
    TransferSagas(),
    activitiesSagas()
  ])
}