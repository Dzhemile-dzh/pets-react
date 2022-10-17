import dynamic from 'next/dynamic'
import { useSelector } from 'react-redux';
import { StateInterface } from '@components/interfaces';

const Collection = dynamic(() => import('../Collection'))
const TaxonomyCollection = dynamic(() => import('../TaxonomyCollection'))

interface WidgetInterface {
    id: string | number
}

export function Widget({ id } : WidgetInterface) : JSX.Element {
    const data = useSelector((state: StateInterface) => state.glide.widgets[id]);

    return (
        <>
            {
                data.configuration.collection && (
                    <Collection id = {data.configuration.collection} />
                )
            }
            {
                data.configuration.source_taxonomy && (
                    <TaxonomyCollection configuration = {data.configuration} />
                )
            }
        </>
    )
}
