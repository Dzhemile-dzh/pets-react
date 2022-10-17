import React, { PureComponent } from 'react';
import propTypes from 'prop-types';

export class TableFooter extends PureComponent {
    render() {
        const { footerData } = this.props;

        return (
            <tfoot className = "table__footer">
                <tr className = "table__row">
                    {footerData.map((children, i) => (
                        <td
                            className = "table__cell ui-table__cell_footer"
                            key = {i}
                        >
                            {children}
                        </td>
                    ))}
                </tr>
            </tfoot>
        );
    }
}

TableFooter.propTypes = {
    footerData: propTypes.arrayOf(
        propTypes.shape({}).isRequired,
    ).isRequired,
};
