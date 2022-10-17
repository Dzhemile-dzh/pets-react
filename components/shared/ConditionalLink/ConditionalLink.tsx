import { FC } from 'react';
import Link from 'next/link';
import classnames from 'classnames';

import styles from './ConditionalLink.module.scss';

interface ConditionalLinkInterface {
    condition: boolean;
    url: string;
    children: JSX.Element;
}

/**
 * This component is used to render either a link or a non clickable element
 * It's a shared component and can be used in the whole project
 * @param condition
 * @param url
 *
*/
export const ConditionalLink: FC<ConditionalLinkInterface> = ({
    children,
    condition,
    url,
}) => {
    if (condition) {
        return (
            <Link href = {url}>
                <a className = {classnames(styles['conditional-link'])}>
                    {children}
                </a>
            </Link>
        )
    }

    return children;
}
