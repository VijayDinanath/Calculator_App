import {createStore, applyMiddleware} from 'redux';
import reducers from '../reducers';
import createSagaMiddleware from 'redux-saga';
import sagas from '../sagas';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(initialState){
    const store = createStore(reducers, initialState, applyMiddleware(sagaMiddleware));
    store.runSaga = sagaMiddleware.run;

    return store;
}