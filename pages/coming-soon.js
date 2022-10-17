import React from 'react';
import BasePage from '../components/base/pages/BasePage';

export default class ComingSoon extends BasePage {
    static displayName = 'ComminSoon';

    render() {
        return (
            <div style = {{ textAlign: 'center', fontWeight: 'bold', fontSize: '50px' }}>
                Coming soon...
            </div>
        );
    }
}
