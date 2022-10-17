import { useState, useMemo, useCallback } from 'react';
import propTypes from 'prop-types';
import RacingPostLogo from '../../../base/RacingPostLogo';
import ShowMoreButton from '../ShowMoreButton';
import { MobilePredictorOutcomeMemo as MobilePredictorOutcome } from './MobilePredictorOutcome';
import Accordion from '../../../base/Accordion';
import VerdictText from './VerdictText';
import { useBreakPoint } from '../../../contexts/BreakPointContext';

import styles from './PredictorAndVerdict.module.scss';

export const PredictorAndVerdict = ({ verdict, verdictAuthor }) => {
    const [isOpen, setOpen] = useState(false);
    const { isMobile } = useBreakPoint();

    const toggleOpen = useCallback(() => setOpen((prev) => !prev), []);

    const headerContent = useMemo(() => {
        const predictorTextOpened = isMobile ? 'VERDICT' : 'SPOTLIGHT VERDICT';
        const predictorTextClosed = isMobile ? 'VERDICT & DATA PREDICTOR' : 'VERDICT';

        const verdictTitle = (
            <>
                {isOpen ? predictorTextOpened : predictorTextClosed}
                {
                    isOpen && verdictAuthor && isMobile && (
                    <span
                        className = {styles['predictor-verdict__author']}
                        data-testid = "Text__VerdictAuthor"
                    >
                        by {verdictAuthor}
                    </span>
                    )
                }
            </>
        );

        return (
            <>
                <div
                    className = {styles['predictor-verdict__heading']}
                    data-testid = "Container__PredictorVerdictHeading"
                >
                    <div
                        className = {styles['predictor-verdict__racing-post-logo']}
                        data-testid = "Container__PredictorVerdictRacingPostLogo"
                    >
                        <RacingPostLogo height = "9px" />
                    </div>
                    <span
                        className = {styles['predictor-verdict__title']}
                        data-testid = "Text__PredictorVerdictTitle"
                    >
                        {verdictTitle}
                    </span>
                </div>
                {!isMobile && (
                    <ShowMoreButton
                        className = {styles['predictor-verdict__show-more-button']}
                        openedLabel = "Hide"
                        closedLabel = "Show"
                        isOpen = {isOpen}
                    />
                )}
            </>
        );
    }, [isMobile, isOpen, verdictAuthor])

    const openedContent = useMemo(() => {
        const verdictData = isMobile ? verdict :
            [
                ...verdict,
                { isBold: true, value: ` ${verdictAuthor}` },
            ];

        return (
            <>
                <div
                    className = {styles['predictor-verdict__verdict']}
                    data-testid = "Container__Verdict"
                >
                    <VerdictText verdict = {verdictData} />
                </div>
                {isMobile && (
                    <>
                        <div className = {styles['predictor-verdict__border']} />
                        <MobilePredictorOutcome />
                    </>
                )}
            </>
        );
    }, [isMobile, verdict, verdictAuthor])

    return (
        <div
            className = {styles['predictor-verdict']}
            data-testid = "Container__PredictorVerdict"
        >
            <Accordion
                headerContent = {headerContent}
                openedContent = {openedContent}
                onChange = {toggleOpen}
                shouldShowAccordionButton = {false}
                isOnVerdict
                dataTestIdPrefix = "PredictorAndVerdict"
            />
        </div>
    );
}

PredictorAndVerdict.propTypes = {
    verdict: propTypes.array,
    verdictAuthor: propTypes.string,
}
