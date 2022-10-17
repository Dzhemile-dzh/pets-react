import { FC, CSSProperties } from 'react';
import getConfig from 'next/config'
import classnames from 'classnames';
import { useSelector } from 'react-redux';
import { StateInterface } from '@components/interfaces/Store.types';

import styles from './PromoImage.module.scss';

const { publicRuntimeConfig: { cmsAssetsUrl } } = getConfig();

interface CaptionAndCreditInterface {
    caption: string;
    credit: Array<string> | [];
    isOnTopOfImage?: boolean;
}

const CaptionAndCredit: FC<CaptionAndCreditInterface> = ({
    caption,
    credit,
    isOnTopOfImage = false,
}) => (
    <div
        className = {classnames(
            styles['promo-image__caption-and-credit'],
            {
                [styles['promo-image__caption-and-credit--on-top']]: isOnTopOfImage,
            },
        )}
        data-testid = "Container__PromoImageCaptionAndCredit"
    >
        <span
            className = {styles['promo-image__caption']}
            data-testid = "Text__PromoImageCaption"
        >
            {caption}
        </span>
        {credit.length > 0 && (
            <span
                className = {styles['promo-image__credit']}
                data-testid = "Text__PromoImageCredit"
            >
                Credit: {credit.join(', ')}
            </span>
        )}
    </div>
)

interface ClassNameInterface {
    className: string;
}

interface UrlInterface extends Partial<ClassNameInterface>{
    imageId: string;
    promoImageUrl: string;
    promoImageWithRenditionUrl?: string;
    alt?: string;
}

const Url = ({
    imageId,
    promoImageUrl,
    promoImageWithRenditionUrl,
    className,
    alt,
} : UrlInterface) : JSX.Element => {
    const images = useSelector((state: StateInterface) => state.glide.images);

    const imageSrcUrl = images?.[imageId]?.imageUrl ?
        `${cmsAssetsUrl}${images?.[imageId]?.imageUrl}` :
        promoImageWithRenditionUrl ? `${cmsAssetsUrl}${promoImageWithRenditionUrl}` : promoImageUrl;

    return (
    /* eslint-disable-next-line @next/next/no-img-element */
        <img
            src = {imageSrcUrl}
            alt = {alt || 'Promo article'}
            className = {classnames(
                className,
                styles['promo-image__url'],
            )}
            data-testid = "Image__PromoImage"
        />
    )
}

interface PromoImageTitleInterface extends Partial<ClassNameInterface>{
    title: string,
}

const Title = ({ title, className }: PromoImageTitleInterface): JSX.Element => (
    <span
        className = {className}
        data-testid = "Text__PromoImageTitle"
    >
        {title}
    </span>
)

interface PromoImageInterface extends Partial<ClassNameInterface>{
    children: React.ReactChildren | React.ReactChild | JSX.Element[] | JSX.Element;
    className?: string;
    index?: number;
    style?: CSSProperties;
}

export const PromoImage : FC<PromoImageInterface>
& {
    Url: FC<UrlInterface>;
    Title: FC<PromoImageTitleInterface>;
    CaptionAndCredit: FC<CaptionAndCreditInterface>;
} = ({
    children,
    className,
    index,
    style,
} : PromoImageInterface) : JSX.Element => (
    <div
        className = {classnames(
            className,
            styles['promo-image'],
        )}
        data-testid = {`Container__${index ? `${index}__` : ''}PromoImageWrapper`}
        style = {style}
    >
        {children}
    </div>
)

PromoImage.Url = Url;
PromoImage.Title = Title;
PromoImage.CaptionAndCredit = CaptionAndCredit;
