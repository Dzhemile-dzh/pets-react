import React from 'react';
import { render, screen } from '@testing-library/react'

import { Button } from './Button.tsx';

describe('App', () => {
    test('renders App component', () => {
        render(<Button>Button default</Button>);
        expect(screen.getByText('Button default')).toBeInTheDocument();
    });
});
