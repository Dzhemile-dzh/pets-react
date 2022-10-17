import { FC, useMemo } from 'react';
import classnames from 'classnames';

import { Constants } from '@project/constants';
import { ChevronIcon } from '@components/base/Icons/ChevronIcon';
import {
    RaceCardsMeetingInterface,
    RaceCardsRaceInterface,
    RaceOffer,
} from '@components/interfaces';
import Pagination from '@components/shared/Pagination';
import HybridConditionalLink from '@components/base/HybridConditionalLink';

import MatrixRace from '@components/RaceIndex/components/MatrixRace';

import { formatHybridRaceUrlWithPrefTab } from '@project/utils/formatUtils';
import styles from './MatrixMeeting.module.scss';

const {
    PAGE_SIZE_TABLET,
    PAGE_SIZE_SMALL_DESKTOP,
    PAGE_SIZE_LARGE_DESKTOP,
} = Constants.RACE_MATRIX_PAGE_SIZES;

interface MatrixMeetingInterface {
    meeting: RaceCardsMeetingInterface;
    races: RaceCardsRaceInterface[];
    offers: Record<string, RaceOffer>;
    pageSize?: number;
}

export const MatrixMeeting: FC<MatrixMeetingInterface> = ({
    meeting,
    races,
    offers,
    pageSize,
}) => {
    const meetingRaces = useMemo(() => {
        return meeting.races.map((raceId) => races.find((race) => race.raceId === raceId))
    }, [meeting.races, races])

    return (
        <div
            className = {styles['matrix-meeting']}
            data-testid = {`Container__${meeting.meetingId}__Meeting`}
        >
            <div className = {styles['matrix-meeting__details']}>
                <span
                    className = {styles['matrix-meeting__meeting-name']}
                    data-testid = "Text__MeetingName"
                >
                    {meeting.name}
                </span>
                <span
                    className = {styles['matrix-meeting__overview']}
                    data-testid = "Text__MeetingOverview"
                >
                    {`${meeting.meetingType} | ${meeting.numberOfRaces} races`}
                </span>
            </div>
            <Pagination
                pageSize = {pageSize}
                className = {styles['matrix-meeting__races']}
            >
                <div className = {styles['matrix-meeting__pagination']}>
                    <Pagination.PrevButton
                        className = {styles['matrix-meeting__pagination-button']}
                        data-testid = "Button__Previous"
                    >
                        <span className = {styles['matrix-meeting__pagination-previous']}>
                            <ChevronIcon
                                color = "default"
                                size = "small"
                            />
                        </span>
                    </Pagination.PrevButton>
                </div>
                <Pagination.Content
                    className = {classnames(
                        styles['matrix-meeting__races-row'],
                        {
                            [styles['matrix-meeting__races-row--five-items']]:
                                pageSize === PAGE_SIZE_TABLET,
                            [styles['matrix-meeting__races-row--four-items']]:
                                pageSize === PAGE_SIZE_SMALL_DESKTOP,
                            [styles['matrix-meeting__races-row--seven-items']]:
                                pageSize === PAGE_SIZE_LARGE_DESKTOP,
                        },
                    )}
                >
                    {
                        meetingRaces.map((race) => (
                            <HybridConditionalLink
                                key = {race.raceId}
                                hybridUrl = {formatHybridRaceUrlWithPrefTab(race.hybridRaceUrl)}
                                url = {race.raceUrl}
                                condition = {race.isResult || race.isUpcoming}
                            >
                                <MatrixRace race = {race} offers = {offers} />
                            </HybridConditionalLink>
                        ))
                    }
                </Pagination.Content>

                <div className = {styles['matrix-meeting__pagination']}>
                    <Pagination.NextButton
                        className = {styles['matrix-meeting__pagination-button']}
                        data-testid = "Button__Next"
                    >
                        <span className = {styles['matrix-meeting__pagination-next']}>
                            <ChevronIcon
                                color = "default"
                                size = "small"
                            />
                        </span>
                    </Pagination.NextButton>
                </div>
            </Pagination>
        </div>
    )
}
