const actions = {
  CREATE_CARD_REQUEST: 'CREATE_CARD_REQUEST',
  submitCard: (payload) => ({ type: actions.CREATE_CARD_REQUEST, payload })
}

export default actions