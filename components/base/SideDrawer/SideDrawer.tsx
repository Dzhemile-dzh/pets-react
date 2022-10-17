import React, { ReactElement } from 'react';
import Drawer from '@material-ui/core/Drawer';
import Button from '../inputs/Button';
import { ChevronIcon } from '../Icons/ChevronIcon';

import { convertToPascalCase } from '../../../project/utils/formatUtils';

import styles from './SideDrawer.module.scss';

interface SideDrawerProps {
    anchor?: 'left' | 'top' | 'right' | 'bottom';
    children: ReactElement | Array<ReactElement>;
    isOpen: boolean;
    onClose: () => void;
    purpose: string;
    showHeader?: boolean;
    title?: string;
}

export const SideDrawer = ({
    anchor = 'right',
    children,
    isOpen,
    onClose,
    purpose,
    showHeader = false,
    title,
}: SideDrawerProps): ReactElement => {
    const formattedPurpose = convertToPascalCase(purpose);
    return (
        <Drawer
            anchor = {anchor}
            open = {isOpen}
            data-testid = {`Container__${formattedPurpose}SideDrawer`}
            classes = {{ paper: styles['side-drawer'] }}
        >
            {showHeader && (
                <div
                    className = {styles['side-drawer__header']}
                    data-testid = {`Container__${formattedPurpose}SideDrawerHeader`}
                >
                    <Button
                        styleType = "back"
                        data-testid = {`Button__${formattedPurpose}SideDrawerHeaderBack`}
                        onClick = {onClose}
                    >
                        <div
                            className = {styles['side-drawer__header-icon']}
                            data-testid = {`Container__${formattedPurpose}SideDrawerHeaderIcon`}
                        >
                            <ChevronIcon />
                        </div>
                        Back
                    </Button>
                    <span
                        className = {styles['side-drawer__header-title']}
                        data-testid = {`Text__${formattedPurpose}SideDrawerTitle`}
                    >
                        {title}
                    </span>
                </div>
            )}
            <div
                className = {styles['side-drawer__content']}
                data-testid = {`Container__${formattedPurpose}SideDrawerContent`}
            >
                {children}
            </div>
        </Drawer>
    )
}
