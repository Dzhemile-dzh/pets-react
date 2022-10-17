import { FC } from 'react';
import { WarningMessageInterface } from './WarningMessage.types';

export const WarningMessage : FC<WarningMessageInterface> = ({
    message,
    icon,
    className,
}) => (
    <div
        className = {className}
        data-testid = "Container__WarningMessage"
    >
        {icon}
        <span data-testid = "Text__WarningMessage">{message}</span>
    </div>
);
