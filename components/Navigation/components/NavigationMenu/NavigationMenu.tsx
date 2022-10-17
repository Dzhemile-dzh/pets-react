import { useState, memo } from 'react';
import { IS_REDIRECT_TO_RP1_ENABLED } from '@project/featureFlags';
import { NextUKOnlyRaceInterface } from '@components/interfaces';
import { drawerItems, drawerItemsHybrid } from '@project/NavigationMenus';
import { MenuIcon } from '@components/base/Icons/MenuIcon';
import DrawerWrapper from '../DrawerWrapper';

export interface NavigationMenuProps {
    asPath: string,
    nextRace: NextUKOnlyRaceInterface
}

export const NavigationMenu = memo(({ asPath, nextRace }: NavigationMenuProps) => {
    const [isOpened, setIsOpened] = useState(false);

    const handleClick = () => {
        setIsOpened((prevIsOpen) => !prevIsOpen)
    }

    return (
        <div
            onClick = {handleClick}
            data-testid = "Container__NavigationMenu"
        >
            <MenuIcon />
            <DrawerWrapper
                isOpened = {isOpened}
                handleClick = {handleClick}
                items = {IS_REDIRECT_TO_RP1_ENABLED ? drawerItemsHybrid : drawerItems}
                asPath = {asPath}
                nextRace = {nextRace}
            />
        </div>
    )
})
NavigationMenu.displayName = 'NavigationMenu'
