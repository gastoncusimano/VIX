import { 
  takeLatest, 
  all, put, fork , call
} from 'redux-saga/effects'
import _ from 'lodash'
import actions from './actions'
import * as Contacts from 'expo-contacts'

export function* contactsRequest() {
  yield takeLatest(actions.GET_CONTACTS_REQUEST, function*({ page }) {
    const { status } = yield Contacts.requestPermissionsAsync()

    if(status === 'granted') {
      const { data } = yield call([Contacts, Contacts.getContactsAsync], {
        fields: [          
          Contacts.Fields.Name,
          Contacts.Fields.Image,
          Contacts.Fields.PhoneNumbers,
        ],
        // pageSize: data.length,
        // pageOffset: 40 * page
      })

      if (data.length > 0) {
        const contacts = data.filter((contact) => !_.isEmpty(contact.phoneNumbers) )
        yield put({
          type: actions.GET_CONTACTS_SUCCESS,
          payload: contacts.map((contact) => ({
            id: contact.id,
            name: contact.name,
            image: contact.image,
            phoneNumbers: contact.phoneNumbers,
          })) 
        })
      } else {
        yield put({
          type: actions.GET_CONTACTS_ERROR,
          payload: "No se encontraron contactos"
        })
      }
    } else {
      yield put({ type: actions.GET_CONTACTS_ERROR, payload: status })
    }
    /// ACTIONS
  })
}

export function* contactsSuccess() {
  yield takeLatest(actions.GET_CONTACTS_SUCCESS, function*(payload) {
    /// ACTIONS
  })
}

export default function* rootSaga() {
  yield all([
    fork(contactsRequest),
    fork(contactsSuccess),
  ])
}