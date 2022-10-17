import { FC, memo } from 'react';
import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';
import { StateInterface } from '@components/interfaces';

const Template = dynamic(() => import('./components/Template'))

interface GlideContentInterface {
    path: string;
}

export const GlideContent : FC<GlideContentInterface> = memo(({
    path,
}) => {
    const isInitialized = useSelector((state: StateInterface) => state.glide.isInitialized);

    const template = useSelector((state: StateInterface) => {
        const {
            glide: {
                templates,
                routes,
                pages,
            },
        } = state;

        const route = routes[path]

        if (!route) return;

        const page = pages[routes[path].page_id];

        return templates[page.template_id];
    });

    return (
        (isInitialized && template && !template.error) ? <Template template = {template} /> : null
    )
})

GlideContent.displayName = 'GlideContent';
