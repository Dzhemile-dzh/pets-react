import moment from 'moment';
import { getDateName } from '../../project/utils/dateUtils';
import { Constants } from '../../project/constants';
import { FiltersInterface, RaceCardsRaceInterface, RaceCardsMeetingInterface } from '../interfaces';

const { PAGES, DATE_FORMATS: { D_MMM_YYYY } } = Constants;

const getResultsDateInfo = (date : string) => {
    const dateFormatted = getDateName(date);

    switch (dateFormatted) {
        case 'Today':
            return {
                dateName: 'Today\'s ',
                dateDetails: ' - Fast Results',
            };
        case 'Yesterday':
            return {
                dateName: 'Yesterday\'s ',
                dateDetails: '',
            };
        default:
            return {
                dateName: '',
                dateDetails: ` on ${moment(date).format('D MMMM YYYY')}`,
            };
    }
}

const getRacecardsDateInfo = (date : string) => {
    const dateFormatted = getDateName(date);

    switch (dateFormatted) {
        case 'Today':
            return {
                dateName: 'Today\'s ',
                dateDetails: ' - Horse Racing Cards',
            };
        case 'Tomorrow':
            return {
                dateName: 'Tomorrow\'s ',
                dateDetails: ' - Horse Racing Cards',
            };
        default:
            return {
                dateName: '',
                dateDetails: ` for ${moment(date).format('dddd Do MMMM YYYY')}`,
            };
    }
}

export const getHeaderText = ({
    date,
    pageType,
    dateFormat = D_MMM_YYYY,
}: {
    date?: string,
    pageType?: string,
    dateFormat?: string,
}): string => {
    const dateFormatted = getDateName(date);

    const pageTypes = {
        [PAGES.RACECARDS]: 'Races',
        [PAGES.RESULTS]: `${dateFormatted === 'today' ? 'Fast Results' : 'Results'}`,
        [PAGES.TODAY]: 'Races & Fast Results',
    };

    const type = pageTypes[pageType] || '';

    if (['today', 'tomorrow', 'yesterday'].includes(dateFormatted)) {
        return `${dateFormatted}${type ? `'s ${type}` : ''}`;
    }

    return `${moment(dateFormatted).format(dateFormat)} ${type}`;
}

export const generatePageTitle = (route: string, date: string): string => {
    if (route?.includes(PAGES.RESULTS)) {
        const { dateName, dateDetails } = getResultsDateInfo(date);
        return `${dateName}Horse Racing Results${dateDetails} | Racing Post`;
    }

    if (route?.includes(PAGES.RACECARDS)) {
        const { dateName, dateDetails } = getRacecardsDateInfo(date);
        return `${dateName}Racecards${dateDetails} | Racing Post`;
    }

    if (route?.includes(PAGES.TODAY)) {
        return "Today's Races | Racing Post";
    }

    return '';
}

export const generateMetaDescription = (route: string, date: string): string => {
    if (route?.includes(PAGES.RESULTS)) {
        const { dateName, dateDetails } = getResultsDateInfo(date);

        const dateDescription = dateName ?
            `${dateName}horse racing results from every racecourse.` :
            `View all the horse racing results for all races${dateDetails}.`
        const additionalInformation =
            'Find full horse racing results and video replays for every race from the Racing Post.'

        return `${dateDescription} ${additionalInformation}`;
    }

    if (route?.includes(PAGES.RACECARDS)) {
        const racecardsDateInfo = getRacecardsDateInfo(date);
        const dateName = racecardsDateInfo.dateName.toLowerCase();
        const { dateDetails } = racecardsDateInfo;

        const dateDescription = dateName ?
            `View ${dateName}racecards for the runners and riders across every racecourse.` :
            `View racecards${dateDetails} for the runners and riders across every racecourse.`
        const additionalInformation =
            'Find the latest odds, form, stats and tips in our detailed horse racing cards.'

        return `${dateDescription} ${additionalInformation}`;
    }

    if (route?.includes(PAGES.TODAY)) {
        return ' ';
    }

    return '';
}

const {
    RACE_FILTERS: {
        RACE_STATUS,
        RACE_TYPE,
    },
    RACE_TYPES,
} = Constants;

export function getFilteredRacesAndMeetings(
    races : RaceCardsRaceInterface[],
    meetings: RaceCardsMeetingInterface[],
    filters : FiltersInterface,
) : {
        filteredRaces : RaceCardsRaceInterface[] | [];
        filteredMeetings: RaceCardsMeetingInterface[] | []
    } {
    if (!filters || Object.keys(filters).length === 0) {
        return {
            filteredRaces: races,
            filteredMeetings: meetings,
        }
    }

    if (!races || !meetings) {
        return {
            filteredRaces: races || [],
            filteredMeetings: meetings || [],
        }
    }

    const filterByMeetingId = ({ meetingId }) => (
        filters.courses.length === 0 || filters.courses.includes(meetingId)
    )

    const filterByRaceStatus = ({
        isFastResult, isResult, isUpcoming, isAbandoned,
    }) => (
        // If the race is abandoned, we need to display it no matter the race status filter
        isAbandoned ||
        (filters.raceStatus === RACE_STATUS.ALL) ||
        (filters.raceStatus !== RACE_STATUS.ALL &&
            ((filters.raceStatus === RACE_STATUS.RESULTS && (isFastResult || isResult)) ||
                (filters.raceStatus === RACE_STATUS.RACES && !isFastResult && isUpcoming))
        )
    )

    const filterByRaceType = ({ raceType }) => (
        (filters.raceType === RACE_TYPE.ALL) ||
        (filters.raceType === RACE_TYPE.FLAT && raceType === RACE_TYPES.FLAT) ||
        (filters.raceType === RACE_TYPE.JUMPS && raceType !== RACE_TYPES.FLAT)
    )

    const filterByHandicap = ({ isHandicap }) => {
        // If filter is ON
        // We want to show only the handicap races
        // If its not, we want to show both handicap and non-handicap
        return !filters.isHandicap || filters.isHandicap === isHandicap
    }

    const filteredRaces = races.filter((race) => (
        filterByRaceStatus(race) &&
        filterByMeetingId(race) &&
        filterByRaceType(race) &&
        filterByHandicap(race)
    ))

    const isMeetingRaceIncluded = (raceId) => (
        filteredRaces.find((race) => race.raceId === raceId) !== undefined
    )

    const filteredMeetings = meetings.map((item) => {
        const meetingFilteredRaceIds = item.races.filter((raceId) => isMeetingRaceIncluded(raceId));

        return {
            ...item,
            races: meetingFilteredRaceIds,
        }
    });

    return {
        filteredRaces,
        filteredMeetings,
    }
}

export const getPageType = (route: string): string => {
    return [PAGES.RESULTS, PAGES.RACECARDS, PAGES.TODAY].find((page) => {
        return route?.includes(page);
    });
}
