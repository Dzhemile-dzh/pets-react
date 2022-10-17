import { ReactElement, useMemo } from 'react';
import { groupBy, values } from 'lodash';

import Popover from '../../../base/Popover';
import FreeBetItem from './FreeBetItem';
import { FreeBetInterface } from '../../../interfaces/Bookmaker';

import { Constants } from '../../../../project/constants';

import styles from './FreeBetsPopover.module.scss';

const { DATE_FORMATS: { DD_MMMM_YYYY } } = Constants;

interface FreeBetsPopoverInterface {
    freeBets: Array<FreeBetInterface>;
    currencySign: string;
    bookmakerListPosition?: number;
    setShouldShowPopover: (value: boolean) => void;
}

export const FreeBetsPopover = ({
    freeBets,
    currencySign,
    bookmakerListPosition,
    setShouldShowPopover,
}: FreeBetsPopoverInterface): ReactElement => {
    const groupedFreeBets = useMemo(() => {
        return values(groupBy(freeBets, (bet: FreeBetInterface) => bet.amount));
    }, [freeBets]);

    const position = bookmakerListPosition > 4 ? 'above' : 'below';

    return (
        <Popover
            setShouldShowPopover = {setShouldShowPopover}
            position = {position}
            purpose = "FreeBets"
            className = {styles['free-bets-popover']}
            shouldStopClickEventPropagation
        >
            {groupedFreeBets.map((bets) => (
                <FreeBetItem
                    key = {bets[0].id}
                    bets = {bets}
                    currencySign = {currencySign}
                    dateFormat = {DD_MMMM_YYYY}
                />
            ))}
        </Popover>
    )
}
