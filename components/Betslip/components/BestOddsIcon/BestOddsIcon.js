import React from 'react';
import Image from 'next/image';

import styles from './BestOddsIcon.module.scss';

export function BestOddsIcon() {
    return (
        <div
            className = {styles['bs-best-odds-icon']}
            data-testid = "Container__BestOddsIcon"
        >
            <Image
                src = "/svgs/bestodds.svg"
                width = {24}
                height = {24}
            />
        </div>
    )
}
