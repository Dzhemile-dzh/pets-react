import { FC } from 'react'

import CountdownLabel from '@components/base/CountdownLabel';
import { OfferIcon } from '@components/base/Icons/OfferIcon';
import SmallCardDetails from '@components/RaceIndex/components/Cards/SmallCard/components/SmallCardDetails';

import styles from './SmallCard.module.scss';

interface SmallCardInterface {
    startDateTime: string;
    status: string;
    startTime: string;
    meetingName: string;
    hasOffers?: boolean;
    raceDetailsTitle: string;
    raceId: string;
    onStatusNowUpdate: () => void;
}

export const SmallCard : FC<SmallCardInterface> = ({
    startDateTime,
    status,
    hasOffers = false,
    startTime,
    meetingName,
    raceDetailsTitle,
    raceId,
    onStatusNowUpdate,
}) => (
    <div
        className = {styles['small-card']}
        data-testid = {`Container__${raceId}__RaceCard`}
    >
        <div className = {styles['small-card__header']}>
            <aside className = {styles['small-card__countdown']}>
                <CountdownLabel
                    startTime = {startDateTime}
                    status = {status}
                    onStatusNowUpdate = {onStatusNowUpdate}
                />
            </aside>
            {
                hasOffers && (
                    <OfferIcon
                        className = {styles['small-card__offer-icon']}
                    />
                )
            }
        </div>
        <SmallCardDetails
            startTime = {startTime}
            meetingName = {meetingName}
            raceDetailsTitle = {raceDetailsTitle}
        />
    </div>
)
