import { 
  compose, 
  createStore, 
  combineReducers, 
  applyMiddleware, 
} from 'redux'
import thunk from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'

import rootSaga from './sagas'
import reducers from './reducers'

const sagaMiddleware = createSagaMiddleware()
const middleware = [thunk, sagaMiddleware]

const store = createStore(
  combineReducers({ ...reducers }),
  compose(applyMiddleware(...middleware))
)

sagaMiddleware.run(rootSaga)

export { store }