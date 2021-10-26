import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createBrowserHistory } from "history"
import { connectRouter } from "connected-react-router"

import gameTime from "./reducer/gameTime"
import main from "./reducer/main"

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  // 각자 모듈
  gameTime,
  main,
  router: connectRouter(history),
})

const middlewares = [thunk.withExtraArgument({ history: history })]

const env = process.env.NODE_ENV

if (env === "development") {
  const { logger } = require("redux-logger")
  middlewares.push(logger)
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose

const enhancer = composeEnhancers(applyMiddleware(...middlewares))

let store = createStore(rootReducer, enhancer)

export default store
