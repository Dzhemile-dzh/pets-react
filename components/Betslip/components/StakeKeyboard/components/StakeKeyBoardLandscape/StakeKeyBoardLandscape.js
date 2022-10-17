import React, { useMemo } from 'react'
import propTypes from 'prop-types';
import Image from 'next/image';

import StakeKeyBoardButton from '../StakeKeyBoardButton';

import styles from '../../StakeKeyboard.module.scss';

export const StakeKeyBoardLandscape = ({
    addQuickValue,
    addValueToStake,
    closeKeyboard,
    removeStake,
}) => {
    const buttons = useMemo(() => [
        {
            onClick: () => addValueToStake(1),
            label: '1',
            isRegular: true,
        },
        {
            onClick: () => addValueToStake(2),
            label: '2',
            isRegular: true,
        },
        {
            onClick: () => addValueToStake(3),
            label: '3',
            isRegular: true,
        },
        {
            onClick: () => removeStake(),
            isRegular: true,
            label: (
                <div className = {styles['bs-stake-keyboard__icon-delete']}>
                    <Image
                        src = "/svgs/delete_stake.svg"
                        width = {28}
                        height = {28}
                    />
                </div>
            ),
        },
        {
            onClick: () => addValueToStake(4),
            label: '4',
            isRegular: true,
        },
        {
            onClick: () => addValueToStake(5),
            label: '5',
            isRegular: true,
        },
        {
            onClick: () => addValueToStake(6),
            label: '6',
            isRegular: true,
        },
        {
            onClick: () => addValueToStake('.'),
            isRegular: true,
            label: <span className = {styles['bs-stake-keyboard__btn-dot']} />,
        },
        {
            onClick: () => addValueToStake(7),
            label: '7',
            isRegular: true,
        },
        {
            onClick: () => addValueToStake(8),
            label: '8',
            isRegular: true,
        },
        {
            onClick: () => addValueToStake(9),
            label: '9',
            isRegular: true,
        },
        {
            onClick: () => addValueToStake(0),
            label: '0',
            isRegular: true,
        },
    ], [addValueToStake, removeStake])

    return (
        <div
            className = {styles['bs-stake-keyboard__landscape']}
            data-testid = "Container__StakeKeyBoardLandscape"
        >
            <div
                className = {styles['bs-stake-keyboard__landscape-column']}
                data-testid = "Container__StakeKeyBoardLandscapeColumn"
            >
                <StakeKeyBoardButton
                    onClick = {() => addQuickValue(5)}
                    label = "+5"
                />
                <StakeKeyBoardButton
                    onClick = {() => addQuickValue(10)}
                    label = "+10"
                />
                <StakeKeyBoardButton
                    onClick = {() => addQuickValue(15)}
                    label = "+15"
                />
                <StakeKeyBoardButton
                    onClick = {() => addQuickValue(20)}
                    label = "+20"
                />
            </div>
            <div
                className = {styles['bs-stake-keyboard__landscape-column']}
                data-testid = "Container__StakeKeyBoardLandscapeColumnSecond"
            >
                {buttons.map((item, index) => (
                    <StakeKeyBoardButton
                        key = {index}
                        onClick = {item.onClick}
                        label = {item.label}
                        isRegular = {item.isRegular}
                    />
                ))}
            </div>
            <StakeKeyBoardButton
                onClick = {() => closeKeyboard()}
                label = "done"
                className = {styles['bs-stake-keyboard__btn-done']}
            />
        </div>
    )
}

StakeKeyBoardLandscape.propTypes = {
    addQuickValue: propTypes.func,
    addValueToStake: propTypes.func,
    closeKeyboard: propTypes.func,
    removeStake: propTypes.func,
}
