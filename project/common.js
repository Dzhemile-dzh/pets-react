// eslint-disable-next-line no-restricted-imports
export {
    Actions,
    isServerSide,
    constants,
    providers,
    strings,
    utils,
    rootSaga,
    reducerDefault,
    INITIAL_STATE,
    setPersistedState,
} from
    // eslint-disable-next-line import/no-relative-packages
    // '../../janus-frontend-common/target'; // LOCAL
    'janus-frontend-common';// PROD
