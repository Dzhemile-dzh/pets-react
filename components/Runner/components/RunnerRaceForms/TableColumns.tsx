import Image from 'next/image';
import { PlayIcon } from '../../../base/Icons/PlayIcon';
import styles from './RunnerRaceForms.module.scss';

export const playColumn = {
    className: styles['runner-race-forms__column-play'],
    headings: [''],
    accessibilityText: 'Race video replay',
};

export const playColumnContent = {
    className: styles['runner-race-forms__column-play'],
    icon: () : React.ReactElement => (
        <PlayIcon
            color = "primary"
            size = "large"
        />
    ),
};

const IconElement = (): React.ReactElement => (
    <Image
        src = "/svgs/info_solid.svg"
        width = {16}
        height = {16}
    />
);

export const ratingColumns = [
    {
        className: styles['runner-race-forms__column-or'],
        headings: ['OR'],
        accessibilityText: 'Official rating',
        icon: IconElement,
    },
    {
        className: styles['runner-race-forms__column-ts'],
        headings: ['TS'],
        accessibilityText: 'Top Speed',
        icon: IconElement,
    },
    {
        className: styles['runner-race-forms__column-rpr'],
        headings: ['RPR'],
        accessibilityText: 'Racing Post Rating',
        icon: IconElement,
    },
    {
        className: styles['runner-race-forms__column-sp'],
        headings: ['SP'],
        accessibilityText: 'Starting Prize',
        icon: IconElement,
    },
];

export const mobileColumns = [
    {
        className: styles['runner-race-forms__column-1'],
        headings: ['DATE', 'COURSE'],
        accessibilityText: 'date and course',
    },
    {
        className: styles['runner-race-forms__column-2'],
        headings: ['CLASS', 'DISTANCE'],
        accessibilityText: 'class and distance',
    },
    {
        className: styles['runner-race-forms__column-3'],
        headings: ['GOING', 'POSITION'],
        accessibilityText: 'going and position',
    },
];

export const tabletColumns = [
    playColumn,
    {
        className: styles['runner-race-forms__column-1'],
        headings: ['DATE', 'COURSE'],
        accessibilityText: 'date and course',
    },
    {
        className: styles['runner-race-forms__column-2'],
        headings: ['TYPE', 'CLASS'],
        accessibilityText: 'type and class',
    },
    {
        className: styles['runner-race-forms__column-3'],
        headings: ['DISTANCE', 'GOING'],
        accessibilityText: 'distance and going',
    },
    {
        className: styles['runner-race-forms__column-4'],
        headings: ['WEIGHT', 'POSITION'],
        accessibilityText: 'weight and position',
    },
    ...ratingColumns,
];

export const desktopColumns = [
    playColumn,
    {
        className: styles['runner-race-forms__column-1'],
        headings: ['DATE'],
    },
    {
        className: styles['runner-race-forms__column-2'],
        headings: ['COURSE'],
    },
    {
        className: styles['runner-race-forms__column-3'],
        headings: ['TYPE'],
    },
    {
        className: styles['runner-race-forms__column-4'],
        headings: ['CL.'],
    },
    {
        className: styles['runner-race-forms__column-5'],
        headings: ['DIST.'],
        accessibilityText: 'distance',
    },
    {
        className: styles['runner-race-forms__column-6'],
        headings: ['GOING'],
    },
    {
        className: styles['runner-race-forms__column-7'],
        headings: ['WGT.'],
    },
    {
        className: styles['runner-race-forms__column-8'],
        headings: ['PO.'],
    },
    {
        className: styles['runner-race-forms__column-winner'],
        headings: ['WINNER (LENGTHS)'],
    },
    ...ratingColumns,
];
