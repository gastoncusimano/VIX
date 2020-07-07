import actions from './actions'

const initialState = {
  uuid: null,
  error: null,
  prefix: null,
  profile: { customer: null },
  idToken: null,
  fetched: false,
  message: null,
  isReady: false,
  fetching: false,
  phoneNumber: null,
  verificationId: null,
  verificationCode: null,
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case actions.GET_TOKEN_PUSH_NOTIFICATION_SUCCESS:
      return { ...state, uuid: payload.uuid }
    case actions.SMS_REQUEST:
      return { ...state, fetching: true }
    case actions.SMS_SUCCESS:
      return { 
        ...state, 
        fetching: false, 
        verificationId: payload.verificationId
      }
    case actions.SMS_ERROR:
      return { ...state, message: payload.message, error: true, fetching: false  }
    case actions.CHECK_VERIFICATION_CODE:
      return { ...state, fetching: true }
    case actions.CHECK_VERIFICATION_CODE_SUCCESS:
      return { ...state, fetching: false }
    case actions.CHECK_VERIFICATION_CODE_ERROR:
      return { ...state, error: true, fetching: false }
    case actions.SIGN_UP_REQUEST:
      return { ...state, fetching: true }
    case actions.SIGN_UP_REQUEST_ERROR:
      return { ...state, fetching: false }
    case actions.LOGIN_REQUEST:
      return { ...state, fetching: true }
    case actions.LOGIN_SUCCESS:
      return { 
        ...state, 
        profile: payload.profile,
        fetched: true,
        idToken: payload.token,
        fetching: false,
        isReady: true,
      }
    case actions.LOGIN_ERROR:
      return { ...state, error: payload.message, fetching: false, isReady: true }
    case actions.LOGOUT:
      return {...initialState, isReady: true}
    case actions.FETCH_USER:
      return { ...state, fetching: true }
    case actions.FETCH_USER_ERROR:
      return { ...state, isReady: true }
    case actions.FETCH_USER_SUCCESS:
      return { 
        ...state, 
        isReady: true, 
        fetched: true, 
        profile: payload.profile, 
        idToken: payload.token, 
        fetching: false, 
      }
    case actions.CHANGE_PHONE_NUMBER:
      return { ...state, phoneNumber: payload.phoneNumber, prefix: payload.prefix }
    default:
      return state
  }
}