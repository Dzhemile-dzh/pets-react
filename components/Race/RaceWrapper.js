/* eslint-disable max-len */
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { withRacePage } from '../../store/providers';
import Loader from '../base/Loader';
import ErrorMessage from '../base/ErrorMessage';
import { Race } from './Race';
import { Constants } from '../../project/constants';
import { isUrlIncludingSlug } from '../../project/utils/isUrlIncludingSlug';

const {
    RACECARD_TAB_URL: {
        AT_A_GLANCE,
        COMPARE_ODDS,
    },
} = Constants;

export const RaceWrapper = (props) => {
    const {
        isRacePageLoading,
        racePageError,
        racePageData,
        url,
        showErrorPage,
        changeUrl,
        cardCustomization,
        changeCustomozationSettings,
        getRunnersRecentRaceForm,
    } = props;
    // added as a flag to prevent showing race header until a condition is met
    const [shouldShowRaceComponent, setShouldShowRaceComponent] = useState(false);

    const { slug } = useRouter().query;

    useEffect(() => {
        if (!isRacePageLoading) {
            const pageType = url.match(/racecard|racing-results/g)[0];

            if (racePageError && racePageError === 'Race not found') {
                showErrorPage();
                setShouldShowRaceComponent(false);
            } else if (racePageData?.status === 'result' && pageType !== 'racing-results') {
                changeUrl();
                setShouldShowRaceComponent(true);
            } else if (racePageData?.status !== 'result' && pageType === 'racing-results') {
                changeUrl();
                setShouldShowRaceComponent(true);
            } else if (
                // check for when user is in results page
                // and tries to add /at-a-glance or /compare-odds in the url
                racePageData?.status === 'result' &&
                pageType === 'racing-results' &&
                (isUrlIncludingSlug(url, `/${AT_A_GLANCE}`) || isUrlIncludingSlug(url, `/${COMPARE_ODDS}`))
            ) {
                showErrorPage();
                setShouldShowRaceComponent(false);
            } else {
                setShouldShowRaceComponent(true);
            }
        }
    }, [changeUrl, isRacePageLoading, racePageData, racePageError, showErrorPage, slug, url]);

    return (
        <>
            {(isRacePageLoading || !shouldShowRaceComponent) && <Loader />}
            {racePageError && racePageError !== 'Race not found' && (
                <ErrorMessage>{racePageError}</ErrorMessage>
            )}
            {!isRacePageLoading && !racePageError && racePageData && shouldShowRaceComponent && (
                <Race
                    data = {racePageData}
                    cardCustomization = {cardCustomization}
                    changeCustomozationSettings = {changeCustomozationSettings}
                    getRunnersRecentRaceForm = {getRunnersRecentRaceForm}
                />
            )}
        </>
    )
}

RaceWrapper.displayName = 'RaceWrapper';

export const RaceWrapperWith = withRacePage(RaceWrapper, undefined, null);

RaceWrapperWith.displayName = 'RaceWrapperWith';
