import { authorWithoutImageId, authorWithImageId } from './glideItemIds';

export const authorWithoutImage = {
    imageUrl: null,
    name: 'authorName',
}

export const authorWithImage = {
    imageUrl: 'imageUrl',
    name: 'authorName',
}

export const authorWithoutImageObject = {
    isLoading: false,
    data: authorWithoutImage,
}

export const authorWithImageObject = {
    isLoading: false,
    data: authorWithImage,
}

export const authors = {
    [authorWithoutImageId]: authorWithoutImageObject,
    [authorWithImageId]: authorWithImageObject,
}

export const authorLoading = {
    isLoading: true,
    data: null,
}
