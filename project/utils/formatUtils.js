import { Constants } from '../constants';
import { getLocalStorageItem } from './storage';

export const getCurrencyBySign = (sign) => {
    const currencyMapping = {
        $: 'USD',
        '€': 'EUR',
        '£': 'GBP',
    };

    return currencyMapping[sign];
}

export const convertToPascalCase = (text) => {
    if (!text) {
        return '';
    }

    return text
        .split(/\s/)
        .filter((word) => !!word)
        .map((word) => `${word[0].toUpperCase()}${word.slice(1, word.length).toLowerCase()}`)
        .join('')
        .replace(/[^a-zA-Z0-9_]/g, '');
}

export const getBetTypeDescription = (betType) => {
    return betType.includes('accumulator') ?
        Constants.MULTIPLE_BET_TYPES_DESC.accumulator : Constants.MULTIPLE_BET_TYPES_DESC[betType];
};

export const shuffleArray = (array) => {
    let currentIndex = array.length;
    let randomIndex;
    while (currentIndex !== 0) {
        // NOSONAR
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
    }
    return array;
}

export const formatHybridRaceUrlWithPrefTab = (hybridRaceLink) => {
    const preferredTab = getLocalStorageItem('cdt_tab_pref')
    return hybridRaceLink.includes(Constants.PAGES.RACECARDS) &&
        preferredTab !== null && preferredTab !== Constants.RACECARDS_TABS.FREE ?
        `${hybridRaceLink}/${preferredTab}` : hybridRaceLink
}

export const formatHybridNavigationItemWithPrefTab = (navigationLink) => {
    // racecards page preferred tab
    const preferredRaceCardsTab = getLocalStorageItem('cdt_list_pref')
    // results page preferred tab
    // still investigating which local storage property or cookie we have to use
    // course - e30=
    // time - eyJyZXN1bHRzIjp7InBhdGgiOiJ0aW1lLW9yZGVyIn19
    const preferredResultsTab = getNavigationStateCookie()

    if (navigationLink.includes(Constants.PAGES.RACECARDS) && preferredRaceCardsTab !== null &&
        preferredRaceCardsTab === 'byTime') {
        return `${navigationLink}/time-order`;
    }
    if (navigationLink.includes(Constants.PAGES.RP1_RESULTS) && preferredResultsTab !== null &&
        preferredResultsTab === 'eyJyZXN1bHRzIjp7InBhdGgiOiJ0aW1lLW9yZGVyIn19') {
        return `${navigationLink}${Constants.PAGES.RP1_FAST_RESULTS}`;
    }

    return navigationLink;
}

export const getNavigationStateCookie = () => {
    if (typeof window !== 'undefined') {
        const navigationStateCookie = document.cookie
            .split(';')
            .find((item) => item.includes('navigationState'))
        const navigationStateValue = navigationStateCookie ? navigationStateCookie.split('=')[1] : null
        return navigationStateValue
    }
}
