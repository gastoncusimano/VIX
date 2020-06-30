import actions from "./actions"
import transferActions from '../Transfer/actions'

const initialState = {
  cards: [],
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
  case transferActions.CARDS_REQUEST:
    return { ...state, fetching: true }
  case transferActions.CARDS_SUCCESS:
    return { ...state, cards: payload, fetching: false }
  case transferActions.CARDS_ERROR:
    return { ...state, fetching: false, error: payload.error }
  default:
    return state
  }
}