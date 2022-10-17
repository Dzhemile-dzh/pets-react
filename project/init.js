import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import createSagaMiddleware from 'redux-saga';
import promiseMiddleware from 'redux-promise-middleware';
import { createLogger } from 'redux-logger'
import getConfig from 'next/config'
import {
    INITIAL_STATE,
    reducerDefault,
    rootSaga,
} from './common';
import { Constants } from './constants';

const { publicRuntimeConfig } = getConfig()

const coralDetailsValues = (feed) => ({
    name: 'coral',
    feed,
    displayName: 'Coral',
    availableOnPhone: true,
    loginType: 'iframe',
    logoutType: 'delete',
    isSupportingBetHistory: true,
})

const ladbrokesDetailsValues = (feed) => ({
    name: 'ladbrokes',
    feed,
    displayName: 'Ladbrokes',
    availableOnPhone: true,
    loginType: 'iframe',
    logoutType: 'delete',
    isSupportingBetHistory: true,
})

const paddypowerDetailsValues = (feed) => ({
    name: 'paddypower',
    feed,
    displayName: 'Paddy Power',
    availableOnPhone: true,
    loginType: 'iframe',
    logoutType: 'iframe',
    isSupportingBetHistory: true,
})

const betfairDetailsValues = (feed) => ({
    name: 'betfair',
    feed,
    displayName: 'Betfair',
    availableOnPhone: true,
    loginType: 'iframe',
    logoutType: 'iframe',
    isSupportingBetHistory: true,
})

const williamhillDetailsValues = (feed) => ({
    name: 'williamhill',
    feed,
    displayName: 'William Hill',
    availableOnPhone: true,
    loginType: 'form',
    logoutType: 'delete',
    isSupportingBetHistory: true,
})

const bet365DetailsValues = (feed) => ({
    name: 'bet365',
    feed,
    displayName: 'bet365',
    availableOnPhone: true,
    loginType: 'iframe',
    logoutType: 'delete',
    isSupportingBetHistory: true,
})

const betwayDetailsValues = (feed) => ({
    name: 'betway',
    feed,
    displayName: 'Betway',
    availableOnPhone: false,
    loginType: 'form',
    logoutType: 'delete',
    isSupportingBetHistory: true,
})

const skybetDetailsValues = (feed) => ({
    name: 'skybet',
    feed,
    displayName: 'SkyBet',
    availableOnPhone: true,
    loginType: 'window',
    logoutType: 'window',
    isSupportingBetHistory: false,
})

const initialState = {
    ...INITIAL_STATE,
    project: {
        clientId: Constants.WEB_CLIENT_ID,
        racingWebsocketUrl: publicRuntimeConfig.racingWebsocketUrl,
        racingApi: publicRuntimeConfig.racingApi,
        bettingApi: publicRuntimeConfig.bettingApi,
        cmsApi: publicRuntimeConfig.cmsApi,
        bulletTrain: publicRuntimeConfig.bulletTrain,
        stubsApi: publicRuntimeConfig.stubsApi,
        diffusionDomain: publicRuntimeConfig.diffusionDomain,
        cms: {
            assetsUrl: publicRuntimeConfig.assetsUrl,
            apiKey: publicRuntimeConfig.apiKey,
        },
    },
    bookmakersDetails: [
        bet365DetailsValues(publicRuntimeConfig.bet365),
        coralDetailsValues(publicRuntimeConfig.coral),
        ladbrokesDetailsValues(publicRuntimeConfig.ladbrokes),
        paddypowerDetailsValues(publicRuntimeConfig.paddypower),
        betfairDetailsValues(publicRuntimeConfig.betfair),
        williamhillDetailsValues(publicRuntimeConfig.williamhill),
        skybetDetailsValues(publicRuntimeConfig.skybet),
        betwayDetailsValues(publicRuntimeConfig.betway),
    ],
}

// eslint-disable-next-line default-param-last
const reducer = (state = initialState, action) => {
    if (action.type === HYDRATE) {
        return {
            ...state,
            ...action.payload,
        }
    }
    return reducerDefault(state, action)
}

const makeStore = () => {
    const sagaMiddleware = createSagaMiddleware();

    const middlewares = [
        sagaMiddleware,
        promiseMiddleware,
    ];

    const storeEnhancer = process.env.NODE_ENV === 'development' ?
        composeWithDevTools(applyMiddleware(...middlewares, createLogger())) :
        // applyMiddleware(...middlewares) add this once we want to exclude dev tools from prod
        composeWithDevTools(applyMiddleware(...middlewares))

    const store = createStore(
        reducer,
        initialState,
        storeEnhancer,
    );

    store.sagaTask = sagaMiddleware.run(rootSaga);

    return store;
}

export const wrapper = createWrapper(makeStore);
