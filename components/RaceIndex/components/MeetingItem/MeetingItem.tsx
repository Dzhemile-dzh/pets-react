/* eslint-disable max-len */
import { useMemo, FC } from 'react';
import classnames from 'classnames';

import { Constants } from '@project/constants';
import { HorseJumpIcon } from '@components/base/Icons/HorseJumpIcon';
import { HorseFlatIcon } from '@components/base/Icons/HorseFlatIcon';
import { ChevronIcon } from '@components/base/Icons/ChevronIcon';
import { RaceCardsMeetingInterface, RaceCardsRaceInterface, RaceOffer } from '@components/interfaces';
import Accordion from '@components/shared/Accordion';
import HybridConditionalLink from '@components/base/HybridConditionalLink';
import RaceItem from '@components/RaceIndex/components/RaceItem';

import { formatHybridRaceUrlWithPrefTab } from '@project/utils/formatUtils';
import styles from './MeetingItem.module.scss';

const { RACE_TYPES: { FLAT, JUMPS } } = Constants;

interface MeetingItemInterface {
    meeting: RaceCardsMeetingInterface;
    races: RaceCardsRaceInterface[];
    offers: Record<string, RaceOffer>
}

export const MeetingItem: FC<MeetingItemInterface> = ({
    meeting,
    races,
    offers,
}) => {
    const meetingRaces = useMemo(() => {
        return meeting.races.map((raceId) => races.find((race) => race.raceId === raceId))
    }, [meeting.races, races])

    const meetingType = (meeting.meetingType === FLAT ||
        meeting.meetingType === JUMPS) ?
        meeting.meetingType :
        meetingRaces[0].raceType === FLAT ? FLAT : JUMPS;

    const shouldDisplayOffer = meetingRaces.some(
        (race) => offers?.[race.raceId]?.hasOffers &&
            race.isUpcoming &&
            !race.isAbandoned,
    );

    return (
        <Accordion data-testid = {`Container__${meeting.meetingId}__Meeting`}>
            <Accordion.Content>
                <Accordion.Item>
                    <Accordion.ItemHeaderSmart data-testid = "Container__AccordionHeader">
                        {
                            (isOpen: boolean) => (
                                <div className = {styles['meeting-item']}>
                                    <div className = {styles['meeting-item__container']}>
                                        <div className = {styles['meeting-item__meeting-icon']}>
                                            {meetingType === FLAT ? <HorseFlatIcon /> : <HorseJumpIcon />}
                                        </div>
                                        <div>
                                            <div className = {styles['meeting-item__meeting-title-container']}>
                                                <span data-testid = "Text__MeetingName">
                                                    {meeting.name.toUpperCase()}
                                                </span>
                                                {
                                                    shouldDisplayOffer && (
                                                        <span
                                                            className = {styles['meeting-item__meeting-offer']}
                                                            data-testid = "Text__Offer"
                                                        >
                                                            Offer
                                                        </span>
                                                    )
                                                }
                                            </div>
                                            <span className = {styles['meeting-item__meeting-details']}>
                                                {meeting.meetingType} | {meeting.numberOfRaces} races | {meeting.meetingStartTime} - {meeting.meetingEndTime}
                                            </span>
                                        </div>
                                    </div>
                                    <div
                                        className = {
                                            classnames(
                                                styles['meeting-item__icon'],
                                                isOpen ? styles['meeting-item__icon--collapse'] : styles['meeting-item__icon--expand'],
                                            )
                                        }
                                    >
                                        <ChevronIcon
                                            dataTestId = {isOpen ? 'Icon__MeetingCollapse' :
                                                'Icon__MeetingExpand'}
                                        />
                                    </div>
                                </div>
                            )
                        }
                    </Accordion.ItemHeaderSmart>
                    <Accordion.ItemBody>
                        {meetingRaces.map((race) => (
                            <div
                                className = {styles['meeting-item__races']}
                                key = {race.raceId}
                                data-testid = "Container__MeetingRaces"
                            >
                                {
                                    !race.isAbandoned && (
                                        <HybridConditionalLink
                                            condition = {race.isResult || race.isUpcoming}
                                            hybridUrl = {formatHybridRaceUrlWithPrefTab(race.hybridRaceUrl)}
                                            url = {race.raceUrl}
                                        >
                                            <RaceItem
                                                category = {race.category?.[0] ?? race.raceType}
                                                isResult = {race.isResult}
                                                raceId = {race.raceId}
                                                startTime = {race.startTime}
                                                displayDistance = {race.displayDistance}
                                                numberOfRunners = {race.numberOfRunners}
                                                raceTitle = {race.raceTitle}
                                                shouldShowOffer = {offers?.[race.raceId]?.hasOffers && race.isUpcoming}
                                            />
                                        </HybridConditionalLink>
                                    )
                                }
                            </div>
                        ))}
                    </Accordion.ItemBody>
                </Accordion.Item>
            </Accordion.Content>
        </Accordion>
    )
}
