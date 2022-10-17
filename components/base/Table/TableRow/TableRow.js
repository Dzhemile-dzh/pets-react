import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

export class TableRow extends PureComponent {
    render() {
        const { rowData } = this.props;
        return (
            <tr className = "table__row">
                {rowData
                    .map((
                        {
                            data, icon, className, accessibilityText, tooltipText, onClick,
                        },
                        columnIndex,
                    ) => (
                        <td
                            className = {`table__cell ${className} reader-only__parent`}
                            key = {`column_header_${columnIndex}`}
                            onClick = {onClick}
                        >
                            {/* NOTE:
                            We are putting the title on the accessability text div as well,
                            Because if it exists, the tooltip of the next div
                            wont be displayed when hovered */}
                            {accessibilityText && (
                            <div
                                className = "reader-only"
                                title = {tooltipText}
                            >
                                {accessibilityText}
                            </div>
                            )}
                            {
                            data && data.map((item, i) => (
                                <div
                                    key = {`cell_${i}`}
                                    aria-hidden = {accessibilityText ? 'true' : 'false'}
                                    title = {tooltipText}
                                >
                                    {item}
                                </div>
                            ))
                    }
                            {icon && icon()}
                        </td>
                    ))}
            </tr>
        );
    }
}

TableRow.propTypes = {
    rowData: propTypes.arrayOf(
        propTypes.shape({}).isRequired,
    ).isRequired,
};
