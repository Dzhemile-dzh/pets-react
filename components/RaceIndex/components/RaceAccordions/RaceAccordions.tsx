/* eslint-disable max-len */
import { FC } from 'react'
import classnames from 'classnames';

import { ChevronIcon } from '@components/base/Icons/ChevronIcon';
import Expandable from '@components/base/Expandable';

import { RaceCardsMeetingInterface, RaceCardsRaceInterface, StateInterface } from '@components/interfaces';
import { useSelector } from 'react-redux';
import MeetingItem from '../MeetingItem';
import styles from './RaceAccordions.module.scss';

const DEFAULT_NUMBER_OF_MEETINGS_TO_DISPLAY = 6;

interface RaceAccordionsInterface {
    meetings: RaceCardsMeetingInterface[];
    races: RaceCardsRaceInterface[];
}

export const RaceAccordions : FC<RaceAccordionsInterface> = ({
    meetings,
    races,
}) => {
    const offers = useSelector((state: StateInterface) => state.bookmakerOffers)
    return (
        <Expandable className = {styles['race-accordions']}>
            <Expandable.Content
                collapsedChildrenLimit = {DEFAULT_NUMBER_OF_MEETINGS_TO_DISPLAY}
            >
                {
                    meetings.map((item) => (
                        <MeetingItem
                            key = {item.meetingId}
                            meeting = {item}
                            races = {races}
                            offers = {offers}
                        />
                    ))
                }
            </Expandable.Content>
            <Expandable.ExpandButton>
                <div className = {
                    classnames(
                        styles['race-accordions__button'],
                        styles['race-accordions__button--expanded'],
                    )
                }
                >
                    FEWER RACECARDS
                    <ChevronIcon dataTestId = "Icon__Hide" />
                </div>
            </Expandable.ExpandButton>
            <Expandable.CollapseButton>
                <div className = {styles['race-accordions__button']}>
                    MORE RACECARDS
                    <ChevronIcon dataTestId = "Icon__Show" />
                </div>
            </Expandable.CollapseButton>
        </Expandable>
    )
}
