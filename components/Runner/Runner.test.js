/* eslint-disable max-len */
import React from 'react';
import { screen } from '@testing-library/react';
import * as hooks from '../contexts/BreakPointContext';
import { wrapperRender as render } from '../../project/utils/testUtility';

import Runner from './index.tsx';

const moreData = {
    sex: 'Gelding',
    colour: 'Bay',
    sireName: 'Prince Gibraltar',
    sireOriginCountryCode: 'IRE',
    damName: 'Painted Girl',
    damOriginCountryCode: 'GB',
    ownerName: 'Ecurie Zingaro',
    ownerId: '89109',
    runnersToForm: '',
    officialRating: '',
    topspeedRating: '',
}

const emptyMoreData = {
    sex: '',
    colour: '',
    sireName: '',
    sireOriginCountryCode: '',
    damName: '',
    damOriginCountryCode: '',
    ownerName: '',
    ownerId: '',
    runnersToForm: '',
    officialRating: '',
    topspeedRating: '',
}

const runner = {
    uid: '3525145',
    draw: '',
    horseAge: '3',
    horseName: 'Paint Prince',
    gear: 'hood, tongue strap',
    horseId: '3525145',
    originCountryCode: 'FR',
    isNonRunner: false,
    jockeyName: 'Kevin Nabet',
    jockeyId: '89298',
    rpr: '115',
    saddleClothNumber: '6',
    silkUrl: 'https://www.rp-assets.com/svg/9/0/1/89109.svg',
    trainerName: 'D Cottin',
    trainerId: '33695',
    weightAllowance: '',
    weightExtra: '',
    recentRaceForm: null,
    moreData: { ...moreData },
    spotlightComment: null,
    numberTips: '',
    tipsters: '',
    windOp: '',
    distanceFromHorseInFront: null,
    distanceFromWinner: null,
    officialPosition: '1',
    formatedOfficialPosition: '1st',
    isEWPayingPosition: true,
    summary: null,
    isFavourite: false,
    startingPrice: '13/5',
    weight: '10st 6lb',
    distanceFromNextHorse: '5',
}

const race = {
    id: '787850',
    meetingName: 'Compiegne',
    raceTitle: 'Prix Belle Isle (Hurdle) (Conditions) (3yo Colts & Geldings) (Turf)',
    startTime: '11:50',
    date: '21 June 2021',
    diffusionMeetingName: null,
    utcTime: {
        raceTime: '10:50',
        raceDate: '2021-06-21',
        raceDateTime: '2021-06-21 10:50',
    },
    meetingId: '291',
    localTime: {
        raceTime: '11:50',
        raceDate: '2021-06-21',
        raceDateTime: '2021-06-21 11:50',
    },
}

const cardCustomization = {
    priceType: 'fractional',
    numberOfRecentRaces: 3,
    showRunnerBasicInfo: true,
    showRunnerAdditionalInfo: false,
    showOdds: true,
    runnersSortedBy: 'ODDS',
    isCompactViewEnabled: false,
}

const runnerPropsDesktop = {
    result_details: {
        isDetailsOpen: true,
        isResult: true,
        isCommentOpen: false,
        runner: {
            ...runner,
        },
        cardCustomization: {
            ...cardCustomization,
        },
        race: {
            ...race,
        },
    },
    result_empty_additional_data: {
        isDetailsOpen: true,
        isResult: true,
        isCommentOpen: false,
        runner: {
            ...runner,
            moreData: { ...emptyMoreData },
        },
        cardCustomization: {
            ...cardCustomization,
        },
        race: {
            ...race,
        },
        summary: 'summary_info',
    },
    result_details_no_hdgr: {
        isDetailsOpen: true,
        isResult: true,
        isCommentOpen: false,
        runner: {
            ...runner,
            gear: '',
        },
        cardCustomization: {
            ...cardCustomization,
        },
        race: {
            ...race,
        },
    },
    result_closed_details: {
        isDetailsOpen: false,
        isResult: true,
        isCommentOpen: false,
        runner: {
            ...runner,
            gear: '',
        },
        cardCustomization: {
            ...cardCustomization,
        },
        race: {
            ...race,
        },
    },
    result_with_summary: {
        isDetailsOpen: false,
        isResult: true,
        isCommentOpen: false,
        runner: {
            ...runner,
            gear: '',
        },
        cardCustomization: {
            ...cardCustomization,
        },
        race: {
            ...race,
        },
        summary: 'summary_info',
    },
}

const runnerPropsMobile = {
    result_data: {
        isDetailsOpen: false,
        isResult: true,
        isCommentOpen: false,
        runner: {
            ...runner,
        },
        cardCustomization: {
            ...cardCustomization,
        },
        race: {
            ...race,
        },
        summary: 'summary_info',
    },
    result_data_details: {
        isDetailsOpen: true,
        isResult: true,
        isCommentOpen: false,
        runner: {
            ...runner,
        },
        cardCustomization: {
            ...cardCustomization,
        },
        race: {
            ...race,
        },
        summary: 'summary_info',
    },
}

describe('Runner -- result', () => {
    test('Desktop - renders Runner Data', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <Runner {...runnerPropsDesktop.result_details} />,
        );

        expect(screen.queryByText(/jky/i)).toBeInTheDocument();
        expect(screen.getByText(/Kevin Nabet/i)).toBeInTheDocument();

        expect(screen.queryByText(/age/i)).toBeInTheDocument();
        expect(screen.queryByText(/: 3/i)).toBeInTheDocument();

        expect(screen.queryByText(/RPR/i)).toBeInTheDocument();
        expect(screen.queryByText(/: 115/i)).toBeInTheDocument();

        expect(screen.queryByText(/tnr/i)).toBeInTheDocument();
        expect(screen.queryByText(/D Cottin/i)).toBeInTheDocument();

        expect(screen.queryByText(/wgt/i)).toBeInTheDocument();
    });

    test('Desktop - renders additional Runner Data', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <Runner {...runnerPropsDesktop.result_details} />,
        );

        expect(screen.queryByText(/TS/i)).toBeInTheDocument();
        expect(screen.queryByText(/Sire/i)).toBeInTheDocument();
        expect(screen.queryByText(/Sex/i)).toBeInTheDocument();
        expect(screen.queryByText(/OR/i)).toBeInTheDocument();
        expect(screen.queryByText(/Dam/i)).toBeInTheDocument();
        expect(screen.queryByText(/Hdgr/i)).toBeInTheDocument();
        expect(screen.queryByText(/Colour/i)).toBeInTheDocument();
    });

    test('Desktop - empty additional Runner Data provided', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <Runner {...runnerPropsDesktop.result_empty_additional_data} />,
        );

        expect(screen.queryByText(/TS/i)).toBeInTheDocument();
        expect(screen.queryByText(/Sire/i)).toBeInTheDocument();
        expect(screen.queryByText(/Sex/i)).toBeInTheDocument();
        expect(screen.queryByText(/OR/i)).toBeInTheDocument();
        expect(screen.queryByText(/Dam/i)).toBeInTheDocument();
        expect(screen.queryByText(/Hdgr/i)).toBeInTheDocument();
        expect(screen.queryByText(/Colour/i)).toBeInTheDocument();
    });

    test('Desktop - do not render additional Runner Data', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <Runner {...runnerPropsDesktop.result_closed_details} />,
        );

        expect(screen.queryByText(/TS/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Sire/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Sex/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/OR/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Dam/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Hdgr/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Colour/i)).not.toBeInTheDocument();
    });

    test('Desktop - renders additional Runner Data to not include Hdgr, length, cumulative label', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <Runner {...runnerPropsDesktop.result_details_no_hdgr} />,
        );

        expect(screen.queryByText('Hdgr')).not.toBeInTheDocument();
        expect(screen.queryByText('lengths')).not.toBeInTheDocument();
        expect(screen.queryByText('cumulative')).not.toBeInTheDocument();
    });

    test('Desktop - renders Starting Price', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <Runner {...runnerPropsDesktop.result_details_no_hdgr} />,
        );

        expect(screen.queryByText(/Starting price/i)).toBeInTheDocument();
        expect(screen.queryByText(/13\/5/i)).toBeInTheDocument();
    });

    test('Desktop - renders Starting Price', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <Runner {...runnerPropsDesktop.result_details_no_hdgr} />,
        );

        expect(screen.queryByText(/Starting price/i)).toBeInTheDocument();
        expect(screen.queryByText(/13\/5/)).toBeInTheDocument();
    });

    test('Desktop - renders summary data', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <Runner {...runnerPropsDesktop.result_with_summary} />,
        );

        // summary
        expect(screen.queryByText('summary_info')).toBeInTheDocument();
    });

    test('Desktop - renders country code data FR', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <Runner {...runnerPropsDesktop.result_details} />,
        );

        expect(screen.queryByText('IRE')).toBeInTheDocument();
    });

    test('Desktop - does not render country code data when GB', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <Runner {...runnerPropsDesktop.result_details} />,
        );

        expect(screen.queryByText('GB')).not.toBeInTheDocument();
    });

    // Mobile breakpoint
    test('Mobile - renders result data with summary', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        render(
            <Runner {...runnerPropsMobile.result_data} />,
        );

        expect(screen.queryByText(/jky/i)).toBeInTheDocument();
        expect(screen.queryByText(/tnr/i)).toBeInTheDocument();

        // summary
        expect(screen.queryByText('summary_info')).toBeInTheDocument();
    });

    test('Mobile - renders details data not to be in the document', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isMobile: true,
        }));

        render(
            <Runner {...runnerPropsMobile.result_data_details} />,
        );

        expect(screen.queryByText(/jky/i)).toBeInTheDocument();
        expect(screen.queryByText(/tnr/i)).toBeInTheDocument();

        expect(screen.queryByText(/TS/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Sire/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Sex/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/OR/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Dam/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Hdgr/i)).not.toBeInTheDocument();
        expect(screen.queryByText(/Colour/i)).not.toBeInTheDocument();
    });
});
