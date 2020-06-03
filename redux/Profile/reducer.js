import actions from './actions'

const initialState = {
  image: null,
  error: null,
  fetched: true,
  fetching: false,
  hasPermission: null
}

export default (state = initialState, { type, payload }) => {
  switch (type) {
  case actions.TAKE_IMAGE:
    return { ...state, image: payload }
  case actions.DELETE_IMAGE:
    return { ...state, image: null }
  case actions.GET_IMAGE_USER:
    return { ...state, fetching: true }
  case actions.GET_IMAGE_USER_SUCCESS:
    return { ...state, fetching: false, image: payload }
  case actions.GET_IMAGE_USER_ERROR:
    return { ...state, fetching: false, error: payload }
  case actions.CAMERA_PERMISSION_SUCCESS:
    return { ...state, hasPermission: true }
  case actions.CAMERA_PERMISSION_DENIED:
    return { ...state, hasPermission: false }
  default:
    return state
  }
}
