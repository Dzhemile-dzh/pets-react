import { render, screen } from '@testing-library/react';
import { SocialIcons } from './SocialIcons';

const props = {
    menuItem: {
        id: 60,
        label: 'Racing Post',
        menuId: 2,
        menuItemId: 'eDd3Euk1bA',
        parentMenuItemId: null,
        position: 4,
        published: true,
        url: '/',
        children: [
            {
                id: 217,
                label: 'Instagram',
                menuId: 2,
                menuItemId: 'e0omATjDPL',
                parentMenuItemId: 'eDd3Euk1bA',
                position: 27,
                published: true,
                url: 'https://instagram.com/racingpost/',
                children: [],
            },
            {
                id: 218,
                label: 'Twitter',
                menuId: 2,
                menuItemId: 'eJgh7QvOiM',
                parentMenuItemId: 'eDd3Euk1bA',
                position: 28,
                published: true,
                url: 'https://twitter.com/racingpost',
                children: [],
            },
        ],
    },
}

describe('Social Icons', () => {
    test('Renders Racing Post logo', () => {
        render(
            <SocialIcons {...props} />,
        );

        const rpLogoIcon = screen.getByTestId('Container__RacingPostLogo');
        expect(rpLogoIcon).toBeInTheDocument();
    })

    test('Renders passed menu items', () => {
        render(
            <SocialIcons {...props} />,
        );

        const linkTwitter = screen.getByTestId('Link__Twitter');
        expect(linkTwitter).toBeInTheDocument();
        expect(linkTwitter.closest('a').getAttribute('href'))
            .toBe('https://twitter.com/racingpost');

        const linkInstagram = screen.getByTestId('Link__Instagram');
        expect(linkInstagram).toBeInTheDocument();
        expect(linkInstagram.closest('a').getAttribute('href'))
            .toBe('https://instagram.com/racingpost/');
    })
})
