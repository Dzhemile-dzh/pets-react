import React, { useMemo } from 'react';
import { useRouter } from 'next/router'
import Link from 'next/link';
import classnames from 'classnames';
import Loader from '../../../base/Loader';
import Table from '../../../base/Table';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';
import { RecentRaceFormObjectInterface } from '../../../interfaces';
import { useBreakPoint } from '../../../contexts/BreakPointContext';

import { Constants } from '../../../../project/constants';
import {
    mobileColumns,
    tabletColumns,
    desktopColumns,
    playColumnContent,
} from './TableColumns';

import styles from './RunnerRaceForms.module.scss';

const { RUNNER_RACES_TYPES } = Constants;

function LinkToRace(raceUrl: string, label: string) {
    return raceUrl ? (
        <Link
            href = {raceUrl}
        >
            <a className = {styles['runner-race-forms__link']}>
                {label}
            </a>
        </Link>
    ) : label
}

export interface RunnerRaceFormsWrapperInterface {
    recentRaceForm: RecentRaceFormObjectInterface;
    numberOfRecentRaces: number;
    runnerRaceFormsType?: string;
    showCustomLink: boolean;
    horseProfileUrl: string;
}

export const RunnerRaceForms = ({
    recentRaceForm,
    numberOfRecentRaces,
    runnerRaceFormsType,
    showCustomLink,
    horseProfileUrl,
}: RunnerRaceFormsWrapperInterface) : React.ReactElement => {
    const isLoading = recentRaceForm?.isLoading;
    const error = recentRaceForm?.error;

    const { isMobile, isDesktop } = useBreakPoint();

    const columns = isMobile ? mobileColumns : isDesktop ? desktopColumns : tabletColumns;
    const isRecentForm = runnerRaceFormsType === RUNNER_RACES_TYPES.RECENT;

    const router = useRouter();

    const slicedRows = recentRaceForm?.data?.slice(0, numberOfRecentRaces);

    const rows = useMemo(() => (
        isRecentForm ? slicedRows : slicedRows?.sort((rowA, rowB) => {
            return Date.parse(rowA?.meetingDate) > Date.parse(rowB.meetingDate) ? 1 : -1
        })), [isRecentForm, slicedRows]);

    const showNote = rows?.some((item) => item.showNote);
    const rowElements = useMemo(() => {
        return rows?.map((item) => {
            const {
                meetingDate,
                meetingName,
                weightCarried,
                position,
                winnerAndLengths,
                officialRating,
                topspeedRating,
                racingPostRating,
                startingPrice,
                isRunnerWinner,
                displayDistance,
                going,
                raceClass,
                raceTypeDescription,
                raceTitle,
                raceUrl,
                runnerCloseUpComment,
            } = item;

            const navigateToRace = () => {
                if (raceUrl) {
                    router.push(raceUrl);
                }
            };

            const ratingColumnsContent = [
                {
                    className: styles['runner-race-forms__column-or'],
                    data: [officialRating],
                },
                {
                    className: styles['runner-race-forms__column-ts'],
                    data: [topspeedRating],
                },
                {
                    className: styles['runner-race-forms__column-rpr'],
                    data: [racingPostRating],
                },
                {
                    className: styles['runner-race-forms__column-sp'],
                    data: [startingPrice],
                },
            ];

            const mobileColumnsContent = [
                {
                    className: styles['runner-race-forms__column-1'],
                    data: [meetingDate, meetingName],
                    accessibilityText: `${meetingDate} at ${meetingName}`,
                },
                {
                    className: styles['runner-race-forms__column-2'],
                    data: [raceClass, displayDistance],
                    accessibilityText: `class ${raceClass}, ${displayDistance}`,
                },
                {
                    className: styles['runner-race-forms__column-3'],
                    data: [going, position],
                    accessibilityText: `${going}, ${position}`,
                },
            ];

            const tabletColumnsContent = [
                playColumnContent,
                {
                    className: styles['runner-race-forms__column-1'],
                    data: [meetingDate, meetingName],
                    accessibilityText: `${meetingDate} at ${meetingName}`,
                    tooltipText: `${meetingDate} at ${meetingName}`,
                    onClick: navigateToRace,
                },
                {
                    className: styles['runner-race-forms__column-2'],
                    data: [raceTypeDescription, raceClass],
                    accessibilityText: `${raceTypeDescription}, class ${raceClass}`,
                    tooltipText: `${raceTypeDescription}, class ${raceClass}`,
                },
                {
                    className: styles['runner-race-forms__column-3'],
                    data: [displayDistance, going],
                    accessibilityText: `${displayDistance}, ${going}`,
                    tooltipText: `${displayDistance}, ${going}`,
                },
                {
                    className: styles['runner-race-forms__column-4'],
                    data: [weightCarried, position],
                    accessibilityText: `${weightCarried}, ${position}`,
                    tooltipText: `${weightCarried}, ${position}`,
                    onClick: navigateToRace,
                },
                ...ratingColumnsContent,
            ];

            const desktopColumnsContent = [
                playColumnContent,
                {
                    className: styles['runner-race-forms__column-1'],
                    data: [LinkToRace(raceUrl, meetingDate)],
                    tooltipText: raceTitle,
                },
                {
                    className: styles['runner-race-forms__column-2'],
                    data: [meetingName],
                    tooltipText: meetingName,
                },
                {
                    className: styles['runner-race-forms__column-3'],
                    data: [raceTypeDescription],
                    tooltipText: raceTypeDescription,
                },
                {
                    className: styles['runner-race-forms__column-4'],
                    data: [raceClass],
                    accessibilityText: `class ${raceClass}`,
                },
                {
                    className: styles['runner-race-forms__column-5'],
                    data: [displayDistance],
                },
                {
                    className: styles['runner-race-forms__column-6'],
                    data: [going],
                    tooltipText: going,
                },
                {
                    className: styles['runner-race-forms__column-7'],
                    data: [weightCarried],
                },
                {
                    className: styles['runner-race-forms__column-8'],
                    data: [LinkToRace(raceUrl, position)],
                    tooltipText: runnerCloseUpComment,
                },
                {
                    className: styles['runner-race-forms__column-winner'],
                    data: [isRunnerWinner ? 'NA' : winnerAndLengths],
                    tooltipText: winnerAndLengths,
                },
                ...ratingColumnsContent,
            ];

            if (isMobile) {
                return mobileColumnsContent;
            }

            if (isDesktop) {
                return desktopColumnsContent;
            }

            return tabletColumnsContent;
        })
    }, [isMobile, isDesktop, router, rows])

    const isNoInfoMsgShown = error || !rowElements || rowElements.length === 0;

    const formData = useMemo(() => ({
        title: isRecentForm ? 'Recent race form' : 'Subsequent form',
        noDataMessage: isRecentForm ?
            'There is no recent race form information available for the runner.' :
            'There is no subsequent race form information available for the runner.',
    }), [isRecentForm]);

    return (
        <div
            className = {styles['runner-race-forms']}
            data-testid = "Container__RaceForm"
        >
            <div
                key = "title"
                className = {styles['runner-race-forms__title-container']}
                data-testid = "Container__RaceFormTitle"
            >
                <span
                    className = {styles['runner-race-forms__title']}
                    data-testid = "Text__RaceFormTitle"
                >
                    {formData.title}
                </span>
                {showCustomLink && (
                    <Link
                        href = {horseProfileUrl}
                    >
                        <a
                            className = {
                                classnames(
                                    styles['runner-race-forms__view-all-link'],
                                    styles['card-runner__name-value'],
                                )
                            }
                            data-testid = "Link__RaceFormAllRaces"

                        >
                            {isMobile ? 'View all' : 'View all past races'}
                            <span
                                className = {styles['runner-race-forms__chevron']}
                            >
                                <ChevronIcon
                                    color = "primary"
                                    size = "small"
                                    data-testid = "Icon__RaceFormAllRaces"
                                />
                            </span>
                        </a>
                    </Link>
                )}
            </div>
            {isLoading && (
                <span className = {styles['runner-race-forms__loader']}>
                    <Loader />
                </span>
            )}
            {!isLoading && !isNoInfoMsgShown && (
                <Table
                    columns = {columns}
                    tableName = "runner-race-forms"
                    data = {rowElements}
                />
            )}
            { !isLoading && isNoInfoMsgShown && (
                <p
                    className = {styles['runner-race-forms__no-data']}
                    data-testid = "Text__RunnerRaceFormNoData"
                >
                    {formData.noDataMessage}
                </p>
            ) }
            {showNote && (
                <span
                    className = {styles['runner-race-forms__note']}
                    data-testid = "Text__RaceFormNote"
                >
                    * Same conditions as this race
                </span>
            )}
        </div>
    );
};
