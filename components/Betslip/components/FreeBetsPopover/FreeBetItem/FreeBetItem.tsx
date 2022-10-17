import { ReactElement } from 'react';
import moment from 'moment';
import Image from 'next/image';

import { FreeBetInterface } from '../../../../interfaces/Bookmaker';
import { compareDateAndTime } from '../../../../../project/utils/dateUtils';

import styles from './FreeBetItem.module.scss';

interface FreeBetItemInterface {
    bets: FreeBetInterface | Array<FreeBetInterface>;
    currencySign: string;
    dateFormat: string;
}

export const FreeBetItem = ({
    bets,
    currencySign,
    dateFormat,
}: FreeBetItemInterface): ReactElement => {
    const { amount, expiry } = Array.isArray(bets) ? bets[0] : bets;
    const freeBetsCount = Array.isArray(bets) ? bets.length : 1;
    const formattedDate = moment(expiry).format(dateFormat);
    const expiresSoon = compareDateAndTime(expiry, 'hours') > -24;

    const shouldShowExpiryDate = !!expiry || freeBetsCount > 1;

    const expiryDate = `Exp ${freeBetsCount > 1 ? 'invalid date' : formattedDate}`;
    const freeBetsCountLabel = freeBetsCount > 1 ? `${freeBetsCount}x ` : '';
    const freeBetsLabel = `${freeBetsCountLabel}${currencySign}${amount} FREE BET`;

    return (
        <div
            className = {styles['free-bet-item']}
            data-testid = "Container__FreeBetItem"
        >
            <span
                className = {styles['free-bet-item__amount']}
                data-testid = "Text__FreeBetItemAmount"
            >
                {freeBetsLabel}
            </span>
            <div
                className = {styles['free-bet-item__expire']}
                data-testid = "Container__FreeBetItemExpire"
            >
                {shouldShowExpiryDate && (
                    <span
                        className = {styles['free-bet-item__expire-date']}
                        data-testid = "Text__FreeBetItemExpireDate"
                    >
                        {expiryDate}
                    </span>
                )}
                {expiresSoon && freeBetsCount === 1 && (
                    <div
                        className = {styles['free-bet-item__expire-soon']}
                        data-testid = "Container__FreeBetItemExpireSoon"
                    >
                        <Image
                            src = "/svgs/alert.svg"
                            width = {16}
                            height = {16}
                        />
                        <span
                            className = {styles['free-bet-item__expire-soon-label']}
                            data-testid = "Text__FreeBetItemExpireSoonLabel"
                        >
                            Expires soon
                        </span>
                    </div>
                )}
            </div>
        </div>
    );
}
