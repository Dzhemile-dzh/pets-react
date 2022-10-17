import Analytics from 'analytics'
import segmentPlugin from '@analytics/segment'
import momentTimezone from 'moment-timezone';
import moment from 'moment';
import getConfig from 'next/config'

import { getBetslipId } from './segmentEvents/storageHelpers';
import { getPreviousPageName } from './utils/storage';
import { Constants } from './constants';

const { BOOKMAKER_DISPLAY_NAMES: { BESTODDS }, DATE_FORMATS, BOOKMAKER_DISPLAY_NAMES } = Constants;

const { publicRuntimeConfig } = getConfig()

const datePluginFn = ({ payload }) => {
    // Since the analytics track event is cleaning up the timestamps
    // And not adding the time's offset to the date
    // We'll need to get the offset and add it to the time manually
    const londonTime = momentTimezone().tz('Europe/London').format();
    const offset = moment.parseZone(londonTime).utcOffset();

    const timeWithOffset = moment(londonTime).add(`${offset}`, 'minutes')

    payload.properties.uk_timestamp = timeWithOffset.format()
    payload.properties.uk_date = timeWithOffset.format(DATE_FORMATS['YYYY-MM-DD'])
};

const UkDatePlugin = {
    name: 'uk-date-plugin',
    // This custom tracking event will be called everytime we call analytics.track
    // And we want to add uk_timestamp and uk_date properties to our segment tracking events
    'track:segment': datePluginFn,
    'page:segment': datePluginFn,
}

const BetslipIdPlugin = {
    name: 'bet-slip-id-plugin',
    'track:segment': ({ payload }) => {
        payload.properties.bet_slip_id = getBetslipId();
    },
}

const BookmakerNamePlugin = {
    name: 'bookmaker-plugin',
    'page:segment': ({ payload }) => {
        const bookmaker = localStorage.getItem('selected-bookmaker')?.replace(/["]/g, '');
        payload.properties.bookmaker = BOOKMAKER_DISPLAY_NAMES[bookmaker] || BESTODDS;
    },
}

const BestOddsBookmakerPlugin = {
    name: 'best-odds-bookmaker-plugin',
    'track:segment': ({ payload }) => {
        if (!payload.properties.bookmaker) {
            payload.properties.bookmaker = BESTODDS;
        }
    },
}

const PreviousPagePlugin = {
    name: 'previous-page',
    'page:segment': ({ payload }) => {
        payload.properties.previous_page = getPreviousPageName();
    },
}

const EditPropsPlugin = {
    name: 'edit-props',
    'page:segment': ({ payload }) => {
        payload.properties.screen_size =
            `${payload.properties.width}x${payload.properties.height}`;

        delete payload.properties.hash;
        delete payload.properties.height;
        delete payload.properties.search;
        delete payload.properties.width;
    },
}

const analytics = Analytics({
    plugins: [
        segmentPlugin({
            writeKey: publicRuntimeConfig.segmentKey,
        }),
        UkDatePlugin,
        BetslipIdPlugin,
        BookmakerNamePlugin,
        BestOddsBookmakerPlugin,
        PreviousPagePlugin,
        EditPropsPlugin,
        // If google tag manager needs to be used
        //
        // googleTagManager({
        //     containerId: publicRuntimeConfig.GTM_ID,
        // }),
    ],
});

analytics.ready(() => {
    console.info( // eslint-disable-line no-console
        // eslint-disable-next-line max-len
        `initSegmentWithKey('${publicRuntimeConfig.segmentKey}') window.analytics is now available.`,
    );
})

export const ANALYTICS_EVENTS = {
    trackPage(properties) {
        if (analytics) {
            analytics.page(properties);
        }
    },
    trackEvent(event, properties) {
        if (analytics) {
            return analytics.track(event, properties);
        }
    },
};
