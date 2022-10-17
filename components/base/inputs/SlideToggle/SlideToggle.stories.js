import React from 'react';

import { SlideToggle } from './SlideToggle';

export default {
    component: SlideToggle,
    title: 'Base/SlideToggle',
};

const filterOptions = [
    { label: 'Open', value: 'OPEN' },
    { label: 'Settled', value: 'SETTLED' },
]

export const Primary = () => (
    <SlideToggle
        currentOption = "button1"
        purpose = "BetType"
    >
        {filterOptions.map((option, index) => (
            <SlideToggle.Button
                key = {index}
                optionLabel = {option.label}
                optionValue = {option.value}
            />
        ))}
    </SlideToggle>
)
