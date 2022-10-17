import React, { ReactElement } from 'react';

import { Modal } from '../Modal';

import { convertToPascalCase } from '../../../project/utils/formatUtils';

import styles from './Panel.module.scss';

interface PanelInterface {
    purpose: string;
    title?: string;
    subtitle?: string;
    children?: ReactElement | Array<ReactElement>
}

export const Panel = ({
    purpose,
    title,
    subtitle,
    children,
}: PanelInterface): ReactElement => {
    const formattedPurpose = convertToPascalCase(purpose);

    return (
        <Modal>
            <div
                className = {styles.panel__content}
                data-testid = {`Container__${formattedPurpose}PanelContent`}
            >
                <div
                    className = {styles.panel__header}
                    data-testid = {`Container__${formattedPurpose}PanelHeader`}
                >
                    <span
                        className = {styles.panel__title}
                        data-testid = {`Text__${formattedPurpose}PanelTitle`}
                    >
                        {title}
                    </span>
                    <span
                        className = {styles.panel__subtitle}
                        data-testid = {`Text__${formattedPurpose}PanelSubtitle`}
                    >
                        {subtitle}
                    </span>
                </div>
                {children}
            </div>
        </Modal>
    )
}
