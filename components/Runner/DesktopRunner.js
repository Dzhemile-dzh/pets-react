import React from 'react';
import classnames from 'classnames';
import { RunnerPropsType } from './components/RunnerDataTypes';
import RunnerSilk from '../base/Silk';
import StartingPrice from './components/StartingPrice';
import Detail from '../base/Detail';
import Odds from '../base/Odds/index.tsx';
import { useBreakPoint } from '../contexts/BreakPointContext';
import { Constants } from '../../project/constants';

import styles from './Runner.module.scss';

const { COUNTRY_CODES } = Constants;

export const DesktopRunner = ({
    cardCustomization,
    runnerExpandableData,
    lastResultsValue,
    isResult,
    race,
    runner,
    runnerInfo,
    summary,
    isDetailsOpen,
}) => {
    const { isTablet } = useBreakPoint();

    const {
        daysSinceLastRun,
        distanceFromHorseInFront,
        distanceFromNextHorse,
        distanceFromWinner,
        expectedWeight,
        formatedOfficialPosition,
        gear,
        horseAge,
        isEWPayingPosition,
        isFavourite,
        isNonRunner,
        jockeyName,
        moreData,
        numberTips,
        officialPosition,
        rpr,
        silkUrl,
        startingPrice,
        trainerName,
        weight,
        weightAllowance,
        weightExtra,
    } = runner;

    const {
        colour,
        damName,
        officialRating,
        ownerName,
        sex,
        sireName,
        topspeedRating,
        sireOriginCountryCode,
        damOriginCountryCode,
    } = moreData;

    const { showOdds } = cardCustomization;

    const isOnePosition = officialPosition === 'DSQ';
    const isVoidPosition = officialPosition === 'V';

    const positionToBeDisplayed = formatedOfficialPosition &&
        (isVoidPosition ? formatedOfficialPosition.toLowerCase() :
            formatedOfficialPosition !== '0' ? formatedOfficialPosition.substr(-2) : '');

    const lengthsLabel = officialPosition === '1' ?
        'won by' : 'lengths';
    const lengthsValue = officialPosition === '1' ?
        distanceFromNextHorse : distanceFromHorseInFront;

    const cumulativeLengthsLabel = officialPosition === '1' ?
        'cumulative no value' : 'cumulative';
    const cumulativeLengthsValue = officialPosition === '1' ? '' : distanceFromWinner;

    const runnerData = [
        {
            label: 'jky',
            value: jockeyName,
            sup: weightAllowance,
            tooltipText: jockeyName,
        }, {
            label: 'age',
            value: horseAge,
        }, {
            label: isResult ? lengthsLabel : 'last results',
            value: isResult ? lengthsValue : lastResultsValue,
        }, {
            label: 'tnr',
            value: trainerName,
            tooltipText: trainerName,
        }, {
            label: 'wgt',
            value: isResult ? weight : expectedWeight,
            sup: weightExtra,
        }, {
            label: isResult ? cumulativeLengthsLabel : 'days since last run',
            value: isResult ? cumulativeLengthsValue : daysSinceLastRun,
        }, {
            label: 'hdgr',
            value: gear,
            tooltipText: gear,
        }, {
            label: 'RPR',
            value: rpr,
        },
    ];

    const additionalRunnerData = isResult && isDetailsOpen ? [
        {
            label: 'TS',
            value: topspeedRating && `: ${topspeedRating}`,
        },
        {
            label: 'Sire',
            value: sireName && `: ${sireName}`,
            tooltipText: sireName,
            sup: sireOriginCountryCode && sireOriginCountryCode !== COUNTRY_CODES.GB ?
                sireOriginCountryCode : '',
        },
        {
            label: 'Owner',
            value: ownerName && `: ${ownerName}`,
            tooltipText: ownerName,
        },
        {
            label: 'Sex', value: sex && `: ${sex}`,
        },
        {
            label: 'OR', value: officialRating && `: ${officialRating}`,
        },
        {
            label: 'Dam',
            value: damName && `: ${damName}`,
            tooltipText: damName,
            sup: damOriginCountryCode && damOriginCountryCode !== COUNTRY_CODES.GB ?
                damOriginCountryCode : '',
        },
        {
            label: gear ? 'Hdgr' : 'hdgr-no-value',
            value: `: ${gear}`,
            tooltipText: gear,
        },
        {
            label: 'Colour',
            value: colour && `: ${colour}`,
        },
    ] : '';

    const runnerDataResult = [
        {
            label: 'jky',
            value: jockeyName && `: ${jockeyName}`,
            sup: weightAllowance,
            tooltipText: jockeyName,
        }, {
            label: 'age',
            value: horseAge && `: ${horseAge}`,
        },
        {
            label: 'RPR',
            value: rpr && `: ${rpr}`,
        }, {
            label: isResult ? lengthsLabel : 'last results',
            value: isResult ? (lengthsValue && `: ${lengthsValue}`) : lastResultsValue,
        },
        {
            label: isResult ? cumulativeLengthsLabel : 'days since last run',
            value: isResult ?
                (cumulativeLengthsValue && `: ${cumulativeLengthsValue}`) : daysSinceLastRun,
        }, {
            label: 'tnr',
            value: trainerName && `: ${trainerName}`,
            tooltipText: trainerName,
        }, {
            label: 'wgt',
            value: isResult ? (weight && `: ${weight}`) : expectedWeight,
            sup: weightExtra,
        },
        ...additionalRunnerData,
    ];

    // Those two wont be needed when we implement the new designs for the runner

    // NOTE:
    // Swap places of cumulative lengths and headgear
    // properties only for winner runner on Tablet breakpoint.
    if (
        isResult &&
            isTablet &&
            officialPosition === '1'
    ) {
        const tmp = runnerData[5];
        // eslint-disable-next-line prefer-destructuring
        runnerData[5] = runnerData[6]
        runnerData[6] = tmp;
    }

    const runnerPositionClassName = classnames(
        styles.runner__position,
        {
            [styles['runner__position--each-way']]: isEWPayingPosition,
            [styles['runner__position--only']]: isOnePosition,
        },
    )

    const hideField = isResult && officialPosition === '2';

    return (
        <>
            <div
                className = {styles.runner__container}
                data-testid = "Container__RunnerData"
            >
                {isEWPayingPosition &&
                <span className = {styles['runner__ew-paying-position']} />}
                {isResult && (
                <div className = {runnerPositionClassName}>
                    <span
                        className = {styles['runner__position-number']}
                    >
                        {officialPosition}
                    </span>
                    {!isOnePosition && (
                    <span className = {styles['runner__position-ordinal']}>
                        {positionToBeDisplayed}
                    </span>
                    )}
                </div>
                )}
                <div className = {styles.runner__silk}>
                    <RunnerSilk
                        isRunner
                        silkUrl = {silkUrl}
                        tips = {numberTips}
                    />
                </div>
                <div
                    className = {styles['runner__data--columns']}
                    data-testid = "Container__RunnerDetails"
                >
                    {runnerInfo}
                    {isResult ?
                        runnerDataResult.map((attr, index) => (
                            <Detail
                                key = {index}
                                value = {attr.value}
                                label = {attr.label}
                                sup = {attr.sup}
                                className = {attr.class}
                                tooltipText = {attr.tooltipText}
                                isResult = {isResult}
                                hideField = {hideField}
                                testIdPrefix = "Runner"
                            />
                        )) :
                        runnerData.map((attr, index) => (
                            <Detail
                                key = {index}
                                value = {attr.value}
                                label = {attr.label}
                                sup = {attr.sup}
                                className = {attr.class}
                                tooltipText = {attr.tooltipText}
                                isResult = {isResult}
                                hideField = {hideField}
                                testIdPrefix = "Runner"
                            />
                        ))}
                </div>
                {isResult && (
                    <div className = {styles['runner__starting-price']}>
                        <StartingPrice
                            isFav = {isFavourite}
                            startingPrice = {startingPrice}
                        />
                    </div>
                )}
                {
                    !isResult &&
                    !isNonRunner && (
                        <Odds
                            race = {race}
                            runner = {runner}
                            showOdds = {showOdds}
                            shouldShowFavLabel
                        />
                    )
}
            </div>
            {summary}

            {runnerExpandableData}
        </>
    )
}

DesktopRunner.propTypes = RunnerPropsType;
