/* eslint-disable react/display-name */
import { useMemo } from 'react';
import propTypes from 'prop-types';
import CustomisationBar from '../CustomisationBar';
import { useBreakPoint } from '../../../contexts/BreakPointContext';

import styles from '../CustomisationBar/CustomisationBar.module.scss';

export function ActiveTab({
    cardCustomization,
    changeCustomozationSettings,
    activeNavigationTab,
    runnerRacesForm,
    isCommentOpen,
    isDetailsOpen,
    isResult,
    shouldDisableTipsAndCommentsButton,
    toggleDetails,
    toggleSubsequentForm,
    toggleRecenRaceForm,
    toggleRunnerComment,
    raceId,
}) {
    const { isMobile } = useBreakPoint();

    const raceCardTabProps = useMemo(() => {
        if (isResult) {
            return {
                toggleDetails,
                isDetailsOpen,
                toggleSubsequentForm,
                runnerRacesForm,
            }
        }

        return {
            toggleRecenRaceForm,
            runnerRacesForm,
            toggleRunnerComment,
            isCommentOpen,
        }
    }, [
        isCommentOpen,
        isDetailsOpen,
        runnerRacesForm,
        isResult,
        toggleDetails,
        toggleRecenRaceForm,
        toggleRunnerComment,
        toggleSubsequentForm,
    ])

    return (isMobile || activeNavigationTab === 'racecard') ? (
        <CustomisationBar
            isResult = {isResult}
            {...raceCardTabProps}
            cardCustomization = {cardCustomization}
            changeCustomozationSettings = {changeCustomozationSettings}
            shouldDisableTipsAndCommentsButton = {shouldDisableTipsAndCommentsButton}
            raceId = {raceId}
        />
    ) : (
        <div className = {styles['customisation-bar']}>
            COMMING SOON
        </div>
    )
}

ActiveTab.propTypes = {
    cardCustomization: propTypes.object,
    changeCustomozationSettings: propTypes.func,
    activeNavigationTab: propTypes.string,
    runnerRacesForm: propTypes.string,
    isCommentOpen: propTypes.bool,
    isDetailsOpen: propTypes.bool,
    isResult: propTypes.bool,
    shouldDisableTipsAndCommentsButton: propTypes.bool,
    toggleDetails: propTypes.func,
    toggleSubsequentForm: propTypes.func,
    toggleRecenRaceForm: propTypes.func,
    toggleRunnerComment: propTypes.func,
    raceId: propTypes.string,
}
