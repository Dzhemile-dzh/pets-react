/* eslint-disable @typescript-eslint/ban-ts-comment */
import React, { useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';

import { Actions } from '@project/common';
import {
    TaxonomyCollectionBodyInterface,
    HeaderInterface,
    StateInterface,
} from '@components/interfaces';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';

import ReportsPreviewsBase from '../../atoms/ReportsPreviewsBase';

interface RacePreviewsCollectionInterface extends
    Omit<HeaderInterface, 'purpose'>, TaxonomyCollectionBodyInterface {
}

export const RacePreviewsCollection = ({
    items,
    minimumArticleCount,
    maximumArticleCount,
    ...rest
}: RacePreviewsCollectionInterface): JSX.Element => {
    const races = useSelector((state: StateInterface) => state.races);
    const dispatch = useDispatch();

    const articleRaceIds = useMemo(() => items
        .map((item) => item.customTypeData.meta_data.race)
        .filter(Boolean), [items]);

    useEffectOnce(() => {
        articleRaceIds.forEach((id) => dispatch(Actions.getRace(id)));
    });

    const sortedArticles = useMemo(() => {
        const areRacesLoaded = Object.keys(races).every((raceId) => !races[raceId].isRaceLoading);

        if (areRacesLoaded) {
            const currentDateTimeUtc = new Date();
            // check if race is in the future
            const racesInFuture = Object.values(races)
                .filter((race) => {
                    const raceStartDateTimeUtc = new Date(race.raceData?.startScheduledDatetimeUtc);

                    return currentDateTimeUtc < raceStartDateTimeUtc;
                });

            // include race start time in each article
            // only if race is in the future
            return items.map((article) => {
                const raceFound = racesInFuture.find((race) => (
                    Number(race.raceData.raceId) === Number(article.customTypeData.meta_data.race)
                ));

                if (raceFound) {
                    return ({
                        ...article,
                        raceStartTime: raceFound.raceData.startScheduledDatetimeUtc,
                    });
                }
                return article;
            }) // filter all articles by raceStartTime ( future race )
                .filter((x) => x.raceStartTime)
                .sort((first, second) => (
                    // and then sort all articles by race start time
                    // @ts-ignore
                    new Date(first.raceStartTime) - new Date(second.raceStartTime)
                ));
        }

        return [];
    }, [items, races]);

    return sortedArticles.length >= minimumArticleCount && (
        <ReportsPreviewsBase
            items = {sortedArticles.slice(0, maximumArticleCount)}
            purpose = "RacePreviews"
            shouldHaveAdPlaceholders = {sortedArticles.length === minimumArticleCount}
            {...rest}
        />
    )
}
