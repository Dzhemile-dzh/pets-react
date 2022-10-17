import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

export class TableHeader extends PureComponent {
    render() {
        const { columns } = this.props;
        return (
            <thead className = "table__header">
                <tr className = "table__row">
                    {columns
                        .map(({
                            className, headings, icon, accessibilityText,
                        }, columnIndex) => (
                            <th
                                // eslint-disable-next-line max-len
                                className = {`table__cell table__cell_header ${className} ${accessibilityText ? 'reader-only__parent' : ''}`}
                                key = {`column_header_${columnIndex}`}
                            >
                                {accessibilityText && (
                                <div className = "reader-only">
                                    {accessibilityText}
                                </div>
                                )}
                                {
                                headings.map((header, cellIndex) => (
                                    <div
                                        key = {`cell_header_${cellIndex}`}
                                        aria-hidden = {accessibilityText ? 'true' : 'false'}
                                    >
                                        {header}
                                    </div>
                                ))
                            }
                                {icon && icon()}
                            </th>
                        ))}
                </tr>
            </thead>
        );
    }
}

TableHeader.propTypes = {
    columns: propTypes.arrayOf(
        propTypes.shape({}).isRequired,
    ),
};
