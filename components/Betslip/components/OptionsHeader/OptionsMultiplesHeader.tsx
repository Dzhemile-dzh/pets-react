import classnames from 'classnames';
import { HelpIcon } from '../../../base/Icons/HelpIcon';
import Button from '../../../base/inputs/Button';

import styles from './OptionsHeader.module.scss';

export const OptionsMultiplesHeader: React.FC = () => {
    const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
    }
    return (
        <div
            className = {classnames(
                styles['bs-options-header'],
                styles['bs-options-header--multiples'],
            )}
            data-testid = "Container__OptionsMultiplesHeader"
        >
            <div
                className = {styles['bs-options-header__heading']}
                data-testid = "Container__OptionsMultiplesHeading"
            >
                <span />
                <span
                    className = {classnames(
                        styles['bs-options-header__label'],
                        styles['bs-options-header__label-multiples'],
                    )}
                    data-testid = "Text__OptionsMultiplesHeaderLabel"
                >
                    Multiples
                </span>
            </div>
            <div
                className = {styles['bs-options-header__separator']}
                data-testid = "Container__OptionsMultiplesHeaderSeparator"
            />
            <div
                className = {styles['bs-options-header__additional-action']}
                data-testid = "Container__OptionsMultiplesHeaderAdditionalAction"
            >
                <Button
                    onClick = {handleButtonClick}
                    data-testid = "Button__OptionsMultiplesHelp"
                >
                    <HelpIcon />
                    help me
                </Button>
            </div>
        </div>
    )
}
