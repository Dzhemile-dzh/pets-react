import {
    ReactChild,
    ReactChildren,
    ReactNode,
} from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import { IS_REDIRECT_TO_RP1_ENABLED } from '@project/featureFlags';

import styles from './HybridLink.module.scss';

interface HybridLinkChildrenInterface {
    children: ReactChild | ReactChildren | ReactNode | ReactNode[];
    hybridUrl?: string;
    url?: string;
    isConditionalLink?: boolean;
    openInNewTab?: boolean;
    availableClassName?: string;
    availableDataTestId?: string;
}

export const HybridLink = ({
    children,
    hybridUrl = null,
    url = null,
    isConditionalLink = false,
    openInNewTab = false,
    availableClassName = null,
    availableDataTestId = null,
} : HybridLinkChildrenInterface) : JSX.Element => {
    return (
        IS_REDIRECT_TO_RP1_ENABLED ? (
            <a
                href = {hybridUrl}
                className = {classnames(
                    availableClassName,
                    {
                        [styles['hybrid__conditional-link']]: isConditionalLink,
                    },
                )}
                target = {openInNewTab ? '_blank' : undefined}
                rel = "noreferrer"
                data-testid = {availableDataTestId}
            >
                {children}
            </a>
        ) : (
            <Link href = {url}>
                <a
                    className = {classnames(
                        availableClassName,
                        {
                            [styles['hybrid__conditional-link']]: isConditionalLink,
                        },
                    )}
                    data-testid = {availableDataTestId}
                >
                    {children}
                </a>
            </Link>
        )
    );
}
