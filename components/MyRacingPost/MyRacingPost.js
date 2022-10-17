import { useState, useEffect } from 'react';
import propTypes from 'prop-types';
import { useDispatch } from 'react-redux'
import { Actions } from '../../project/common';
import { withBookmakerAccounts } from '../../store/providers';

import MyRacingPostDesktop from './MyRacingPostDesktop';
import MyRacingPostMobile from './MyRacingPostMobile';

import { Constants } from '../../project/constants';

import LoginLayoutProvider from '../base/LoginLayoutProvider/index.tsx';
import { useBreakPoint } from '../contexts/BreakPointContext';

import styles from './MyRacingPost.module.scss';

const { ANALYTICS_LOCATIONS } = Constants;

const MyRacingPost = ({
    totalBalance,
    bookmakers,
}) => {
    const dispatch = useDispatch();

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [previousSelectedBookmaker, setPreviousSelectedBookmaker] = useState(null);

    const isZeroBalance = totalBalance === '£0.00';
    const isLogged = bookmakers.some((bookmaker) => bookmaker.isLogged);
    const { isMobile } = useBreakPoint();

    // NOTE: MUST BE REMOVED WHEN
    // getInitialProps is fixed and works
    useEffect(() => {
        if (isLogged) {
            dispatch(Actions.getUnsettledBetHistory());
        }
    }, [dispatch, isLogged]);

    return (
        <LoginLayoutProvider>
            <main
                className = {styles['my-racing-post__container']}
                data-testid = "Container__MyRacingPost"
            >
                {isMobile ? (
                    <MyRacingPostMobile
                        bookmakers = {bookmakers}
                        isZeroBalance = {isZeroBalance}
                        isLogged = {isLogged}
                        setDropdownOpen = {(value) => setIsDropdownOpen(value)}
                        isDropdownOpen = {isDropdownOpen}
                        setPreviousSelectedBookmaker = {
                            (value) => setPreviousSelectedBookmaker(value)
                        }
                        previousSelectedBookmaker = {previousSelectedBookmaker}
                        location = {ANALYTICS_LOCATIONS.MY_RACING_POST}
                        totalBalance = {totalBalance}
                    />
                ) : (
                    <MyRacingPostDesktop
                        bookmakers = {bookmakers}
                        isZeroBalance = {isZeroBalance}
                        isLogged = {isLogged}
                        setDropdownOpen = {(value) => setIsDropdownOpen(value)}
                        isDropdownOpen = {isDropdownOpen}
                        setPreviousSelectedBookmaker = {
                            (value) => setPreviousSelectedBookmaker(value)
                        }
                        previousSelectedBookmaker = {previousSelectedBookmaker}
                        location = {ANALYTICS_LOCATIONS.MY_RACING_POST}
                        totalBalance = {totalBalance}
                    />
                )}
            </main>
        </LoginLayoutProvider>
    );
}

MyRacingPost.displayName = 'MyRacingPost';

MyRacingPost.propTypes = {
    bookmakers: propTypes.array.isRequired,
    totalBalance: propTypes.string,
}

export const MyRacingPostWith = withBookmakerAccounts(
    MyRacingPost,
    ['bookmakers', 'totalBalance'],
    null,
)
