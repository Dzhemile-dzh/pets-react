import getConfig from 'next/config'

import { Constants } from '@project/constants';
import { INITIAL_STATE } from '@project/common';

import {
    bet365DetailsValues,
    betfairDetailsValues,
    betwayDetailsValues,
    coralDetailsValues,
    ladbrokesDetailsValues,
    paddypowerDetailsValues,
    skybetDetailsValues,
    williamhillDetailsValues,
} from './bookmakerConfigs';

const { publicRuntimeConfig } = getConfig()

export const initialState = {
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
