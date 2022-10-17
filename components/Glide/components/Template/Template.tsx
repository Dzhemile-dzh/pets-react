import { FC } from 'react'
import dynamic from 'next/dynamic'

import { useBreakPoint } from '../../../contexts/BreakPointContext';
import { TemplateInterface, GlideItemChildrenInterface } from '../../../interfaces';
import Header from './components/Header';

import styles from './Template.module.scss';

const Layout = dynamic(() => import('../Layout'))
const Widget = dynamic(() => import('../Widget'))

export const Template : FC<{ template: TemplateInterface; }> = ({ template }) => {
    const { isMobile } = useBreakPoint();
    return (
        !template.error && (
            <div className = {styles.template} data-testid = "Container__GlideTemplate">
                {
                    isMobile && <Header />
                }
                {
                    template.children.map((child : GlideItemChildrenInterface) => {
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
    )
}
