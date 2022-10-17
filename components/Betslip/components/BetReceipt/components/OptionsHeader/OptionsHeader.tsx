import classnames from 'classnames';
import BestOddsIcon from '../../../BestOddsIcon';

import styles from './OptionsHeader.module.scss';

interface OptionsHeaderProps {
    count: number,
    isSingles: boolean,
    isMultiples: boolean,
}

export const OptionsHeader = ({
    count,
    isSingles,
    isMultiples,
}: OptionsHeaderProps) : React.ReactElement => (
    <div className = {classnames(
        styles['bs-bet-receipt-options-header'],
        {
            [styles['bs-bet-receipt-options-header--singles']]: isSingles,
            [styles['bs-bet-receipt-options-header--multiples']]: isMultiples,
        },
    )}
    >
        <div className = {styles['bs-bet-receipt-options-header__heading']}>
            <span className = {styles['bs-bet-receipt-options-header__label']}>
                {isSingles ? count > 1 ? 'Singles' : 'Single' : null}
                {isMultiples && 'Multiples'}
            </span>
            <span className = {styles['bs-bet-receipt-options-header__multilier']}>
                    x
                {count}
            </span>
        </div>
        <div className = {styles['bs-bet-receipt-options-header__separator']} />
        <div className = {styles['bs-bet-receipt-options-header__bog']}>
            <div className = {styles['bs-bet-receipt-options-header__bog-primary']}>
                <BestOddsIcon />
                <span className = {styles['bs-bet-receipt-options-header__bog-label']}>
                        Indicates best
                </span>
            </div>
            <span className = {styles['bs-bet-receipt-options-header__bog-sub-label']}>
                    odds guaranteed
            </span>
        </div>
    </div>
)
