const actions = {
  SEND_MONEY_REQUEST: 'SEND_MONEY_REQUEST',
  SEND_MONEY_SUCCESS: 'SEND_MONEY_SUCCESS',
  SEND_MONEY_ERROR: 'SEND_MONEY_ERROR',
  sendMoney: (user_phone, amount, navigation) => ({ 
    type: actions.SEND_MONEY_REQUEST, 
    payload: { user_phone, amount }, 
    navigation,
  })
}

export default actions