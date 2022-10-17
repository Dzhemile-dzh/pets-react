import React, { useMemo } from 'react';
import classnames from 'classnames';
import Link from 'next/link';
import { DesktopRunner } from './DesktopRunner';
import { MobileRunner } from './MobileRunner';
import RunnerRaceForms from './components/RunnerRaceForms';
import RunnerComments from './components/RunnerComments';
import { Constants } from '../../project/constants';
import {
    CardCustomizationInterface,
    RunnerInterface,
    OddsRaceInterface,
} from '../interfaces';

import { generateUrl } from '../../project/utils/generateUrlQueries';
import { useBreakPoint } from '../contexts/BreakPointContext';

import styles from './Runner.module.scss';

const { RUNNER_RACES_TYPES } = Constants;

interface RunnerPropsInterface {
    race: Partial<OddsRaceInterface>;
    runner: RunnerInterface;
    isResult: boolean;
    runnerRaceFormsType: string;
    isCommentOpen: boolean;
    cardCustomization: CardCustomizationInterface;
    isDetailsOpen: boolean;
}

export const Runner = ({
    isCommentOpen,
    runnerRaceFormsType,
    isResult,
    runner,
    cardCustomization,
    race,
    ...rest
} : RunnerPropsInterface): React.ReactElement => {
    const { isMobile } = useBreakPoint();

    const {
        draw,
        horseName,
        isNonRunner,
        isReserve,
        lastResults,
        numberTips,
        originCountryCode,
        recentRaceForm,
        saddleClothNumber,
        spotlightComment,
        summary,
        tipsters,
        uid,
        horseProfileUrl,
    } = runner;

    const horseProfileLink = generateUrl(`/horses/${horseProfileUrl}`, { 'race-id': race.id });

    const lastResultsValue = useMemo(
        () => (
            lastResults ? lastResults.map((item, index) => (
                <span
                    key = {index}
                    className = {item.isBold ?
                        styles['detail__last-results--bold'] :
                        styles['detail__last-results--not-bold']}
                >
                    {item.value}
                </span>
            )) : ''),
        [lastResults],
    );

    const runnerExpandableData = useMemo(() => (
        <div>
            {
                isCommentOpen && (
                    <RunnerComments
                        horseName = {horseName}
                        spotlightComment = {spotlightComment}
                        numberTips = {numberTips}
                        tipsters = {tipsters}
                    />
                )
            }
            {
                (runnerRaceFormsType === RUNNER_RACES_TYPES.RECENT ||
                (runnerRaceFormsType === RUNNER_RACES_TYPES.SUBSEQUENT && !isMobile)) && (
                    <RunnerRaceForms
                        recentRaceForm = {recentRaceForm}
                        numberOfRecentRaces = {cardCustomization.numberOfRecentRaces}
                        runnerRaceFormsType = {runnerRaceFormsType}
                        showCustomLink
                        horseProfileUrl = {horseProfileLink}
                    />
                )
            }
        </div>
    ), [
        isCommentOpen,
        horseName,
        spotlightComment,
        numberTips,
        tipsters,
        isMobile,
        runnerRaceFormsType,
        recentRaceForm,
        cardCustomization.numberOfRecentRaces,
        horseProfileLink,
    ]);

    const summaryData = useMemo(() => (isResult && summary && (
        <div className = {styles['runner__data-more']}>
            <p className = {styles.runner__summary}>{summary}</p>
        </div>
    )), [isResult, summary])

    const runnerInfo = useMemo(() => (
        <div
            className = {styles.runner__info}
            data-testid = "Container__RunnerInfo"
        >
            {saddleClothNumber && (
                <span
                    className = {styles['runner__runner-number']}
                    data-testid = "Text__RunnerNumber"
                >
                    {isNonRunner ?
                        'NR' :
                        `${isReserve ? 'R' : ''}${saddleClothNumber}`}
                    {draw && !isNonRunner && !(isMobile && isResult) &&
                        (
                            <sup
                                data-testid = "Text__RunnerDraw"
                            >
                                {draw}
                            </sup>
                        )}
                </span>
            )}
            <Link
                href = {horseProfileLink}
            >
                <a
                    className = {styles['runner__horse-name']}
                    title = {horseName}
                    data-testid = "Link__RunnerHorseName"
                >
                    {horseName}
                    {
                        originCountryCode && (
                            <sup
                                data-testid = "Text__RunnerCountryCode"
                            >
                                {originCountryCode}
                            </sup>
                        )
                    }
                </a>
            </Link>
        </div>
    ), [
        draw,
        horseName,
        horseProfileLink,
        isMobile,
        isNonRunner,
        isReserve,
        isResult,
        originCountryCode,
        saddleClothNumber,
    ]);

    const runnerClassName = classnames(
        styles.runner,
        {
            [styles['runner--result']]: isResult,
            [styles['runner--non-runner']]: isNonRunner,
            [styles['runner--racecard-non-runner']]: !isResult && isNonRunner,
        },
        styles[`runner--id-${uid}`],
    );

    return (
        <div className = {runnerClassName} data-testid = {`Container__${runner.horseId}__Runner`}>
            {isMobile ? (
                <MobileRunner
                    lastResultsValue = {lastResultsValue}
                    runnerInfo = {runnerInfo}
                    summary = {summaryData}
                    race = {race}
                    runnerExpandableData = {runnerExpandableData}
                    runner = {runner}
                    cardCustomization = {cardCustomization}
                    isResult = {isResult}
                    {...rest}
                />
            ) : (
                <DesktopRunner
                    lastResultsValue = {lastResultsValue}
                    runnerInfo = {runnerInfo}
                    summary = {summaryData}
                    race = {race}
                    runnerExpandableData = {runnerExpandableData}
                    runner = {runner}
                    cardCustomization = {cardCustomization}
                    isResult = {isResult}
                    {...rest}
                />
            )}
        </div>
    )
}
