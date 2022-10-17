/* eslint-disable max-len */
import Image from 'next/image';

import { MultipleSelectionInterface } from '../../../../../interfaces/BetReceipt';

import styles from './MultipleItemSelection.module.scss';

interface multipleBetItemSelectionsInterface {
    multipleBetItemSelections: Array<MultipleSelectionInterface>,
}

export const MultipleItemSelection = ({
    multipleBetItemSelections,
}: multipleBetItemSelectionsInterface) => (
    <ul
        className = {styles['multiple-item-selection__list']}
        data-testid = "Container__MultiReceiptItemSelectionList"
    >
        {multipleBetItemSelections.map((item) => (
            <li key = {item.horseName}>
                <div
                    className = {styles['multiple-item-selection__details']}
                    data-testid = "Container__MultiReceiptItemSelectionDetails"
                >
                    <div>
                        <p
                            className = {styles['multiple-item-selection__details-horse-name']}
                            data-testid = "Text__MultiReceiptItemSelectionDetailsRunnerNumberHorseName"
                        >
                            <span>{item.runnerNumber}</span>
                            {item.horseName}
                        </p>
                        <span
                            className = {styles['multiple-item-selection__details-meeting-name']}
                            data-testid = "Text__MultiReceiptItemSelectionDetailsMeetingName"
                        >
                            {item.startTime} {item.meetingName} {' '}
                        </span>
                        <span
                            className = {styles['multiple-item-selection__details-meeting-date']}
                            data-testid = "Text__MultiReceiptItemSelectionDetailsMeetingDate"
                        >
                            {item.date}
                        </span>
                    </div>
                    <div>
                        <p
                            className = {styles['multiple-item-selection__details-odds']}
                            data-testid = "Text__MultiReceiptItemSelectionDetailsOdds"
                        >
                            {item.isStartingPrice ? 'SP' : item.displayPrice}
                        </p>
                        {item.useBestOddsGuaranteed && (
                            <div className = {styles['multiple-item-selection__details-odds-icon']}>
                                <Image
                                    src = "/svgs/bestodds.svg"
                                    width = {18}
                                    height = {18}
                                    data-testid = "Text__MultiReceiptItemSelectionIcon"
                                />
                            </div>
                        )}
                    </div>
                </div>
            </li>
        ))}
    </ul>
)
