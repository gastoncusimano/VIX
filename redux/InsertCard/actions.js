const actions = {
  CREATE_CARD_REQUEST: 'CREATE_CARD_REQUEST',
  CREATE_CARD_SUCCESS: 'CREATE_CARD_SUCCESS',
  CREATE_CARD_ERROR: 'CREATE_CARD_ERROR',
  submitCard: (payload, navigation) => ({ type: actions.CREATE_CARD_REQUEST, payload, navigation })
}

export default actions