import React from 'react';
import { EllipsisIcon } from '../../../base/Icons/EllipsisIcon';
import { MembersClubIcon } from '../../../base/Icons/MembersClubIcon';
import Button from '../../../base/inputs/Button';

import styles from './RacingPostProfile.module.scss';

export const RacingPostProfile = () => {
    return (
        <div
            className = {styles['racing-post-profile']}
            data-testid = "Container__MyRacingPostProfile"
        >
            <div
                className = {styles['racing-post-profile__wrapper']}
                data-testid = "Container__MyRacingPostProfileWrapper"
            >
                <div
                    className = {styles['racing-post-profile__header']}
                    data-testid = "Container__MyRacingPostHeader"
                >
                    <span
                        className = {styles['racing-post-profile__profile']}
                        data-testid = "Text__MyRacingPostMyProfile"
                    >
                        My Racing Post profile
                    </span>
                    <div
                        className = {styles['racing-post-profile__header-button']}
                        data-testid = "Container__MyRacingPostProfileHeaderButton"
                    >
                        <EllipsisIcon
                            size = "large"
                        />
                    </div>
                </div>
                <div
                    className = {styles['racing-post-profile__section']}
                    data-testid = "Container__MyRacingPostProfileSection"
                >
                    <span
                        className = {styles['racing-post-profile__user-name']}
                        data-testid = "Text__MyRacingPostProfileUserName"
                    >
                        John Smith
                    </span>
                    <MembersClubIcon
                        size = "large"
                        className = {styles['racing-post-profile__members-icon']}
                    />
                    <span
                        className = {styles['racing-post-profile__membership']}
                        data-testid = "Text__MyRacingPostProfileMembership"
                    >
                        Premium Member
                    </span>
                    <span
                        className = {styles['racing-post-profile__membership-details']}
                        data-testid = "Text__MyRacingPostProfileMembershipDetails"
                    >
                        Auto-renew since 12 July 2018
                    </span>
                    <Button
                        styleType = "tertiary"
                        className = {styles['racing-post-profile__membership-button']}
                        data-testid = "Button__MyRacingPostProfileMembership"
                    >
                        Manage subscription
                    </Button>
                </div>
                <div
                    className = {styles['racing-post-profile__quick-stats']}
                    data-testid = "Container__MyRacingPostProfileQuickStats"
                >
                    <ul
                        className = {styles['racing-post-profile__stats']}
                        data-testid = "Container__MyRacingPostProfileStats"
                    >
                        <span
                            className = {styles['racing-post-profile__stats-text']}
                            data-testid = "Text__MyRacingPostProfileQuickStats"
                        >
                            Quick stats
                        </span>
                        <li
                            className = {styles['racing-post-profile__stat']}
                            data-testid = "Text__MyRacingPostProfileStatsBets"
                        >
                            0 bets through Racing Post
                        </li>
                        <li
                            className = {styles['racing-post-profile__stat']}
                            data-testid = "Text__MyRacingPostProfileStatsWinningBets"
                        >
                            0 Winning bets
                        </li>
                        <li
                            className = {styles['racing-post-profile__stat']}
                            data-testid = "Text__MyRacingPostProfileStatsActiveBookmakers"
                        >
                            0 Active Bookmakers
                        </li>
                        <li
                            className = {styles['racing-post-profile__stat']}
                            data-testid = "Text__MyRacingPostProfileStatsHorses"
                        >
                            0 Tracked horses
                        </li>
                        <li
                            className = {styles['racing-post-profile__stat']}
                            data-testid = "Text__MyRacingPostProfileStatsJockeys"
                        >
                            0 Tracked Jockeys
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    )
}
