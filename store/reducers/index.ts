/* eslint-disable max-len */
import { HYDRATE } from 'next-redux-wrapper';
import { AnyAction } from 'redux'

import { mergeDeep } from 'timm';
import { reducerDefault } from '@project/common';
import { StateInterface } from '../state/types/state.types';

import { initialState } from '../state';

// Just for visiblity those variables are created
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const FROM_INITIALIZATION = ['project', 'bookmakerDetails'];

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SERVER_STATE_FIELDS = ['filters', 'raceCards',
    'firstThreeWinners', 'favouriteRunners', 'racePage', 'bookmakerConfiguration', 'bookmakerOffers'];

const CLIENT_STATE_FIELDS = ['bookmakerSessions', 'cardCustomization', 'betslip',
    'betHistory', 'customRouter', 'nextThreeRaces', 'stream'];

const MIXED_STATE_FIELDS = ['glide', 'diffusion', 'races', 'selectedBookmaker'];

// properties fetched on the server
// Added this variable just for visibility of the fields we are using on SSR
// They are firstly merged on line 31
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const SS_GLIDE_FIELDS = ['routes', 'pages', 'templates',
    'layouts', 'widgets', 'articlePage',
    'menus', 'taxonomies', 'isInitialized'];

// Which fields are being populated on the client, they are lost during ssr
// And we need to set them now
const CL_GLIDE_FIELDS = ['collections', 'promoArticles', 'authors', 'taxonomyCollections'];

// Which fields are being populated on both, we need to merge deep
const CL_AND_SS_GLIDE_FIELDS = ['articles', 'images'];

// eslint-disable-next-line default-param-last
export const reducer = (state: StateInterface = initialState, action: AnyAction) => {
    if (action.type === HYDRATE) {
        // Merging Server state into client state;
        const nextState = {
            ...state, // use previous state
            ...action.payload, // apply delta from hydration
        }

        CLIENT_STATE_FIELDS.forEach((field) => nextState[field] = state[field]);

        MIXED_STATE_FIELDS.forEach((field) => {
            if (field === 'races') {
                nextState.races = mergeDeep(nextState[field], state[field])
            } else if (field === 'diffusion') {
                const topics = Array.from(new Set([...nextState[field].topics, ...state[field].topics]))
                    .filter((item) => typeof item.bookmaker === 'undefined' || item.bookmaker === state.selectedBookmaker)
                nextState[field] = {
                    ...state[field],
                    topics,
                    bookmakers: state[field].bookmakers,
                }
            } else if (field === 'glide') {
                CL_GLIDE_FIELDS.forEach((key) => nextState.glide[key] = state.glide[key]);
                CL_AND_SS_GLIDE_FIELDS.forEach((key) => nextState.glide[key] = mergeDeep(nextState.glide[key], state.glide[key]))
            } else if (field === 'selectedBookmaker') {
                nextState.selectedBookmaker = state.selectedBookmaker;
            }
        })

        return nextState;
    }
    return reducerDefault(state, action)
}
