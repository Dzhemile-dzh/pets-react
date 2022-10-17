import React from 'react';
import Link from 'next/link';
import { ChevronIcon } from '../../../base/Icons/ChevronIcon';

import styles from './NoRecentBetsMessage.module.scss';

export const NoRecentBetsMessage = () => (
    <div
        className = {styles['no-recent-bets-message__content']}
        data-testid = "Container__NoRecentBetsMessage"
    >
        <p
            data-testid = "Text__NoRecentBetsMessage"
        >
            Recent placed bets will show here
        </p>
        <Link href = "/today">
            <a>
                See today’s races{' '}
                <ChevronIcon width = "9px" />
            </a>
        </Link>
    </div>
)
