import React, { PureComponent } from 'react';
import classnames from 'classnames';
import { RunnerPropsType } from './components/RunnerDataTypes';
import RunnerSilk from '../base/Silk';
import Detail from '../base/Detail';
import Odds from '../base/Odds/index.tsx';

import styles from './Runner.module.scss';

export class MobileRunner extends PureComponent {
    render() {
        const {
            cardCustomization,
            runnerExpandableData,
            lastResultsValue,
            isResult,
            race,
            runner,
            runnerInfo,
            summary,
        } = this.props;

        const {
            daysSinceLastRun,
            distanceFromHorseInFront,
            distanceFromNextHorse,
            expectedWeight,
            formatedOfficialPosition,
            gear,
            horseAge,
            isEWPayingPosition,
            isFavourite,
            isNonRunner,
            jockeyName,
            numberTips,
            officialPosition,
            rpr,
            silkUrl,
            startingPrice,
            trainerName,
            weight,
            weightAllowance,
            weightExtra,
            windOperation,
            distanceFromWinner,
        } = runner;

        const { officialRating, topspeedRating } = runner.moreData;
        const {
            showOdds,
            showRunnerBasicInfo,
            showRunnerAdditionalInfo,
        } = cardCustomization;
        const isOnePosition = officialPosition === 'DSQ';
        const isVoidPosition = officialPosition === 'V';

        const runnerDataRow = [
            {
                label: 'Last results:',
                value: lastResultsValue,
            }, {
                label: showRunnerBasicInfo ? 'Last run:' : '',
                value: showRunnerBasicInfo ? daysSinceLastRun : '',
            },
        ];

        const runnerDataCol = [
            {
                label: 'Age:',
                value: horseAge,
            }, {
                label: 'Wgt:',
                value: isResult ? weight : expectedWeight,
                sup: weightExtra,
            }, {
                label: 'RPR:',
                value: rpr,
            },
        ];

        const runnerMoreData = [
            {
                label: 'Jky:',
                value: jockeyName,
                sup: weightAllowance,
                tooltipText: jockeyName,
                isLink: true,
            }, {
                label: 'Tnr:',
                value: trainerName,
                tooltipText: trainerName,
                isLink: true,
            },
        ];

        const runnerAdditionalData = [
            {
                label: 'OR',
                value: officialRating,
            }, {
                label: 'Topspeed:',
                value: topspeedRating,
            }, {
                label: 'Hdgr:',
                value: gear,
            }, {
                label: 'Wind op:',
                value: windOperation,
            },
        ]

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

        const runnerResultData = [
            {
                label: lengthsLabel,
                value: lengthsValue && `: ${lengthsValue}`,
            },
            {
                label: isResult ? cumulativeLengthsLabel : 'days since last run',
                value: isResult ?
                    (cumulativeLengthsValue && `: ${cumulativeLengthsValue}`) : daysSinceLastRun,
            },
            {
                label: 'starting price',
                value: startingPrice && `: ${startingPrice}`,
            },
            {
                label: 'jky',
                value: jockeyName && `: ${jockeyName}`,
                sup: weightAllowance,
                tooltipText: jockeyName,
            },
            {
                label: 'tnr',
                value: trainerName && `: ${trainerName}`,
                tooltipText: trainerName,
            },
        ]

        const hideField = isResult && officialPosition === '2';

        const renderRunnerDataAtrrtibute = (attr, index) => (
            <Detail
                key = {index}
                value = {attr.value}
                label = {attr.label}
                className = {attr.class}
                sup = {attr.sup}
                tooltipText = {attr.tooltipText}
                accessibilityText = {attr.accessibilityText}
                isLink = {attr.isLink}
                isResult = {isResult}
                hideField = {hideField}
            />
        );

        const runnerPositionClassName = classnames(
            styles.runner__position,
            {
                [styles['runner__position--each-way']]: isEWPayingPosition,
            },
        )

        const hasOdds = !isResult && !isNonRunner;
        const containerClassName = classnames(
            styles.runner__container,
            {
                [styles['runner__container--has-odds']]: hasOdds,
            },
        );

        return (
            <>
                {isEWPayingPosition && <span className = {styles['runner__ew-paying-position']} />}
                <div className = {containerClassName} data-testid = "Container__RunnerMainData">
                    <div
                        className = {styles['runner__main-data']}
                        data-testid = "Container__RunnerInnerMainData"
                    >
                        {isResult && (
                        <div className = {runnerPositionClassName}>
                            <span
                                className = {styles['runner__position-number']}
                            >
                                {officialPosition}
                            </span>
                            {!isOnePosition && (
                            <span className = {classnames(
                                styles['runner__position-ordinal'],
                                {
                                    [styles['runner__position-ordinal-void']]: isVoidPosition,
                                },
                            )}
                            >
                                {positionToBeDisplayed}
                            </span>
                            )}
                        </div>
                        )}
                        <div
                            className = {styles.runner__title}
                            data-testid = "Container__RunnerMobileTitle"
                        >
                            <div className = {styles.runner__silk}>
                                <RunnerSilk
                                    isRunner
                                    silkUrl = {silkUrl}
                                    tips = {numberTips}
                                />
                            </div>
                            {runnerInfo}
                            {isResult &&
                            isFavourite && <span className = {styles.runner__favourite}>fav</span>}
                        </div>
                        <div
                            className = {classnames(
                                isResult ?
                                    styles['runner__data--columns'] :
                                    styles['runner__data--rows'],
                            )}
                            data-testid = "Container__RunnerDataRows"
                        >
                            {isResult ?
                                runnerResultData.map((attrData, index) => {
                                    return renderRunnerDataAtrrtibute(attrData, index);
                                }) :
                                runnerDataRow.map((attrData, index) => {
                                    return renderRunnerDataAtrrtibute(attrData, index);
                                })}
                        </div>
                    </div>
                    {
                        hasOdds && (
                            <Odds
                                race = {race}
                                runner = {runner}
                                showOdds = {showOdds}
                                showCompareOdds
                                shouldShowFavLabel
                            />
                        )
                    }
                </div>
                {!isResult && (
                    <div
                        className = {styles['runner__data--columns']}
                        data-testid = "Container__RunnerAgeWeightRPR"
                    >
                        {showRunnerBasicInfo && runnerDataCol.map((attrData, index) => {
                            return renderRunnerDataAtrrtibute(attrData, index);
                        })}
                    </div>
                )}
                {summary}
                {!isResult && (
                    <>
                        <div
                            className = {styles['runner__data-more-separator']}
                            data-testid = "Separator__RunnerData"
                        />
                        <div
                            className = {styles['runner__data-more']}
                            data-testid = "Container__RunnerJockeyTrainer"
                        >
                            {runnerMoreData.map((attrData, index) => {
                                return renderRunnerDataAtrrtibute(attrData, index);
                            })}
                        </div>
                        {showRunnerAdditionalInfo && (
                            <div className = {styles['runner__data-additional']}>
                                {
                                runnerAdditionalData.map((attrData, index) => {
                                    return renderRunnerDataAtrrtibute(attrData, index);
                                })
                            }
                            </div>
                        )}
                    </>
                )}
                {runnerExpandableData}
            </>
        )
    }
}

MobileRunner.propTypes = RunnerPropsType;
MobileRunner.displayName = 'MobileRunner';
