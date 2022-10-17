/* eslint-disable max-len */
import React from 'react';
import { screen, render } from '@testing-library/react'
import * as redux from 'react-redux';

import { ContainerFactory } from './ContainerFactory';
import { imageId1Data, articleBody2 } from '../../../../../tests/mocks';

describe('ContainerFactory', () => {
    beforeAll(() => {
        jest.spyOn(redux, 'useSelector')
        // Mock for useSelector in PromoImage
            .mockReturnValueOnce(imageId1Data)
    })

    it('should render component correctly with p tag', () => {
        render(<ContainerFactory index = {0} {...articleBody2.items[0]} />)

        expect(screen.getByTestId('Text__0__GlideArticleBody')).toBeInTheDocument();
    });

    it('should render component correctly with h1 tag', () => {
        render(<ContainerFactory index = {1} {...articleBody2.items[0]} />)

        expect(screen.getByTestId('Text__1__GlideArticleBody')).toBeInTheDocument();
    });

    it('should render component correctly with h2 tag', () => {
        render(<ContainerFactory index = {2} {...articleBody2.items[2]} />)

        expect(screen.getByTestId('Text__2__GlideArticleBody')).toBeInTheDocument();
    });

    it('should render component correctly with h3 tag', () => {
        render(<ContainerFactory index = {3} {...articleBody2.items[3]} />)

        expect(screen.getByTestId('Text__3__GlideArticleBody')).toBeInTheDocument();
    });

    it('should render component correctly with h4 tag', () => {
        render(<ContainerFactory index = {4} {...articleBody2.items[4]} />)

        expect(screen.getByTestId('Text__4__GlideArticleBody')).toBeInTheDocument();
    });

    it('should render component correctly with h5 tag', () => {
        render(<ContainerFactory index = {5} {...articleBody2.items[5]} />)

        expect(screen.getByTestId('Text__5__GlideArticleBody')).toBeInTheDocument();
    });

    it('should render component correctly with span tag', () => {
        render(<ContainerFactory index = {6} {...articleBody2.items[6]} />)

        expect(screen.getByTestId('Text__6__GlideArticleBody')).toBeInTheDocument();
    });

    it('should render component correctly with ul tag with li nested inside', () => {
        render(<ContainerFactory index = {7} {...articleBody2.items[7]} />)

        expect(screen.getByTestId('Text__7__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Text__71__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Text__72__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Text__73__GlideArticleBody')).toBeInTheDocument();
    });

    it('should render component correctly with ol tag with li nested inside', () => {
        render(<ContainerFactory index = {8} {...articleBody2.items[8]} />)

        expect(screen.getByTestId('Text__8__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Text__81__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Text__82__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Text__83__GlideArticleBody')).toBeInTheDocument();
    });

    it('should render component correctly Blockquote component and section tag with div nested inside', () => {
        render(<ContainerFactory index = {9} {...articleBody2.items[9]} />)

        expect(screen.getByTestId('Container__ArticleQuote')).toBeInTheDocument();
        expect(screen.getByTestId('Text__ArticleQuoteAttribution')).toBeInTheDocument();
        expect(screen.getByTestId('Text__ArticleQuoteRole')).toBeInTheDocument();
        expect(screen.getByTestId('Text__9__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Container__91__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Text__911__GlideArticleBody')).toBeInTheDocument();
    });

    it('should render component correctly with p tag with span, sub, sup nested inside', () => {
        render(<ContainerFactory index = {10} {...articleBody2.items[10]} />)

        expect(screen.getByTestId('Text__10__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Text__101__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Text__102__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Text__103__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Text__104__GlideArticleBody')).toBeInTheDocument();
    });

    it('should render component correctly with div tag and img tag inside it', () => {
        render(<ContainerFactory index = {11} {...articleBody2.items[11]} />)

        expect(screen.getByTestId('Container__11__GlideArticleBody')).toBeInTheDocument();
        expect(screen.getByTestId('Container__111__PromoImageWrapper')).toBeInTheDocument();
    });
});
