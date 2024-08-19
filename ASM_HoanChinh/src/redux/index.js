import { compose, legacy_createStore, applyMiddleware } from "redux";
import createMiddleware from "redux-saga";

import middleware from "./middleware";
import reducers from "./reducers";

const middlewareCreated = createMiddleware();
const store = legacy_createStore(
  reducers,
  compose(applyMiddleware(middlewareCreated))
);
middlewareCreated.run(middleware);

export default store;
