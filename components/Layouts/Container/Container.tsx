import {
    ReactChild,
    ReactChildren,
    FC,
    ReactElement,
} from 'react'

import { useStyles, StylesInteface } from '../useStyles';

interface ContainerInterface extends StylesInteface{
    children: ReactChild | ReactChildren | ReactElement | ReactElement[];
}

export const Container : FC<ContainerInterface> = ({
    children,
    ...rest
}) => (
    <div className = {useStyles(rest)}>
        {children}
    </div>
)
