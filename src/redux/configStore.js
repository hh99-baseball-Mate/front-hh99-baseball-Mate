import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from "redux-thunk";
import { createBrowserHistory } from "history";
import { connectRouter } from "connected-react-router";

import user from "./modules/user";
import mainPage from "./modules/mainPage";
import timeline from "./modules/timeline";
import groupDetail from "./modules/groupDetail";
import goods from "./modules/goods";
import group from "./modules/group";
import _with from "./modules/with";
import screen from "./modules/screen";

export const history = createBrowserHistory();

const rootReducer = combineReducers({
  user,
  with: _with,
  group,
  goods,
  mainPage,
  timeline,
  groupDetail,
  screen,

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
