export interface ArticlePosition {
    article: number;
    position: string;
}

export interface GlideConfigurationInterface {
    collection?: number;
    source_taxonomy?: number;
    collection_header?: string;
    article_positions?: ArticlePosition[] | [];
    section_link_text?: string;
    presentation_type?: string;
}

export interface GlideItemChildrenInterface {
    id: string | number;
    type: string;
}

export interface TemplateInterface {
    id: number;
    label: string;
    rootComponent: string;
    cid: string;
    type: string;
    error: string | null;
    children: GlideItemChildrenInterface[] | [];
}

export interface LayoutInterface {
    id: string;
    label: string;
    type: string;
    configuration: GlideConfigurationInterface;
    children: GlideItemChildrenInterface[] | [];
}

export interface WidgetInterface {
    id: string;
    label: string;
    type: string;
    configuration: GlideConfigurationInterface;
    children: GlideItemChildrenInterface[] | [];
}

export interface CollectionsWidgetInterface {
    widgets: Array<{
        id: string;
        configuration: Record<string, GlideConfigurationInterface>
    }> | []
}

export interface SocialSharingItemInterface {
    is_enabled: boolean;
    image: {
        url: string;
    };
    description: string;
    title: string;
    message: string;
}

export interface TaxonomyInterface {
    id: number;
    parent_id: number;
    account_id: number;
    name: string;
    slug: string;
    position: number;
    is_section_page: boolean;
    short_description: string;
    intro_text: string;
    cid: string;
    type: string;
    seo_data: {
        page_title: string;
        meta_description: string;
    };
    additional_items: {
        color: string;
        custom_taxonomy_configuration: {
            meta_data: Record<string, string>;
        };
    };
}

export interface CollectionInterface extends CollectionsWidgetInterface {
    collectionDesktopLayoutType: string;
    description: string;
    type: string;
    collectionTypeId: number;
    name: string;
    id: number;
    seo: {
        is_automatic_seo: boolean;
        keywords: string[];
        description: string;
        title: string;
        slug: string;
    };
    children: GlideItemChildrenInterface[] | [];
    taxonomies: TaxonomyInterface[] | [];
    socialSharing: Record<string, SocialSharingItemInterface>
    authors: number[];
    headerText?: string;
    headerLinkText?: string;
}

export interface PromoDetailsInterface {
    image_id: string;
    image_url: string;
    promo_title: string;
    promo_sub_title?: string;
    standfirst: string;
}

export interface PromoArticleInterface extends ArticleInterface {
    isBigRace?: boolean;
    isVideoArticle?: boolean;
    raceStartTime?: string;
}

export interface CollectionObjectInterface {
    isLoading: boolean;
    data: CollectionInterface;
}

export interface AuthorInterface {
    id: number;
    name: string;
    imageId?: string;
    imageUrl?: string;
}

export interface AuthorObjectInterface {
    isLoading: boolean;
    data: AuthorInterface;
}

export interface TaxonomyCollectionInterface {
    children: GlideItemChildrenInterface[] | [];
}

export interface TaxonomyCollectionObjectInterface {
    isLoading: boolean;
    data: TaxonomyCollectionInterface
}

export interface TaxonomyCollectionBodyInterface {
    items: Array<PromoArticleInterface>;
    minimumArticleCount?: number;
    maximumArticleCount?: number;
    shouldHaveAdPlaceholders?: boolean;
}

export interface ArticleInterface {
    id: number;
    type: string;
    position: number;
    shortStandfirst: string;
    shortHeadline: string;
    path: string;
    promoImageUrl: string;
    promoImageWithRenditionUrl: string | null;
    catchline: string;
    headline: string;
    promoDetails: PromoDetailsInterface;
    taxonomies: TaxonomyInterface[] | [];
    authors: number[];
    customData: {
        meta_data: Record<string, string>;
    };
    customTypeData: {
        meta_data: Record<string, string>;
    };
    primaryTaxonomy?: TaxonomyInterface;
    seo: {
        keywords: string[];
        author: string;
        description: string;
        title: string;
        automatic_seo: boolean;
        url: string;
    };
    articleType: {
        name: string;
        id: number;
    };
    socialSharing: Record<string, SocialSharingItemInterface>;
    updatedAt: string;
    publishedAt: string;
    isAuthorHavingImage: boolean;
    shouldHideAuthorsImage: boolean;
    shouldHideAuthorsDetails: boolean;
    standfirst: string;
}

export interface ArticleObjectInterface {
    isLoading: boolean;
    data: ArticleInterface;
}

export interface MenuItemInterface {
    children: [] | Array<MenuItemInterface>
    id: number;
    label: string;
    menuId: number;
    menuItemId: string;
    parentMenuItemId?: string;
    position: number;
    published: boolean;
    url: string;
}

export type MenusType = Record<string, Array<MenuItemInterface>>

export interface MenuInterface {
    isLoading: boolean;
    data: Array<MenuItemInterface>;
}

export interface GlideImagesObjectInterface {
    id: string;
    imageUrl: string;
}

export interface GlideContentInterface {
    layouts: Record<string, LayoutInterface>;
    widgets: Record<string, WidgetInterface>;
    collections: Record<number, CollectionObjectInterface>;
    promoArticles: Record<number, PromoArticleInterface>;
    images: Record<string, GlideImagesObjectInterface>;
    authors: Record<number, AuthorObjectInterface>;
    taxonomyCollections: Record<string, TaxonomyCollectionObjectInterface>;
    articles: Record<number, ArticleObjectInterface>;
    articleTypes: Record<string, number>;
}

export interface GlideProviderWrapperInterface {
    path: string;
}

export interface ManualInserterArticle {
    article: number;
    position: string;
}

export interface getGlideTaxonomyCollectionInputInterface {
    collectionName: string;
    articleTypeId?: number;
    queryParams: string;
    queryParamsManualArticles: string;
    manuallyInsertedArticles?: ManualInserterArticle[];
    maximumArticleCount: number;
    shouldArticlesIncludeRaces?: boolean;
}
