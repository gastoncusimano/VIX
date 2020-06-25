const actions = {
  SEND_MONEY_CARD_TO_CARD_REQUEST: 'SEND_MONEY_CARD_TO_CARD_REQUEST',
  SEND_MONEY_CARD_TO_CARD_SUCCESS: 'SEND_MONEY_CARD_TO_CARD_SUCCESS',
  SEND_MONEY_CARD_TO_CARD_ERROR: 'SEND_MONEY_CARD_TO_CARD_ERROR',
  SEND_MONEY_REQUEST: 'SEND_MONEY_REQUEST',
  SEND_MONEY_SUCCESS: 'SEND_MONEY_SUCCESS',
  SEND_MONEY_ERROR: 'SEND_MONEY_ERROR',
  CARDS_REQUEST: 'CARDS_REQUEST',
  CARDS_SUCCESS: 'CARDS_SUCCESS',
  CARDS_ERROR: 'CARDS_ERROR',
  cardsRequest: () => ({ type: actions.CARDS_REQUEST }),
  sendCardToCard: (payload, navigation) => ({ 
    type: actions.SEND_MONEY_CARD_TO_CARD_REQUEST, 
    payload, 
    navigation 
  }),
  sendMoney: (user_phone, amount, navigation) => ({ 
    type: actions.SEND_MONEY_REQUEST, 
    payload: { user_phone, amount }, 
    navigation,
  })
}

export default actions