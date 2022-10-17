/* eslint-disable max-len */
import { getCollectionQueryParams } from './utils';

const testData = [
    {
        args: {
            collectionType: '10Articles',
            sourceTaxonomy: 497,
            manuallyInsertedArticles: [{ article: 480, position: '1' }, { article: 192, position: '2' }],
        },
        expected: {
            queryParams: 'filter={"include":{"taxonomies":[497]},"exclude":{"id":[]}}&sort={"updated_at":"desc"}&page_size=8&content={"expand":{"all":{}}}',
            queryParamsManualArticles: 'filter={"include":{"id":[480,192]}}&content={"expand":{"all":{}}}',
        },
    }, {
        args: {
            collectionType: 'previews',
            sourceTaxonomy: 226,
            manualCollectionArticleIdsToExclude: [1, 2, 3],
        },
        expected: {
            queryParams: 'filter={"include":{"taxonomies":[226]},"exclude":{"id":[1,2,3]}}&sort={"published_at":"desc"}&page_size=3&content={"expand":{"all":{}}}',
            queryParamsManualArticles: '',
        },
    }, {
        args: {
            collectionType: 'reports',
            sourceTaxonomy: 229,
            manualCollectionArticleIdsToExclude: [1, 2, 3],
        },
        expected: {
            queryParams: 'filter={"include":{"taxonomies":[229]},"exclude":{"id":[1,2,3]}}&sort={"published_at":"desc"}&page_size=3&content={"expand":{"all":{}}}',
            queryParamsManualArticles: '',
        },
    }, {
        args: {
            collectionType: '4Articles',
            sourceTaxonomy: 501,
            manualCollectionArticleIdsToExclude: [1, 2, 3],
        },
        expected: {
            queryParams: 'filter={"include":{"taxonomies":[501]},"exclude":{"id":[1,2,3]}}&sort={"updated_at":"desc"}&page_size=4&content={"expand":{"all":{}}}',
            queryParamsManualArticles: '',
        },
    },
];

describe('taxonomy collection utils', () => {
    it('should correctly transform arguments into query parameters strings', () => {
        testData.forEach(({ args, expected }) => {
            const result = getCollectionQueryParams(args);

            expect(result).toStrictEqual(expected);
        });
    });
});
