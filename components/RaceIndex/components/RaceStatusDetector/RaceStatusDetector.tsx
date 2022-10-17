/* eslint-disable @typescript-eslint/no-empty-function */
import useEffectAfterMount from '@components/custom-hooks/useEffectAfterMount'

export const RaceStatusDetector = ({
    children,
    races,
    onAllResultsChange = () => {},
    isLoaded,
}) => {
    useEffectAfterMount(() => {
        // in case it is loaded and we don't have races for today
        if ((isLoaded || races.length > 0) && races.every((race) => race.status === 'result')) {
            onAllResultsChange()
        }
    }, [onAllResultsChange, races])

    return children
}
