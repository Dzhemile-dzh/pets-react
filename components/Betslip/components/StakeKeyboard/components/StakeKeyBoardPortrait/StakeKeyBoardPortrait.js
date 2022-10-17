import React, { useMemo } from 'react'
import propTypes from 'prop-types';
import Image from 'next/image';

import StakeKeyBoardButton from '../StakeKeyBoardButton';

import styles from '../../StakeKeyboard.module.scss';

export const StakeKeyBoardPortrait = ({
    addQuickValue,
    addValueToStake,
    closeKeyboard,
    removeStake,
}) => {
    const buttons = useMemo(() => [
        {
            onClick: () => addQuickValue(5),
            label: '+5',
            className: styles['bs-stake-keyboard__portrait-first-row-button'],
        },
        {
            onClick: () => addQuickValue(10),
            label: '+10',
            className: styles['bs-stake-keyboard__portrait-first-row-button'],
        },
        {
            onClick: () => addQuickValue(15),
            label: '+15',
            className: styles['bs-stake-keyboard__portrait-first-row-button'],
        },
        {
            onClick: () => addQuickValue(20),
            label: '+20',
            className: styles['bs-stake-keyboard__portrait-first-row-button'],
        },
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
            onClick: () => closeKeyboard(),
            label: 'Done',
            className: styles['bs-stake-keyboard__btn-done'],
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
            onClick: () => addValueToStake('.'),
            label: <span className = {styles['bs-stake-keyboard__btn-dot']} />,
            isRegular: true,
        },
        {
            onClick: () => addValueToStake(0),
            label: '0',
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
    ], [addQuickValue, addValueToStake, closeKeyboard, removeStake])

    return (
        <div
            className = {styles['bs-stake-keyboard__portrait']}
            data-testid = "Container__StakeKeyBoardPortrait"
        >
            {buttons.map((item, index) => {
                return (
                    <StakeKeyBoardButton
                        key = {index}
                        onClick = {item.onClick}
                        label = {item.label}
                        className = {item.className}
                        isRegular = {item.isRegular}
                    />
                )
            })}
        </div>
    )
}

StakeKeyBoardPortrait.propTypes = {
    addQuickValue: propTypes.func,
    addValueToStake: propTypes.func,
    closeKeyboard: propTypes.func,
    removeStake: propTypes.func,
}
