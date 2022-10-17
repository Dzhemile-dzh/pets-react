import React from 'react';
import { Loader } from './Loader';

export default {
    component: Loader,
    title: 'Base/Loader',
}

export const Primary = () => <Loader />

export const BetslipLoader = () => (
    <div style = {{ display: 'flex' }}>
        <Loader type = "betslip">Button</Loader>
    </div>
)
