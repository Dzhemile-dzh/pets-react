import { FC } from 'react';
import classnames from 'classnames';

import { OfferIcon } from '@components/base/Icons/OfferIcon';
import { Constants } from '@project/constants';

import { RaceCardsRaceInterface, RaceOffer } from '@components/interfaces';
import styles from './MatrixRace.module.scss';

const { RACE_STATUSES: { CALENDAR, NEXT_OFF } } = Constants;

interface MatrixRaceInterface {
    race: RaceCardsRaceInterface
    offers: Record<string, RaceOffer>
}

export const MatrixRace : FC<MatrixRaceInterface> = ({
    race,
    offers,
}) => {
    const isNextRace = race.status === NEXT_OFF;

    const shouldDisplayOffer = offers?.raceOffers?.[race.raceId]?.hasOffers &&
        race.isUpcoming && !isNextRace;

    const subtitle = race.isAbandoned ? 'Abandoned' :
        race.isUpcoming && race.status !== CALENDAR ? `${race.numberOfRunners} Runners` :
            'Result';

    return (
        <div
            className = {classnames(
                styles['matrix-race'],
                {
                    [styles['matrix-race--highlighted']]: isNextRace,
                },
            )}
            data-testid = {`Container__${race.raceId}__MatrixRace`}
        >
            <div className = {styles['matrix-race__title']}>
                <span data-testid = "Text__StartTime">{race.startTime}</span>
                {
                    shouldDisplayOffer && (
                        <OfferIcon
                            className = {styles['race-item__offer']}
                        />
                    )
                }
            </div>
            <span
                className = {classnames(
                    [styles['matrix-race__subtitle']],
                    {
                        [styles['matrix-race__subtitle--result']]: race.isResult,
                    },
                )}
                data-testid = "Text__SubTitle"
            >
                {subtitle}
            </span>
        </div>
    )
}
