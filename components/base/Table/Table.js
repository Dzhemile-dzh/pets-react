import React, { PureComponent } from 'react';
import propTypes from 'prop-types';
import TableHeader from './TableHeader';
import TableBody from './TableBody';
import TableFooter from './TableFooter';

export class Table extends PureComponent {
    render() {
        const {
            columns,
            data,
            footerData,
        } = this.props;

        return (
            <table>
                <TableHeader
                    columns = {columns}
                />
                {data && (
                <TableBody
                    data = {data}
                />
                )}
                {
                    footerData && (
                        <TableFooter
                            data = {footerData}
                        />
                    )
}
            </table>
        );
    }
}

Table.propTypes = {
    data: propTypes.array,
    columns: propTypes.array,
    footerData: propTypes.array,
};
