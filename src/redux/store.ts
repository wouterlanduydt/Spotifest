import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga';

import reducer from './reducers';
import mySaga from './sagas';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();
export default createStore(reducer as any, composeWithDevTools(applyMiddleware(sagaMiddleware)));

sagaMiddleware.run(mySaga);
