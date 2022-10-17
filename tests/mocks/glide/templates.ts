import {
    templateNoChildrenId,
    templateErrorId,
    templateWithChildrenId,
    layoutsId1,
} from './glideItemIds';

export const templateNoChildren = {
    id: templateNoChildrenId,
    label: 'label',
    rootComponent: 'comp',
    cid: 'cid',
    type: 'template',
    error: null,
    children: [],
}

export const templateError = {
    id: templateErrorId,
    label: 'label',
    rootComponent: 'comp',
    cid: 'cid',
    type: 'template',
    error: 'error',
    children: [],
}

export const templateWithChildren = {
    id: templateWithChildrenId,
    label: 'label',
    rootComponent: 'comp',
    cid: 'cid',
    type: 'template',
    error: null,
    children: [
        {
            id: layoutsId1,
            type: 'layouts',
        },
    ],
}
