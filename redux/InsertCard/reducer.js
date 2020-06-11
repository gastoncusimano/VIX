import actions from "./actions"

const initialState = {
  error: null,
  fetching: false,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {

  case actions.CREATE_CARD_REQUEST:
    return { ...state, fetching: true }
  case actions.CREATE_CARD_SUCCESS:
    return { ...state, fetching: false }
  case actions.CREATE_CARD_ERROR:
    return { ...state, fetching: false, error: payload }
  default:
    return state
  }
}