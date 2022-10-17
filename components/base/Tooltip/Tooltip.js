import React, { memo } from 'react';
import MUITooltip from '@material-ui/core/Tooltip';
import propTypes from 'prop-types'

import LayoutTooltip from './components/LayoutTooltip/index.tsx'

export const InnerTooltip = ((props) => {
    const { closeFunction, exceptElements, ...rest } = props;
    return (
        <LayoutTooltip closeFunction = {closeFunction} exceptElements = {exceptElements}>
            {/* React throws warning because it receives boolean true as value instead of string */}
            <MUITooltip interactive = "true" {...rest} />
        </LayoutTooltip>
    )
})

export const Tooltip = memo(InnerTooltip);

Tooltip.displayName = 'Tooltip';

InnerTooltip.propTypes = {
    closeFunction: propTypes.func,
    exceptElements: propTypes.array,
}
