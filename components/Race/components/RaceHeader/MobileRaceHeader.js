import React, { PureComponent } from 'react';
import CountdownLabel from '../../../base/CountdownLabel';
import Weather from '../Weather';
import { PartialLogoIcon } from '../../../base/Icons/PartialLogoIcon';
import HeaderItem from './HeaderItem';
import { RaceHeaderTypes } from './RaceHeaderTypes';
import { getHeaderText } from '../../../RaceCards/utils';
import { Constants } from '../../../../project/constants';

import styles from './RaceHeader.module.scss';

const { DATE_FORMATS: { DD_MMM_YYYY } } = Constants;

export default class MobileRaceHeader extends PureComponent {
    render() {
        const {
            name,
            startTime,
            going,
            ageRestriction,
            eachWayTerms,
            status,
            raceLocalTime,
            surfaceType,
            raceTitle,
            numberOfRunners,
            isResult,
            winnerPrize,
            raceType,
            category,
            raceClass,
            displayDistance,
            weather,
            localTime: {
                raceDate,
            },
        } = this.props;

        const raceDescription = [
            raceType,
            category,
            raceClass ? `Class ${raceClass}` : '',
            displayDistance,
        ].filter((item) => !!item.length)
            .join(', ');

        const cardDetails = isResult ?
            [
                {
                    value: going,
                    label: 'going',
                    notImplemented: true,
                },
                {
                    value: numberOfRunners,
                    label: 'runners',
                },
                {
                    value: eachWayTerms,
                    label: 'each way terms',
                    notImplemented: true,
                },
                {
                    value: winnerPrize,
                    label: 'winner',
                },
            ] :
            [
                {
                    value: `${numberOfRunners}, ${ageRestriction}`,
                    label: 'Runners / Criteria:',
                },
                {
                    value: (
                        <Weather
                            className = {styles.detail__item}
                        >
                            <Weather.Label
                                description = {weather}
                            />
                            <Weather.WeatherIcon
                                description = {weather}
                            />
                        </Weather>
                    ),
                },
                {
                    value: eachWayTerms,
                    label: 'Each way terms:',
                    notImplemented: true,
                },
                {
                    value: going,
                    label: 'Going:',
                    notImplemented: true,
                },
            ];

        const isCountdownAvailable = status !== 'official' && status !== 'abandoned';

        const formattedDate = getHeaderText({ date: raceDate, dateFormat: DD_MMM_YYYY });

        const cardText = isResult ? 'result' : 'racecard';

        return (
            <>
                <div
                    className = {styles['race-header__content-container']}
                    data-testid = "Container__RaceHeaderContent"
                >
                    <header
                        className = {styles['race-header__content-main']}
                        data-testid = "Container__RaceHeaderMain"
                    >
                        <div
                            className = {styles['race-header__heading']}
                            data-testid = "Container__RaceHeaderHeading"
                        >
                            <PartialLogoIcon
                                className = {styles['race-header__logo']}
                                data-testid = "Icon__PartialLogo"
                            />
                            <span
                                className = {styles['race-header__card-text']}
                                data-testid = "Text__RaceHeaderHeadingCardText"
                            >
                                {cardText}
                            </span>
                            <span
                                className = {styles['race-header__date']}
                                data-testid = "Text__RaceHeaderHeadingDate"
                            >
                                {formattedDate}
                            </span>
                        </div>
                        <div
                            className = {styles['race-header__upper-race-info']}
                            data-testid = "Container__RaceHeaderUpperInfo"
                        >
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
                            {surfaceType.indexOf('All Weather') !== -1 &&
                                <span className = {styles['race-header__surface-code']}>AW</span>}
                        </div>
                        <div
                            className = {styles['race-header__bottom-race-info']}
                            data-testid = "Container__RaceHeaderBottomInfo"
                        >
                            {isCountdownAvailable && (
                                <CountdownLabel
                                    status = {status}
                                    startTime = {raceLocalTime.raceDateTime}
                                    testIdPrefix = "RaceHeader"
                                />
                            )}
                        </div>
                        <span
                            className = {styles['race-header__race-title']}
                            data-testid = "Text__RaceHeaderRaceTitle"
                        >
                            {raceTitle}
                        </span>
                    </header>
                </div>
                <div
                    className = {styles['race-header__details-container']}
                    data-testid = "Container__RaceHeaderDetailsContainer"
                >
                    <div
                        className = {styles['race-header__details']}
                        data-testid = "Container__RaceHeaderDetails"
                    >
                        <HeaderItem value = {raceDescription} />
                        {
                            cardDetails.map((detail, index) => (
                                <HeaderItem
                                    key = {index}
                                    value = {detail.value}
                                    label = {detail.label}
                                    type = {cardText}
                                />
                            ))
                        }
                    </div>
                </div>
            </>
        );
    }
}

MobileRaceHeader.propTypes = RaceHeaderTypes
MobileRaceHeader.displayName = 'MobileRaceHeader';
