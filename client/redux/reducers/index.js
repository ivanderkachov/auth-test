import { combineReducers } from 'redux'
import { connectRouter } from 'connected-react-router'
import auth from './auth'
import authtest from './authtest'

const createRootReducer = (history) =>
  combineReducers({
    router: connectRouter(history),
    auth,
    authtest
  })

export default createRootReducer
