/* eslint-disable max-len */
import { useState, useCallback, useEffect } from 'react';
import { useRouter } from 'next/router';
import propTypes from 'prop-types';
import Title from '../base/meta/Title';
import MetaDescription from '../base/meta/MetaDescription';
import RaceHeader from './components/RaceHeader';
import PredictorAndVerdict from './components/PredictorAndVerdict';
import NavigationTabs from './components/NavigationTabs';
import ResultBettingReturns from './components/ResultBettingReturns';
import Runners from './components/Runners';
import RaceToRaceNavigation from './components/RaceToRaceNavigation';
import ActiveTab from './components/ActiveTab';
import { Constants } from '../../project/constants';
import { useBreakPoint } from '../contexts/BreakPointContext';

import {
    generatePageTitle,
    generateMetaDescription,
} from './utils';
import { isUrlIncludingSlug } from '../../project/utils/isUrlIncludingSlug';

import styles from './Race.module.scss';

const {
    RUNNER_RACES_TYPES,
    RACE_STATUSES,
    RACECARD_TAB_URL: {
        COMPARE_ODDS,
    },
} = Constants;

const NAVIGATION_TABS = ['racecard', 'at a glance', 'compare odds']

export const Race = ({
    data,
    cardCustomization,
}) => {
    const [activeNavigationTab, setActiveNavigationTab] = useState('racecard');
    const [runnerRaceFormsType, setRunnerRaceFormsType] = useState(null);
    const [isCommentOpen, setCommentOpen] = useState(false);
    const [isDetailsOpen, setDetailsOpen] = useState(false);

    const { isMobile } = useBreakPoint();

    const router = useRouter();
    const { slug } = router.query;
    const lastSlug = slug[slug.length - 1].replaceAll('-', ' ');
    const isCompareOddsTabActive = isUrlIncludingSlug(router.asPath, `/${COMPARE_ODDS}`);

    useEffect(() => {
        // if we have 5 slugs and matches tab name with 5th slug
        // show the proper tab and set it as active
        const matchedTabWithSlug = NAVIGATION_TABS.find(
            (tabName) => tabName === lastSlug,
        );

        if (slug.length === 5 && matchedTabWithSlug) {
            setActiveNavigationTab(matchedTabWithSlug);
        } else {
            setActiveNavigationTab('racecard');
        }
    }, [lastSlug, slug.length]);

    // NOTE:
    // this is temporary added, because of JP-967 => scenario #5
    // will be removed once compare-odds mobile is done
    useEffect(() => {
        if (isMobile && isCompareOddsTabActive) {
            const url = `/${router.asPath.substring(1).split('/').slice(0, 5).join('/')}`;
            router.replace(url, undefined, { shallow: true });
        }
    }, [isCompareOddsTabActive, isMobile, router]);

    const toggleRunnerRacesForm = useCallback((formType) => {
        if (!runnerRaceFormsType) {
            setRunnerRaceFormsType(formType)
        } else {
            setRunnerRaceFormsType(null)
        }
    }, [runnerRaceFormsType])

    const toggleCommentOpen = useCallback(() => setCommentOpen((prev) => !prev), []);
    const toggleDetailsOpen = useCallback(() => setDetailsOpen((prev) => !prev), []);

    return (
        <main
            className = {styles.race__container}
            id = {data.isResult ? 'race-results' : 'racecard'}
            data-testid = {`Container__${data.raceId}__Race`}
        >
            <Title
                title = {generatePageTitle(data = {
                    ...data,
                    isCompareOddsTabActive,
                })}
            />
            {/* this change is just for compare odds tab JP-967 */}
            <MetaDescription
                metaDescription = {generateMetaDescription(data = {
                    ...data,
                    isCompareOddsTabActive,
                })}
            />
            {!isMobile && (
            <div
                className = {styles['race__race-to-race']}
            >
                <RaceToRaceNavigation
                    date = {data.raceLocalTime.raceDate}
                    meetingName = {data.meetingName}
                    meetingId = {data.meetingId}
                    raceId = {data.raceId}
                />
            </div>
            )}
            <RaceHeader data = {data} />
            <div
                className = {styles.race__info}
                data-testid = "Container__RaceInfo"
            >
                {data.isResult ? (
                    <ResultBettingReturns
                        totalStartingPrice = {data.totalStartingPrice}
                        bettingReturns = {data.bettingReturns}
                    />
                ) : (
                    isMobile ? (
                        data.verdict?.length > 0 && (
                        <PredictorAndVerdict
                            verdict = {data.verdict}
                            verdictAuthor = {data.verdictAuthor}
                        />
                        )
                    ) : (
                        <NavigationTabs
                            url = {data.raceUrl}
                            activeTab = {activeNavigationTab}
                            tabs = {NAVIGATION_TABS}
                        />
                    )
                )}
                <ActiveTab
                    cardCustomization = {cardCustomization}
                    changeCustomozationSettings = {() => {}}
                    activeNavigationTab = {activeNavigationTab}
                    runnerRacesForm = {runnerRaceFormsType}
                    isCommentOpen = {isCommentOpen}
                    isDetailsOpen = {isDetailsOpen}
                    isResult = {data.isResult}
                    shouldDisableTipsAndCommentsButton = {
                                        data.status !== RACE_STATUSES.DECLARED ?
                                            true : data.runners.every((runner) => !runner.spotlightComment?.trim().length)
                                    }
                    toggleDetails = {toggleDetailsOpen}
                    toggleSubsequentForm = {() => toggleRunnerRacesForm(RUNNER_RACES_TYPES.SUBSEQUENT)}
                    toggleRecenRaceForm = {() => toggleRunnerRacesForm(RUNNER_RACES_TYPES.RECENT)}
                    toggleRunnerComment = {toggleCommentOpen}
                    raceId = {data.raceId}
                />
                {/* TODO refactor with JP-965 */}
                {activeNavigationTab === 'racecard' && (
                    <>
                        {!isMobile && data.verdict?.length > 0 && (
                            <PredictorAndVerdict
                                verdict = {data.verdict}
                                verdictAuthor = {data.verdictAuthor}
                            />
                        )}
                        <Runners
                            data = {data}
                            runners = {data.runners}
                            isResult = {data.isResult}
                            runnerRaceFormsType = {runnerRaceFormsType}
                            isCommentOpen = {isCommentOpen}
                            cardCustomization = {cardCustomization}
                            isDetailsOpen = {isDetailsOpen}
                        />
                    </>
                )}
            </div>
        </main>
    )
}

Race.propTypes = {
    data: propTypes.object,
    cardCustomization: propTypes.object,
};
