import { useMemo, useCallback } from 'react';
import propTypes from 'prop-types';
import { useRouter } from 'next/router';
import Image from 'next/image';
import ButtonGroup from '../../../base/inputs/ButtonGroup';
import Toggle from '../../../base/inputs/Toggle';
import Button from '../../../base/inputs/Button/index.tsx';
import CustomisationPanel from '../CustomisationPanel';
import SortByDropdown from '../SortByDropdown';

import { HorseFlatIcon } from '../../../base/Icons/HorseFlatIcon';
import { Constants } from '../../../../project/constants';
import { isUrlIncludingSlug } from '../../../../project/utils/isUrlIncludingSlug';
import { useBreakPoint } from '../../../contexts/BreakPointContext';
import { useModal } from '../../../base/Modal';

import styles from './CustomisationBar.module.scss';

const {
    RUNNER_RACES_TYPES,
    RACECARD_TAB_URL: {
        AT_A_GLANCE,
    },
} = Constants;

export function CustomisationBar({
    isResult,
    toggleRecenRaceForm,
    runnerRacesForm,
    toggleRunnerComment,
    isCommentOpen,
    toggleDetails,
    isDetailsOpen,
    toggleSubsequentForm,
    cardCustomization,
    changeCustomozationSettings,
    shouldDisableTipsAndCommentsButton,
    raceId,
}) {
    const { isMobile } = useBreakPoint();
    const {
        isModalOpen,
        showModal,
        hideModal,
    } = useModal('CustomisationBar');

    const router = useRouter();
    const isAtaGlanceTabActive = isUrlIncludingSlug(router.asPath, `/${AT_A_GLANCE}`);
    const { runnersSortedBy } = cardCustomization;

    const handleCompactViewToggle = () => {
        if (!isAtaGlanceTabActive) {
            router.push(`${router.asPath}/${AT_A_GLANCE}`, undefined, { shallow: true });
        } else {
            router.push(router.asPath.replace(`/${AT_A_GLANCE}`, ''), undefined, { shallow: true });
        }
    }

    const raceCardButtons = useMemo(() => {
        const tipsIconName = isCommentOpen ? 'quotes_white' :
            shouldDisableTipsAndCommentsButton ? 'quotes_grey' : 'quotes_beacon_blue_darker';

        const formIconName = runnerRacesForm === RUNNER_RACES_TYPES.RECENT ? 'form_white' :
            'form_beacon_blue_darker';

        return [
            {
                text: 'TIPS & SPOTLIGHT',
                icon: (
                    <div className = {styles['customisation-bar__svg-icon']}>
                        <Image src = {`/svgs/${tipsIconName}.svg`} width = {20} height = {20} />
                    </div>
                ),
                onClick: toggleRunnerComment,
                isActive: isCommentOpen,
                isDisabled: shouldDisableTipsAndCommentsButton,
                testid: 'CustomisationBarTipsAndComments',
            },
            {
                text: 'RACE FORM',
                icon: (
                    <div className = {styles['customisation-bar__svg-icon']}>
                        <Image src = {`/svgs/${formIconName}.svg`} width = {20} height = {20} />
                    </div>
                ),
                onClick: toggleRecenRaceForm,
                isActive: (runnerRacesForm === RUNNER_RACES_TYPES.RECENT),
                isDisabled: false,
                testid: 'CustomisationBarRaceForm',
            },
        ]
    }, [isCommentOpen, runnerRacesForm, shouldDisableTipsAndCommentsButton,
        toggleRecenRaceForm, toggleRunnerComment])

    const resultButtons = useMemo(() => {
        const tipsIconName = isDetailsOpen ? 'quotes_white' : 'quotes_beacon_blue_darker';
        const graphIconName = runnerRacesForm === RUNNER_RACES_TYPES.SUBSEQUENT ? 'graph_white' :
            'graph_beacon_blue_darker';

        return [
            {
                text: 'DETAILS',
                icon: (
                    <div className = {styles['customisation-bar__svg-icon']}>
                        <Image src = {`/svgs/${tipsIconName}.svg`} width = {20} height = {20} />
                    </div>
                ),
                onClick: toggleDetails,
                isActive: isDetailsOpen,
                testid: 'CustomisationBarTips',

            },
            {
                text: 'SUBSEQUENT FORM',
                icon: (
                    <div className = {styles['customisation-bar__svg-icon']}>
                        <Image src = {`/svgs/${graphIconName}.svg`} width = {20} height = {20} />
                    </div>
                ),
                onClick: toggleSubsequentForm,
                isActive: (runnerRacesForm === RUNNER_RACES_TYPES.SUBSEQUENT),
                testid: 'CustomisationBarSubsequentForm',

            },
        ]
    }, [isDetailsOpen, runnerRacesForm, toggleDetails, toggleSubsequentForm])

    const changeRunnersSortedBy = useCallback((value) => {
        changeCustomozationSettings({
            ...cardCustomization,
            runnersSortedBy: value,
        })
    }, [cardCustomization, changeCustomozationSettings]);

    if (isMobile && isResult) return null;

    return (
        <div
            className = {styles['customisation-bar']}
            data-testid = "Container__CustomisationBar"
        >
            {isResult ? (
                <ButtonGroup buttons = {resultButtons} />
            ) : (
                <>
                    <ButtonGroup buttons = {raceCardButtons} />
                    {
                        !isMobile && (
                            <div
                                className = {styles['customisation-bar__middle-section']}
                                data-testid = "Container__PredictorWrapper"
                            >
                                <Button
                                    styleType = "tertiary-icon"
                                    size = {isMobile ? 'default' : 'tiny'}
                                    className = {styles['customisation-bar__btn-predictor']}
                                    data-testid = "Button__CustomisationBarPredictor"
                                >
                                    <HorseFlatIcon
                                        className = {styles['customisation-bar__btn-icon']}
                                    />
                                    Predictor
                                </Button>
                            </div>
                        )
                    }
                    <div
                        className = {styles['customisation-bar__right-section']}
                        data-testid = "Container__RaceCustomisationBarRightSection"
                    >
                        {
                            isMobile && (
                                <Button
                                    styleType = "tertiary-icon"
                                    size = {isMobile ? 'default' : 'tiny'}
                                    className = {styles['customisation-bar__btn']}
                                    data-testid = "Button__CustomisationBarRaceData"
                                >
                                    Race data
                                </Button>
                            )
                        }
                        <Button
                            styleType = "tertiary-icon"
                            size = {isMobile ? 'default' : 'tiny'}
                            className = {styles['customisation-bar__btn']}
                            onClick = {showModal}
                            data-testid = "Button__CustomisationBarSettings"
                        >
                            <div className = {styles['customisation-bar__btn-icon']}>
                                <Image
                                    src = "/svgs/customise.svg"
                                    width = {18}
                                    height = {18}
                                />
                            </div>
                            Settings
                        </Button>
                        {
                            isMobile ? (
                                <Toggle
                                    defaultOption = {isAtaGlanceTabActive}
                                    purpose = "CompactView"
                                    className = "customisation-bar-toggle"
                                    handleClick = {handleCompactViewToggle}
                                >
                                    <Toggle.Button
                                        title = "Compact View"
                                        className = "customisation-bar-toggle"
                                    />
                                    <Toggle.Label
                                        label = "Compact View"
                                        className = "customisation-bar-toggle"
                                    />
                                </Toggle>
                            ) : (
                                <SortByDropdown
                                    runnersSortedBy = {runnersSortedBy}
                                    changeRunnersSortedBy = {changeRunnersSortedBy}
                                    className = "customisation-bar"
                                />
                            )
                        }
                    </div>
                </>
            )}
            {isModalOpen && (
                <CustomisationPanel
                    isMobile = {isMobile}
                    hideModal = {hideModal}
                    cardCustomization = {cardCustomization}
                    changeCustomozationSettings = {changeCustomozationSettings}
                    raceId = {raceId}
                />
            )}
        </div>
    );
}

CustomisationBar.propTypes = {
    isResult: propTypes.bool,
    toggleRecenRaceForm: propTypes.func,
    runnerRacesForm: propTypes.string,
    toggleRunnerComment: propTypes.func,
    isCommentOpen: propTypes.bool,
    toggleDetails: propTypes.func,
    isDetailsOpen: propTypes.bool,
    toggleSubsequentForm: propTypes.func,
    cardCustomization: propTypes.object,
    changeCustomozationSettings: propTypes.func,
    raceId: propTypes.string,
}
