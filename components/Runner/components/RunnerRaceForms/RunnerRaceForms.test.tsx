/* eslint-disable no-undef */
import React from 'react';
import { useRouter } from 'next/router';
import { screen } from '@testing-library/react'
import { wrapperRender as render } from '../../../../project/utils/testUtility';
import { RunnerRaceForms } from './RunnerRaceForms';
import { Constants } from '../../../../project/constants';
import * as hooks from '../../../contexts/BreakPointContext';

const { RUNNER_RACES_TYPES } = Constants;

const runnerRacesProps = {
    recentRaceForm: {
        data: [
            {
                raceId: '779456',
                raceClass: '4 *',
                raceTitle:
                "Sky Sports Racing On Sky 415 'National Hunt' Maiden Hurdle (GBB Race) (Div I)",
                going: 'Good',
                displayDistance: '2m 2½f *',
                meetingId: null,
                meetingName: 'Newton Abbot',
                meetingDate: '03 Apr 2021',
                runnerId: '3038145',
                runnerCloseUpComment: '3038145 - Lorem Ipsum',
                weightCarried: '11st 2lb',
                topspeedRating: 40,
                racingPostRating: 98,
                officialRating: '115',
                startingPrice: '2/7F',
                position: '1 of 8',
                isRunnerWinner: false,
                winnerAndLengths: 'Mr Sociable (3 L)',
                raceTypeDescription: 'Hurdle * Turf - Maiden',
                showNote: true,
                raceUrl: '/results/2021-04-03/1205/Sky-Sports-Racing-In-Sky-415',
            },
            {
                raceId: '777628',
                raceClass: '1',
                raceTitle:
                "European Breeders' Fund Paddy Power Handicap Hurdle Final (Grade 3) (GBB)",
                going: 'Soft *',
                displayDistance: '2m 4f',
                meetingId: null,
                meetingName: 'Sandown',
                meetingDate: '13 Mar 2021',
                runnerId: '3038145',
                weightCarried: '10st 10lb',
                topspeedRating: 61,
                racingPostRating: 103,
                officialRating: '117',
                startingPrice: '12/1',
                position: '9 of 15',
                isRunnerWinner: false,
                winnerAndLengths: 'Beauport (26¼ L)',
                raceTypeDescription: 'Hurdle * Turf - Grade 3 Handicap Novice',
                showNote: true,
            },
            {
                raceId: '777465',
                raceClass: '4 *',
                raceTitle: 'Download The Star Sports App Now! Maiden Hurdle (GBB Race)',
                going: 'Good',
                displayDistance: '2m',
                meetingId: null,
                meetingName: 'Plumpton',
                meetingDate: '01 Mar 2021',
                runnerId: '3038145',
                weightCarried: '11st 2lb',
                topspeedRating: null,
                racingPostRating: null,
                officialRating: '117',
                startingPrice: '8/13F',
                position: 'V of 11',
                isRunnerWinner: false,
                winnerAndLengths: '',
                raceTypeDescription: 'Hurdle * Turf - Maiden',
                showNote: true,

            },
            {
                raceId: '778047',
                raceClass: '5',
                raceTitle: "vbet.co.uk \"Jumpers' Bumper\" National Hunt Flat Race (Div I) (AW)",
                going: 'Standard To Slow',
                displayDistance: '2m 2f',
                meetingId: null,
                meetingName: 'Kempton',
                meetingDate: '11 Feb 2021',
                runnerId: '3038145',
                weightCarried: '11st 4lb',
                topspeedRating: null,
                racingPostRating: 112,
                officialRating: '',
                startingPrice: '5/2F',
                position: '2 of 11',
                isRunnerWinner: false,
                winnerAndLengths: 'Floy Joy (Head)',
                raceTypeDescription: 'NH Flat Polytrack',
                showNote: false,
            },
        ],
        isLoading: false,
        error: null,
    },
    numberOfRecentRaces: 2,
    showCustomLink: false,
    horseProfileUrl: 'horseProfileUrl',
    runnerRaceFormsType: null,
};

const DESKTOP = 'desktop'
const TABLET = 'tablet'

jest.mock('next/router', () => ({
    useRouter: jest.fn(),
}));

const push = jest.fn();

const expectDateAndPositionToBeClickable = (breakPoint: string) => {
    const dateLink = screen.getByText('03 Apr 2021');
    expect(dateLink).toBeInTheDocument();
    const positionLink = screen.getByText('1 of 8');
    expect(positionLink).toBeInTheDocument();

    // Links are rendered only on desktop.
    // On tablet it's an onClick
    if (breakPoint === DESKTOP) {
        expect(dateLink.getAttribute('href'))
            .toEqual('/results/2021-04-03/1205/Sky-Sports-Racing-In-Sky-415');
        expect(positionLink.getAttribute('href'))
            .toEqual('/results/2021-04-03/1205/Sky-Sports-Racing-In-Sky-415');
    }

    // We test the click only on tablet as next/link is not supported in jest
    if (breakPoint === TABLET) {
        dateLink.click();
        positionLink.click();
        // eslint-disable-next-line react-hooks/rules-of-hooks
        expect(push).toHaveBeenCalledTimes(2);
        // eslint-disable-next-line react-hooks/rules-of-hooks
        expect(push).toHaveBeenCalledWith(
            '/results/2021-04-03/1205/Sky-Sports-Racing-In-Sky-415',
        );
    }
}

const expectDateAndPositionToBeDiv = () => {
    const dateLink = screen.getByText('13 Mar 2021');
    expect(dateLink.tagName).toEqual('DIV');
    const positionLink = screen.getByText('9 of 15');
    expect(positionLink.tagName).toEqual('DIV');
}

describe('RunnerRaces', () => {
    test('renders recent form information', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <RunnerRaceForms
                {...runnerRacesProps}
                runnerRaceFormsType = {RUNNER_RACES_TYPES.RECENT}
            />,
        );

        const recentFormTitle = screen.getByText('Recent race form');
        expect(recentFormTitle).toBeInTheDocument();
    });

    test('renders subsequent form information', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <RunnerRaceForms
                {...runnerRacesProps}
                runnerRaceFormsType = {RUNNER_RACES_TYPES.SUBSEQUENT}
            />,
        );

        const subsequentFormTitle = screen.getByText('Subsequent form');
        expect(subsequentFormTitle).toBeInTheDocument();
    });

    test('renders message when there is no history data', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        const props = {
            ...runnerRacesProps,
            recentRaceForm: { data: [], isLoading: false, error: null },
        }

        render(
            <RunnerRaceForms
                {...props}
            />,
        );

        const subsequentFormTitle = screen
            .getByText('There is no subsequent race form information available for the runner.');
        expect(subsequentFormTitle).toBeInTheDocument();
    });

    test(`renders only ${runnerRacesProps.numberOfRecentRaces} recent races`, () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <RunnerRaceForms
                {...runnerRacesProps}
            />,
        );

        const rows = screen.getAllByRole('row');
        expect(rows.length).toEqual(runnerRacesProps.numberOfRecentRaces + 1);
        // NOTE: the '+ 1' is for the header row
    });

    test('renders message if races have same conditions as context race', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <RunnerRaceForms
                {...runnerRacesProps}
            />,
        );

        const sameRaceMessage = screen.getByText('* Same conditions as this race');
        expect(sameRaceMessage).toBeInTheDocument();
    });

    test('renders message if races have no common conditions with context race', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <RunnerRaceForms
                {
                    ...{
                        ...runnerRacesProps,
                        recentRaceForm: {
                            ...runnerRacesProps.recentRaceForm,
                            data: runnerRacesProps
                                .recentRaceForm
                                .data
                                .map((item) => ({ ...item, showNote: false })),
                        },
                    }
                }
            />,
        );

        const sameRaceMessage = screen.queryByText('* Same conditions as this race');
        expect(sameRaceMessage).toBeNull();
    });

    test('Desktop - display WINNER (LENGTHS) column', () => {
        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isDesktop: true,
        }));

        render(
            <RunnerRaceForms
                {...runnerRacesProps}
                runnerRaceFormsType = {RUNNER_RACES_TYPES.RECENT}
            />,
        );
        const winnerLengthLabel = screen.queryByText('WINNER (LENGTHS)');
        expect(winnerLengthLabel).toBeInTheDocument();
    });

    describe('Navigation - Recent Form', () => {
        test('Desktop - Date and Position column should be a link with race url', () => {
            (useRouter as jest.Mock).mockImplementation(() => ({
                push,
            }));

            jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
                isDesktop: true,
            }));

            render(
                <RunnerRaceForms
                    {...runnerRacesProps}
                    runnerRaceFormsType = {RUNNER_RACES_TYPES.RECENT}
                />,
            );

            expectDateAndPositionToBeClickable(DESKTOP);
        });

        test('Desktop - Date and Position column should not be a link without race url', () => {
            jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
                isDesktop: true,
            }));

            render(
                <RunnerRaceForms
                    {...runnerRacesProps}
                    runnerRaceFormsType = {RUNNER_RACES_TYPES.RECENT}
                />,
            );

            expectDateAndPositionToBeDiv();
        });

        test('Tablet - Date and Position should be clickable', () => {
            (useRouter as jest.Mock).mockImplementation(() => ({
                push,
            }));

            jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
                isTablet: true,
            }));

            render(
                <RunnerRaceForms
                    {...runnerRacesProps}
                    runnerRaceFormsType = {RUNNER_RACES_TYPES.RECENT}
                />,
            );

            expectDateAndPositionToBeClickable(TABLET);
        });
    });

    describe('Navigation - Subsequent Form', () => {
        test('Desktop - Date and Position column should be a link with race url', () => {
            (useRouter as jest.Mock).mockImplementation(() => ({
                push,
            }));

            jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
                isDesktop: true,
            }));
            render(
                <RunnerRaceForms
                    {...runnerRacesProps}
                    runnerRaceFormsType = {RUNNER_RACES_TYPES.SUBSEQUENT}
                />,
            );

            expectDateAndPositionToBeClickable(DESKTOP);
        });

        test('Desktop - Date and Position column should not be a link without race url', () => {
            jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
                isDesktop: true,
            }));

            render(
                <RunnerRaceForms
                    {...runnerRacesProps}
                    runnerRaceFormsType = {RUNNER_RACES_TYPES.SUBSEQUENT}
                />,
            );

            expectDateAndPositionToBeDiv();
        });

        test('Tablet - Date and Position should be clickable', () => {
            (useRouter as jest.Mock).mockImplementation(() => ({
                push,
            }));

            jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
                isTablet: true,
            }));

            render(
                <RunnerRaceForms
                    {...runnerRacesProps}
                    runnerRaceFormsType = {RUNNER_RACES_TYPES.SUBSEQUENT}
                />,
            );

            expectDateAndPositionToBeClickable(TABLET);
        });
    });
});
