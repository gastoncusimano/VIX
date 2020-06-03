import { 
  takeLatest, 
  all, put, fork 
} from 'redux-saga/effects'
import actions from './actions'

export function* activitiesRequest() {
  yield takeLatest(actions.ACTIVITIES_REQUEST, function*(payload) {
    /// ACTIONS
  })
}

export function* activitiesSuccess() {
  yield takeLatest(actions.ACTIVITIES_SUCCESS, function*(payload) {
    /// ACTIONS
  })
}

export function* applyFilters() {
  yield takeLatest(actions.FILTERS_APPLY, function*(payload) {
    /// ACTIONS
  })
}

export function* cleanFilters() {
  yield takeLatest(actions.FILTERS_DEFAULT, function*(payload) {
    /// ACTIONS
  })
}

export default function* rootSaga() {
  yield all([
    fork(applyFilters),
    fork(cleanFilters),
    fork(activitiesRequest),
    fork(activitiesSuccess),
  ])
}