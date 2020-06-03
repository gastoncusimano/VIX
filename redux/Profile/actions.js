const actions = {
  USE_CAMERA: 'USE_CAMERA',
  TAKE_IMAGE: 'TAKE_IMAGE',
  DELETE_IMAGE: 'DELETE_IMAGE',
  GET_IMAGE_USER: 'GET_IMAGE_USER',
  GET_IMAGE_USER_ERROR: 'GET_IMAGE_USER_ERROR',
  GET_IMAGE_USER_SUCCESS: 'GET_IMAGE_USER_SUCCESS',
  CAMERA_PERMISSION_DENIED: 'CAMERA_PERMISSION_DENIED',
  CAMERA_PERMISSION_SUCCESS: ' CAMERA_PERMISSION_SUCCESS',
  snap: (payload) => ({ type: actions.TAKE_IMAGE, payload }),
  useCamera: () => ({ type: actions.USE_CAMERA }),
  pickImage: () => ({ type: actions.GET_IMAGE_USER }),
  deleteImage: () => ({ type: actions.DELETE_IMAGE })
}

export default actions