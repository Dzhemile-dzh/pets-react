import {
    FC, ReactChild, ReactChildren, ReactElement,
} from 'react'
import Link from 'next/link';
import Image from 'next/image';
import { PartialLogoIcon } from '@components/base/Icons/PartialLogoIcon';

import { useStyles, StylesInteface } from '../useStyles';

import styles from './Header.module.scss';

interface TextInterface {
    text: string;
}

interface ChildrenInterface {
    children: ReactChild | ReactChildren | ReactElement | ReactElement[];
}

interface PurposeInterface {
    purpose?: string;
}

interface UrlInterface extends TextInterface {
    url: string;
}

interface HeaderInterface extends ChildrenInterface, StylesInteface, PurposeInterface {}

export const Header : FC<HeaderInterface> = ({
    children,
    purpose,
    ...rest
}) => (
    <div
        data-testid = {`Container__${purpose}Header`}
        className = {useStyles({ ...rest, className: styles.header })}
    >
        {children}
    </div>
)

export const Title : FC<TextInterface> = ({ text }) => (
    <span className = {styles.header__title}>{text}</span>
)

export const IconTitle : FC<TextInterface> = ({ text }) => (
    <div className = {styles['header__icon-title']}>
        <div className = {styles['header__icon-container']}>
            <PartialLogoIcon />
        </div>
        <span className = {styles['header__icon-title-text']}>{text}</span>
    </div>
)

export const ChevronLink : FC<UrlInterface> = ({ url, text }) => (
    <Link href = {url}>
        <a className = {styles.header__link}>
            <span className = {styles['header__link-text']}>
                {text}
            </span>
            {' '}
            <div className = {styles['header__link-icon']}>
                <Image
                    src = "/svgs/chevron_right_red.svg"
                    width = {9}
                    height = {9}
                />
            </div>
        </a>
    </Link>
)

export const LeftSideContent : FC<ChildrenInterface> = ({ children }) => (
    <div className = {styles['header__left-side']}>
        {children}
    </div>
)

export const RightSideContent : FC<ChildrenInterface> = ({ children }) => (
    <div className = {styles['header__right-side']}>
        {children}
    </div>
)

export const HybridChevronLink : FC<UrlInterface> = ({ url, text }) => (
    <a href = {url} className = {styles.header__link}>
        <span className = {styles['header__link-text']}>
            {text}
        </span>
        {' '}
        <div className = {styles['header__link-icon']}>
            <Image
                src = "/svgs/chevron_right_red.svg"
                width = {9}
                height = {9}
            />
        </div>
    </a>
)
