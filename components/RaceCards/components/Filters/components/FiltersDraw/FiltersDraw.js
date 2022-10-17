import {
    memo, useCallback, useRef, useState,
} from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import Toggle from '../../../../../base/inputs/Toggle';
import SlideToggle from '../../../../../base/inputs/SlideToggle';
import Button from '../../../../../base/inputs/Button/index.tsx';
import { Modal } from '../../../../../base/Modal';
import { Constants } from '../../../../../../project/constants';
import { Actions } from '../../../../../../project/common';
import useOutsideClick from '../../../../../custom-hooks/useOutsideClick';

import styles from './FiltersDraw.module.scss';

const {
    RACE_FILTERS: {
        RACE_TYPE,
    },
} = Constants;

const raceTypeFilterToggleItems = [
    {
        label: RACE_TYPE.ALL,
        value: RACE_TYPE.ALL,
    },
    {
        label: RACE_TYPE.FLAT,
        value: RACE_TYPE.FLAT,
    },
    {
        label: RACE_TYPE.JUMPS,
        value: RACE_TYPE.JUMPS,
    },
]
export function FiltersDraw({
    setFocusedDrawFilter,
    isHandicap,
    raceType,
    shouldShowRaceTypeFilter,
    shouldShowHandicapFilter,
}) {
    const dispatch = useDispatch();
    const [selectedHandicap, setSelectedHandicap] = useState(isHandicap);
    const [selectedRaceType, setSelectedRaceType] = useState(raceType);

    const currentElement = useRef(null);

    useOutsideClick(
        currentElement,
        null,
        [setFocusedDrawFilter],
        () => setFocusedDrawFilter(false),
        'mouseup',
    )

    const onApplyButtonClick = useCallback(
        () => {
            if (selectedHandicap !== isHandicap) {
                dispatch(Actions.setHandicapFilter(selectedHandicap))
            }

            if (selectedRaceType !== raceType) {
                dispatch(Actions.setRaceTypeFilter(selectedRaceType))
            }

            setFocusedDrawFilter(false);
        },
        [dispatch, isHandicap, raceType, selectedHandicap, selectedRaceType, setFocusedDrawFilter],
    )

    return (
        <Modal isModalOpen>
            <div className = {styles['filters-draw']} ref = {currentElement}>
                <hr />
                {shouldShowRaceTypeFilter && (
                    <SlideToggle
                        className = {styles['filters-draw__slide-toggle']}
                        currentOption = {selectedRaceType}
                        handleClick = {setSelectedRaceType}
                        purpose = "RaceType"
                        type = "horizontal"
                    >
                        {raceTypeFilterToggleItems.map((option, index) => (
                            <SlideToggle.Button
                                className = {styles['filters-draw__slide-toggle-button']}
                                key = {index}
                                optionLabel = {option.label}
                                optionValue = {option.value}
                            />
                        ))}
                    </SlideToggle>
                )}
                {shouldShowHandicapFilter && (
                    <div className = {styles['filters-draw__toggle']}>
                        <Toggle
                            handleClick = {setSelectedHandicap}
                            defaultOption = {selectedHandicap}
                            purpose = "Handicap"
                            className = "filters-draw-toggle"
                        >
                            <Toggle.Label
                                label = "Handicap only"
                                className = "filters-draw-toggle"
                            />
                            <Toggle.Button
                                className = "filters-draw-toggle"
                            />
                        </Toggle>
                    </div>
                )}
                <Button
                    styleType = "primary"
                    className = {styles['filters-draw__apply-btn']}
                    onClick = {onApplyButtonClick}
                >
                    APPLY
                </Button>
            </div>
        </Modal>
    )
}

export const FiltersDrawMemoized = memo(FiltersDraw);

FiltersDraw.propTypes = {
    setFocusedDrawFilter: propTypes.func,
    isHandicap: propTypes.bool,
    raceType: propTypes.string,
}
