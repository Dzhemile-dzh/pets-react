import React, { useMemo, memo } from 'react';
import propTypes from 'prop-types';
import Runner from '../../../Runner/index.tsx';

import styles from './Runners.module.scss';

export const Runners = ({
    runners,
    isResult,
    runnerRaceFormsType,
    isCommentOpen,
    cardCustomization,
    data,
    isDetailsOpen,
}) => {
    const race = useMemo(() => {
        const {
            raceId,
            meetingName,
            raceTitle,
            startTime,
            date,
            diffusionMeetingName,
            utcTime,
            meetingId,
            localTime,
            raceLocalTime,
            countryCode,
        } = data;

        return {
            id: raceId,
            meetingName,
            raceTitle,
            startTime,
            date,
            diffusionMeetingName,
            utcTime,
            meetingId,
            localTime,
            raceLocalTime,
            countryCode,
        };
    }, [data])

    return (
        <div className = {styles['race-runners']}>
            <div className = {styles['race-runners__container']}>
                {runners && runners.length > 0 ?
                    runners.map((runnerData) => (
                        <Runner
                            race = {race}
                            key = {runnerData.uid}
                            runner = {runnerData}
                            isResult = {isResult}
                            runnerRaceFormsType = {runnerRaceFormsType}
                            isCommentOpen = {isCommentOpen}
                            cardCustomization = {cardCustomization}
                            isDetailsOpen = {isDetailsOpen}
                        />
                    )) : (
                        <span
                            className = {styles['race-runners__no-runners']}
                        >
                            No runners available.
                        </span>
                    )}
            </div>
        </div>
    )
}

export const RunnersMemo = memo(Runners);

Runners.propTypes = {
    runners: propTypes.array.isRequired,
    isResult: propTypes.bool.isRequired,
    runnerRaceFormsType: propTypes.string,
    isCommentOpen: propTypes.bool.isRequired,
    cardCustomization: propTypes.object,
    data: propTypes.object,
    isDetailsOpen: propTypes.bool,
}
