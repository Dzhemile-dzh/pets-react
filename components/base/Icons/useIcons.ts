import classnames from 'classnames';
import styles from './Icon.module.scss';

export interface UseIconsInterface {
    className?: string;
    name?: string;
    size?: string;
    color?: string;
    transform?: string;
    dataTestId?: string;
    width?: string;
    height?: string;
    fill?: string;
    onClick?: () => void;
}

export const useIcons = ({
    className: inputClassName,
    name,
    size,
    color,
    transform,
    dataTestId,
    ...rest
} : UseIconsInterface) : { className: string, dataTestId?: string } => {
    const sizeSelector = size ? styles[`ui-icon--${size}`] : '';
    const colorSelector = color ? styles[`ui-icon--${color}`] : '';
    const iconName = styles[`ui-icon__${name}`];
    const transformSelector = transform ? styles[`ui-icon__${transform}`] : '';

    const className = classnames(
        styles['ui-icon'],
        inputClassName,
        sizeSelector,
        colorSelector,
        iconName,
        transformSelector,
    )

    return { className, dataTestId, ...rest };
}
