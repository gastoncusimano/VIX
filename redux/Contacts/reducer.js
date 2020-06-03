import actions from './actions'

const initialState = {
  page: 0,
  error: null,
  contacts: [],
  fetched: false, 
  fetching: false,
  nextPaging: true,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case actions.GET_CONTACTS_REQUEST:
    return { ...state, fetching: true }
  case actions.GET_CONTACTS_SUCCESS:
    return { 
      ...state, 
      contacts: [...state.contacts, ...payload], 
      fetched: true, 
      fetching: false, 
      nextPaging: false
    }
  case actions.GET_CONTACTS_ERROR:
    return { ...state, fetching: false, error: payload }
  case actions.RESET_CONTACTS_REDUCER:
    return initialState
  case actions.CHANGE_PAGE:
    return { ...state, page: state.page + 1, nextPaging: true }
  default:
    return state
  }
}