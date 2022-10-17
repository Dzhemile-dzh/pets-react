import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';

import { GlideItemChildrenInterface, StateInterface } from '../../../interfaces';

import styles from './Layout.module.scss';

const Widget = dynamic(() => import('../Widget'))

interface LayoutInterface {
    id: string | number
}

export function Layout({ id } : LayoutInterface) : JSX.Element {
    const { children } = useSelector((state: StateInterface) => state.glide.layouts[id]);

    return (
        <div className = {styles['layout--fullwidth']}>
            {
                children.map((child : GlideItemChildrenInterface) => {
                    if (child.type === 'layouts') {
                        return (<Layout key = {child.id} id = {child.id} />)
                    }

                    if (child.type === 'widgets') {
                        return (<Widget key = {child.id} id = {child.id} />)
                    }

                    // in case of unhandled child types
                    return null;
                })
            }
        </div>
    )
}
