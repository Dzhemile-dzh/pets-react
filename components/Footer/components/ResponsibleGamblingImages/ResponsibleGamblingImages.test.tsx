import { render, screen } from '@testing-library/react';
import { ResponsibleGamblingImages } from './ResponsibleGamblingImages';

const props = {
    menuItem: {
        id: 223,
        label: 'Responsible Gambling Images',
        menuId: 2,
        menuItemId: 'e-k47RBf2m',
        parentMenuItemId: null,
        position: 33,
        published: true,
        url: '',
        children: [
            {
                id: 224,
                label: 'Gamble Responsibly 18+',
                menuId: 2,
                menuItemId: 'eRwms-2tlv',
                parentMenuItemId: 'e-k47RBf2m',
                position: 0,
                published: true,
                url: '',
                children: [],
            },
            {
                id: 225,
                label: 'GamStop',
                menuId: 2,
                menuItemId: 'ePUo0mh_Ah',
                parentMenuItemId: 'e-k47RBf2m',
                position: 1,
                published: true,
                url: 'https://www.gamstop.co.uk/',
                children: [],
            },
        ],
    },
}

describe('Responsible Gambling Images', () => {
    test('Renders passed menu items', () => {
        render(
            <ResponsibleGamblingImages {...props} />,
        );

        const linkGambleResponsibly = screen.getByTestId('Link__GambleResponsibly18');
        expect(linkGambleResponsibly).toBeInTheDocument();
        expect(linkGambleResponsibly.closest('a').getAttribute('href')).toBe('');

        const linkGamStop = screen.getByTestId('Link__Gamstop');
        expect(linkGamStop).toBeInTheDocument();
        expect(linkGamStop.closest('a').getAttribute('href')).toBe('https://www.gamstop.co.uk/');
    })
})
