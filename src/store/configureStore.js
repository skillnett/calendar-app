import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import { routerMiddleware } from 'react-router-redux';
import { connectRouter } from 'connected-react-router';
import { createBrowserHistory } from 'history';
import * as Calendar from './calendar/calendarStore';

export default function configureStore(history, initialState) {
  const reducers = {
    calendar: Calendar.reducer,
  };

  const middleware = [
    thunk,
    routerMiddleware(history)
  ];

  const enhancers = [];
  const isDevelopment = process.env.NODE_ENV === 'development';
  if (isDevelopment && typeof window !== 'undefined' && window.devToolsExtension) {
    enhancers.push(window.devToolsExtension());
  }

  const rootReducer = combineReducers({
    ...reducers,
    // routing: routerReducer,
    router: connectRouter(history)
  });

  return createStore(
    rootReducer,
    initialState,
    compose(applyMiddleware(...middleware), ...enhancers)
  );
}

export const history = createBrowserHistory();
