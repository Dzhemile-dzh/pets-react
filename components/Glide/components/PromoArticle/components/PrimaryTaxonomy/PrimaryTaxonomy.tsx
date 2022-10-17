import React from 'react';
import classnames from 'classnames';
import Image from 'next/image'
import styles from './PrimaryTaxonomy.module.scss';

interface NameInterface {
    name: string;
    className?: string;
}

const Name = ({ name, className } : NameInterface) : JSX.Element => (
    <span
        className = {classnames(className, styles['primary-taxonomy__name'])}
        data-testid = "Text__PrimaryTaxonomyName"
    >
        {name}
    </span>
)

interface DelimiterInterface {
    isWhite?: boolean;
}

const Delimiter = ({ isWhite } : DelimiterInterface) : JSX.Element => (
    <div
        className = {classnames(
            styles['primary-taxonomy__delimiter'],
            {
                [styles['primary-taxonomy__delimiter--white']]: isWhite,
            },
        )}
        data-testid = "Text__PrimaryTaxonomyDelimiter"
    />
)

interface TimeInterface {
    time: string;
    isDefaultIcon?: boolean;
}

const Time = ({ time, isDefaultIcon = true } : TimeInterface)
: JSX.Element => (
    <div
        className = {styles['primary-taxonomy__last-updated-wrapper']}
        data-testid = "Container__TimeWrapper"
    >
        <div
            className = {styles['primary-taxonomy__last-updated-icon']}
            data-testid = "Container__LastUpdatedIcon"
        >
            <Image
                src = {`/svgs/time_solid_${isDefaultIcon ? 'dark_grey' : 'white'}.svg`}
                width = {18}
                height = {18}
            />
        </div>
        <span
            className = {styles['primary-taxonomy__last-updated-time']}
            data-testid = "Text__Time"
        >
            {time}
        </span>
    </div>
)

interface PrimaryTaxonomyInterface {
    children: React.ReactChildren | React.ReactChild | JSX.Element[] | JSX.Element;
    className?: string;
}

export const PrimaryTaxonomy : React.FunctionComponent<PrimaryTaxonomyInterface>
& {
    Name: React.FunctionComponent<NameInterface>;
    Delimiter: React.FunctionComponent<DelimiterInterface>;
    Time: React.FunctionComponent<TimeInterface>;
} = ({ children, className } : PrimaryTaxonomyInterface) => (
    <div
        className = {classnames(className, styles['primary-taxonomy'])}
        data-testid = "Container__PrimaryTaxonomy"
    >
        {children}
    </div>
)

PrimaryTaxonomy.Name = Name;
PrimaryTaxonomy.Delimiter = Delimiter;
PrimaryTaxonomy.Time = Time;
