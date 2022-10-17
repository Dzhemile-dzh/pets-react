import React from 'react';
import classnames from 'classnames';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import { makeStyles } from '@material-ui/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import propTypes from 'prop-types';

import styles from './RadioButton.module.scss';

const useStyles = makeStyles({
    root: {
        '&:hover': {
            backgroundColor: 'transparent',
        },
    },
    icon: {
        borderRadius: '50%',
        width: 20,
        height: 20,
        boxShadow: 'inset 0 0 0 1px rgba(16,22,26,.2), inset 0 -1px 0 rgba(16,22,26,.1)',
        backgroundColor: '#ffffff',
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
    checkedIcon: {
        backgroundColor: '#ffffff',
        backgroundImage: 'linear-gradient(180deg,hsla(0,0%,100%,.1),hsla(0,0%,100%,0))',
        '&:before': {
            display: 'block',
            width: 20,
            height: 20,
            backgroundImage: 'radial-gradient(#171717,#171717 45%,transparent 55%)',
            content: '""',
        },
        'input:disabled ~ &': {
            boxShadow: 'none',
            background: 'rgba(206,217,224,.5)',
        },
    },
});

const StyledRadio = (props) => {
    const classes = useStyles();

    return (
        <Radio
            className = {classes.root}
            disableRipple
            color = "default"
            checkedIcon = {<span className = {classnames(classes.icon, classes.checkedIcon)} />}
            icon = {<span className = {classes.icon} />}
            {...props}
        />
    );
}

export const RadioButton = ({
    label = '',
    buttons,
    value,
    handleRadioChange,
    className,
    type = 'vertical',
    disabled,
}) => (
    <div className = {classnames(
        styles['radio-button__container'],
        styles[`${className}__container`],
    )}
    >
        <FormLabel
            component = "label"
            classes = {{
                root: classnames(
                    styles['radio-button__label'],
                    styles[`${className}__label`],
                ),
            }}
        >
            {label}
        </FormLabel>
        <RadioGroup
            className = {classnames(
                styles.className,
                styles[`${className}`],
                styles[`${className}--${type}`],
            )}
            aria-label = "radio"
            name = "radio"
            value = {value}
            onChange = {handleRadioChange}
        >
            {buttons.map((button, index) => {
                return (
                    <div
                        className = {classnames(
                            styles['radio-button__option'],
                            styles[`${className}__option`],
                        )}
                        key = {index}
                    >
                        <FormControlLabel
                            key = {index}
                            value = {button.value}
                            disabled = {disabled || button.disabled}
                            control = {<StyledRadio />}
                            label = {button.label}
                            // NOTE: more information about this 'classes'
                            // object: https://mui.com/api/typography/
                            classes = {{
                                root: classnames(
                                    styles['option-control'],
                                ),
                                label: classnames(
                                    styles['option-control__label'],
                                ),
                            }}
                        />
                        {button.children}
                    </div>
                )
            })}
        </RadioGroup>
    </div>
)

RadioButton.propTypes = {
    label: propTypes.string,
    buttons: propTypes.array,
    value: propTypes.any,
    handleRadioChange: propTypes.func,
    className: propTypes.string,
    disabled: propTypes.bool,
    type: propTypes.string,
}
