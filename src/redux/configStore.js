import Group from "./modules/group";
import { createStore, combineReducers, applyMiddleware, compose } from "redux"
import thunk from "redux-thunk"
import { createBrowserHistory } from "history"
import { connectRouter } from "connected-react-router"
import user from "./modules/user"

import mainPage from "./modules/mainPage"

export const history = createBrowserHistory()

const rootReducer = combineReducers({
  user,
  // 각자 모듈

  group: Group,

  mainPage,

  router: connectRouter(history),
});

const middlewares = [thunk.withExtraArgument({ history: history })];

const env = process.env.NODE_ENV;

if (env === "development") {
  const { logger } = require("redux-logger");
  middlewares.push(logger);
}

const composeEnhancers =
  typeof window === "object" && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
    ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({})
    : compose;

const enhancer = composeEnhancers(applyMiddleware(...middlewares));

let store = createStore(rootReducer, enhancer);

export default store;
