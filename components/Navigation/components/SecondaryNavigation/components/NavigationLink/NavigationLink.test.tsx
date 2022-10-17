import {
    NavigationProps,
} from '@components/Navigation/components/SecondaryNavigation/components/NavigationLink/NavigationLink';
import { wrapperRender } from '@project/utils/testUtility';
import { NavigationLink } from '@components/Navigation';

const navigationLinkProps = (isNavigationLinkWithDivWrapper: boolean): NavigationProps => ({
    href: '/',
    label: 'testLabel',
    isActive: false,
    isNavigationLinkWithDivWrapper,
});

describe('NavigationLink component tests', () => {
    it('should render NavigationLink component', () => {
        const { container } = wrapperRender(
            <NavigationLink {...navigationLinkProps(false)} />,
        );

        const navigationListItem =
            container.getElementsByClassName('secondary-navigation__list-item');
        expect(navigationListItem.length).toBe(1);
        expect(navigationListItem[0]).toBeInTheDocument();
    })

    it('should render NavigationLink component with "a" tag and correct label', () => {
        const { container } = wrapperRender(
            <NavigationLink {...navigationLinkProps(false)} />,
        );

        const navigationListItemLink =
            container.getElementsByClassName('secondary-navigation__list-item-link');

        expect(navigationListItemLink.length).toBe(1);
        expect(navigationListItemLink[0]).toBeInTheDocument();

        expect(navigationListItemLink[0].innerHTML).toEqual('testLabel');
        expect(navigationListItemLink[0].tagName).toEqual('A');
    })

    it('should render NavigationLink component with "DIV" tag wrapper', () => {
        const { container } = wrapperRender(
            <NavigationLink {...navigationLinkProps(true)} />,
        );

        const navigationListItem =
            container.getElementsByClassName('secondary-navigation__list-item');
        expect(navigationListItem[0].tagName).toEqual('DIV');
    })
});
