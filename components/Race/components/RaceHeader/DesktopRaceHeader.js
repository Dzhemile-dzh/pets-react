import React, { PureComponent } from 'react';
// eslint-disable-next-line max-len
import StreamProviders from '../../../RaceCards/components/RaceCardInformation/components/StreamProviders';

import CountdownLabel from '../../../base/CountdownLabel';
import Weather from '../Weather';
import { PartialLogoIcon } from '../../../base/Icons/PartialLogoIcon';
import HeaderItem from './HeaderItem';
import { RaceHeaderTypes } from './RaceHeaderTypes';

import { getAgeAccessibilityText } from '../../../../project/utils/accessibilityTransformations';
import { getHeaderText } from '../../../RaceCards/utils';
import { Constants } from '../../../../project/constants';

import styles from './RaceHeader.module.scss';

const { DATE_FORMATS: { DD_MMMM_YYYY } } = Constants;

export default class DesktopRaceHeader extends PureComponent {
    render() {
        const {
            startTime,
            name,
            raceClass,
            displayDistance,
            ageRestriction,
            rating,
            going,
            liveOn,
            winnerPrize,
            surfaceType,
            eachWayTerms,
            raceLocalTime,
            status,
            raceType,
            formatedCategory,
            raceTitle,
            maxNumberOfRunners,
            numberOfRunners,
            winningTime,
            timePerFurlong,
            isResult,
            weather,
            localTime: {
                raceDate,
            },
        } = this.props;

        const formattedMaxNumberOfRunners = maxNumberOfRunners ? `(max ${maxNumberOfRunners})` : '';
        const formattedNumberOfRunners = numberOfRunners && maxNumberOfRunners ?
            `${numberOfRunners} ${formattedMaxNumberOfRunners}` :
            numberOfRunners || formattedMaxNumberOfRunners;
        const transformedSurfaceType =
            surfaceType.indexOf('All Weather (') !== -1 &&
            surfaceType.match(/\(([^)]+)\)/) !== null ?
                surfaceType.match(/\(([^)]+)\)/)[1] :
                surfaceType;
        const formatedRaceTypeAndSurfaceType = raceType && transformedSurfaceType ?
            `${raceType} ${transformedSurfaceType}` :
            raceType || transformedSurfaceType;
        const raceTypeDescription = [
            formatedRaceTypeAndSurfaceType,
            formatedCategory,
        ].reduce((prev, curr) => {
            return prev && curr ? `${prev} - ${curr}` : prev || curr;
        });
        const formattedDate = getHeaderText({ date: raceDate, dateFormat: DD_MMMM_YYYY });

        const cardDetails = isResult ?
            [
                {
                    value: raceTypeDescription || ' ',
                    tooltipText: raceTypeDescription || ' ',
                },
                {
                    value: numberOfRunners,
                    label: 'Runners:',
                },
                {
                    value: going,
                    label: 'Going:',
                    notImplemented: true,
                },
                {
                    value: eachWayTerms,
                    label: 'E/W Terms:',
                    notImplemented: true,
                },
                {
                    value: winningTime,
                    label: 'Winning Time:',
                    notImplemented: true,

                },
                [
                    {
                        value: displayDistance,
                        label: 'Distance:',
                    },
                    {
                        value: raceClass,
                        label: 'Class:',
                        notImplemented: true,
                    },
                ],
                {
                    value: ageRestriction,
                    label: 'Criteria:',
                    accessibilityText: ageRestriction && getAgeAccessibilityText(ageRestriction),
                },
                {
                    value: rating,
                    label: 'Rated:',
                    notImplemented: true,
                },
                {
                    value: winnerPrize,
                    label: 'Winner:',
                    notImplemented: true,
                },
                {
                    value: timePerFurlong,
                    label: 'Time Per Furlong:',
                    notImplemented: true,
                },
            ] :
            [
                {
                    value: raceTypeDescription || ' ',
                    tooltipText: raceTypeDescription || ' ',
                },
                {
                    value: formattedNumberOfRunners,
                    label: 'Runners:',
                },
                {
                    value: going,
                    label: 'Going:',
                    notImplemented: true,
                },
                {
                    value: eachWayTerms,
                    label: 'E/W Terms:',
                    notImplemented: true,
                },
                [
                    {
                        value: displayDistance,
                        label: 'Distance:',
                    },
                    {
                        value: raceClass,
                        label: 'Class:',
                        notImplemented: true,
                    },
                    {
                        value: rating,
                        label: 'Rated:',
                        notImplemented: true,
                    },
                ],
                {
                    value: ageRestriction,
                    label: 'Age:',
                    accessibilityText: ageRestriction && getAgeAccessibilityText(ageRestriction),
                },
                {
                    value: transformedSurfaceType,
                    label: 'Surface:',
                    notImplemented: true,
                },
                {
                    value: winnerPrize,
                    label: 'Winner:',
                    notImplemented: true,
                },
            ]

        const isCountdownAvailable = status !== 'official' && status !== 'abandoned';
        const cardText = isResult ? 'result' : 'racecard';

        return (
            <>
                <div
                    className = {styles['race-header__content-container']}
                    data-testid = "Container__RaceHeaderContent"
                >
                    <div
                        className = {styles['race-header__content-main']}
                        data-testid = "Container__RaceHeaderMain"
                    >
                        <div
                            className = {styles['race-header__heading']}
                            data-testid = "Container__RaceHeaderHeading"
                        >
                            <PartialLogoIcon
                                className = {styles['race-header__logo']}
                                dataTestId = "Icon__PartialLogo"
                            />
                            <h1 data-testid = "Text__RaceHeaderHeading">
                                <span
                                    className = {styles['race-header__card-text']}
                                    data-testid = "Text__RaceHeaderHeadingResult"
                                >
                                    {cardText}
                                </span>

                                {surfaceType.indexOf('All Weather') !== -1 && (
                                    <span className = {styles['race-header__surface-code']}>
                                        AW
                                    </span>
                                )}
                            </h1>
                            <span
                                className = {styles['race-header__date']}
                                data-testid = "Text__RaceHeaderDate"
                            >
                                {formattedDate}
                            </span>
                        </div>
                        <div className = {styles['race-header__upper-race-info']}>
                            <span
                                className = {styles['race-header__time']}
                                data-testid = "Text__RaceHeaderHeadingTime"
                            >
                                {startTime}
                            </span>
                            <span
                                className = {styles['race-header__name']}
                                data-testid = "Text__RaceHeaderHeadingName"
                            >
                                {name}
                            </span>
                            {!isResult && (
                                <Weather
                                    className = {styles['race-header__weather']}
                                >
                                    <Weather.WeatherIcon
                                        description = {weather}
                                    />
                                    <Weather.Label
                                        description = {weather}
                                    />
                                </Weather>
                            )}
                        </div>
                        <div className = {styles['race-header__bottom-race-info']}>
                            {isCountdownAvailable && (
                                <div
                                    className = {styles['race-header__countdown-container']}
                                    data-testid = "Container__CountdownLabelWrapper"
                                >
                                    <CountdownLabel
                                        status = {status}
                                        startTime = {raceLocalTime.raceDateTime}
                                        testIdPrefix = "RaceHeader"
                                    />
                                </div>
                            )}
                            <span
                                className = {styles['race-header__race-title']}
                                data-testid = "Text__RaceHeaderRaceTitle"
                            >
                                {raceTitle}
                            </span>
                        </div>

                    </div>
                </div>
                <div
                    className = {styles['race-header__details-container']}
                    data-testid = "Container__RaceHeaderDetailsContainer"
                >
                    <div
                        className = {styles['race-header__details-main']}
                        data-testid = "Container__RaceHeaderDetailsContainer"
                    >
                        <div
                            className = {styles['race-header__details']}
                            data-testid = "Container__RaceHeaderDetails"
                        >
                            {
                            cardDetails.map((detail, index) => (
                                (Array.isArray(detail)) ? (
                                    <div
                                        key = {index}
                                        className = {styles['race-header__distance-class-rated']}
                                        data-testid = "Container__DistanceClassRated"
                                    >
                                        {
                                            detail.map((item, detailIndex) => (
                                                <HeaderItem
                                                    key = {`${index}_${detailIndex}`}
                                                    value = {item.value}
                                                    label = {item.label}
                                                    type = {cardText}
                                                />
                                            ))
                                        }
                                    </div>
                                ) : (
                                    <HeaderItem
                                        key = {index}
                                        value = {detail.value}
                                        label = {detail.label}
                                        type = {cardText}
                                    />
                                )
                            ))
                        }
                        </div>
                        {!isResult && (
                            <aside className = {styles['race-header__streams']}>
                                <div className = {styles['race-header__streams-label']}>
                                    Live on
                                </div>
                                <div className = {styles['race-header__streams-label']}>
                                    <StreamProviders
                                        liveOn = {liveOn}
                                        className = {styles['race-header__streams-icon']}
                                    />
                                </div>
                            </aside>
                        )}
                    </div>
                </div>
            </>
        );
    }
}

DesktopRaceHeader.propTypes = RaceHeaderTypes;
DesktopRaceHeader.displayName = 'DesktopRaceHeader';
