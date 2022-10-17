import React from 'react'
import propTypes from 'prop-types'
import RacingPostLogo from '../../../base/RacingPostLogo';
import RunnerTipsNumber from '../RunnerTipsNumber';

import styles from './RunnerComments.module.scss';
import { useBreakPoint } from '../../../contexts/BreakPointContext';

export const RunnerComments = ({
    spotlightComment, horseName, numberTips, tipsters,
}) => {
    const { isMobile } = useBreakPoint();

    const headerTitle = isMobile ? 'Comment on this horse' : `Comment for ${horseName}`;

    return (
        <div className = {styles['runner-comments']}>
            <div
                className = {styles['runner-comments__container']}
                data-testid = "Container__RunnerComments"
            >
                <div
                    className = {styles['runner-comments__header']}
                    data-testid = "Container__RunnerCommentsHeader"
                >
                    <div
                        className = {styles['runner-comments__logo']}
                        data-testid = "Container__RunnerCommentsLogo"
                    >
                        <RacingPostLogo
                            height = "16px"
                            width = {isMobile ? '106px' : '112px'}
                        />
                    </div>
                    <span
                        className = {styles['runner-comments__header-text']}
                        data-testid = "Text__RunnerCommentsTitle"
                    >
                        {headerTitle}
                    </span>
                </div>
                {spotlightComment && (
                    <div
                        className = {styles['runner-comments__body']}
                        data-testid = "Container__RunnerCommentsBody"
                    >
                        <span data-testid = "Text__RunnerCommentsBody">{spotlightComment}</span>
                    </div>
                )}
                {numberTips > 0 && (
                    <div
                        className = {styles['runner-comments__tips-and-tipsters-container']}
                        data-testid = "Container__RunnerCommentsTips"
                    >
                        <RunnerTipsNumber tips = {numberTips} />
                        <span
                            className = {styles['runner-comments__tipsters']}
                            data-testid = "Text__RunnerCommentsTipsters"
                        >
                            {tipsters}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}

RunnerComments.propTypes = {
    horseName: propTypes.string.isRequired,
    spotlightComment: propTypes.string,
    numberTips: propTypes.string,
    tipsters: propTypes.string,
}
