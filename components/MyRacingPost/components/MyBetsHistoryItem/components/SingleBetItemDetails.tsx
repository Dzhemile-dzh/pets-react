import moment from 'moment';
import { SingleBetHistoryItemInterface } from '../../../../interfaces';
import { Constants } from '../../../../../project/constants';

import styles from '../../MyBetsHistory/MyBetsHistory.module.scss';

const { DATE_FORMATS: { DD_MMM_YYYY } } = Constants;

export const SingleBetItemDetails = ({
    selectionName,
    oddsFractionalNumerator,
    oddsFractionalDenominator,
    eventName,
    eventDate,
}: SingleBetHistoryItemInterface): JSX.Element => (
    <div
        className = {styles['my-bets-history__race-details']}
        data-testid = "Container__BetHistoryRaceDetails"
    >
        <h3 data-testid = "Text__BetHistorySelectionName">
            {selectionName}
            {' '}
            <span data-testid = "Text__BetHistoryOdds">
                {oddsFractionalNumerator === 'SP' || oddsFractionalDenominator === 'SP' ?
                    null : (
                        <>
                            {Number(oddsFractionalNumerator)}
                                /
                            {Number(oddsFractionalDenominator)}
                        </>
                    )}
            </span>
        </h3>
        <p data-testid = "Text__BetHistoryEventName">
            {eventName}
        </p>
        <p data-testid = "Text__BetHistoryEventDate">
            {moment(eventDate).format(DD_MMM_YYYY)}
        </p>
    </div>
);
