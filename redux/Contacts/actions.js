const actions = {
  CHANGE_PAGE: "CHANGE_PAGE",
  GET_CONTACTS_ERROR: "GET_CONTACTS_ERROR",
  GET_CONTACTS_REQUEST: "GET_CONTACTS_REQUEST",
  GET_CONTACTS_SUCCESS: "GET_CONTACTS_SUCCESS",
  RESET_CONTACTS_REDUCER: "RESET_CONTACTS_REDUCER",
  changePage: () => ({ type: actions.CHANGE_PAGE }),
  getContacts: (page) => ({ type: actions.GET_CONTACTS_REQUEST, page }),
  resetContactReducer: () => ({ type: actions.RESET_CONTACTS_REDUCER }),
}

export default actions