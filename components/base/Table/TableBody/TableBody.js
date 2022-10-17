import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import TableRow from '../TableRow';

export class TableBody extends PureComponent {
    render() {
        const { data } = this.props;
        return (
            <tbody className = "table__body">
                {data.map((rowData, index) => (
                    rowData && (
                    <TableRow
                        rowData = {rowData}
                        key = {index}
                    />
                    )
                ))}
            </tbody>
        );
    }
}

TableBody.propTypes = {
    data: propTypes.arrayOf(
        propTypes.array.isRequired,
    ).isRequired,
};
