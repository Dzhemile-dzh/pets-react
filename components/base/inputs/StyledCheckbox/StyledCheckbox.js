import React from 'react';
import classnames from 'classnames';
import Image from 'next/image';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import MaterialCheckbox from '@material-ui/core/Checkbox';
import propTypes from 'prop-types';
import { FormGroup } from 'reactstrap';

import styles from './StyledCheckbox.module.scss';

export const StyledCheckbox = ({
    label = '',
    checked,
    handleChange,
    subtitle,
    className,
}) => {
    return (
        <FormGroup
            className = {classnames(styles['styled-checkbox'], className)}
            data-testid = "Container__StyledCheckbox"
        >
            <FormControlLabel
                control = {(
                    <MaterialCheckbox
                        className = {styles['styled-checkbox__icon']}
                        checked = {checked}
                        onChange = {handleChange}
                        name = "checkbox"
                        color = "primary"
                        checkedIcon = {(
                            <span
                                className = {styles['styled-checkbox__tick-icon']}
                            >
                                <Image
                                    src = "/svgs/tick.svg"
                                    width = {28}
                                    height = {28}
                                />
                            </span>
                        )}
                        icon = {<span />}
                    />
                )}
                label = {label}
            />
            <div
                className = {styles['styled-checkbox__subtitle']}
                data-testid = "Container__StyledCheckboxSubtitle"
            >
                {subtitle}
            </div>
        </FormGroup>
    );
}

StyledCheckbox.propTypes = {
    label: propTypes.string,
    checked: propTypes.bool,
    handleChange: propTypes.func,
    subtitle: propTypes.string,
    className: propTypes.string,
}
