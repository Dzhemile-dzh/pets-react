import { Store, createStore, applyMiddleware } from 'redux';
import createSagaMiddleware, { Task } from 'redux-saga'
import { composeWithDevTools } from 'redux-devtools-extension';

import { createWrapper } from 'next-redux-wrapper';
import promiseMiddleware from 'redux-promise-middleware';
// import { createLogger } from 'redux-logger'

import { reducer } from '@store/reducers';
import { rootSaga, setPersistedState } from '@project/common';

export interface SagaStore extends Store {
    sagaTask?: Task;
}

const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [
        sagaMiddleware,
        promiseMiddleware,
    ];

    // const storeEnhancer = process.env.NODE_ENV === 'development' ?
    //     // @ts-ignore works
    //     composeWithDevTools(applyMiddleware(...middlewares, createLogger())) :
    //     // applyMiddleware(...middlewares) add this once we want to exclude dev tools from prod
    //     // @ts-ignore works
    //     composeWithDevTools(applyMiddleware(...middlewares))

    // @ts-ignore works
    const storeEnhancer = composeWithDevTools(applyMiddleware(...middlewares))

    const store = createStore(
        reducer,
        storeEnhancer,
    );

    (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
    sagaMiddleware.run(setPersistedState);

    return store;
}

export const wrapper = createWrapper(makeStore);
