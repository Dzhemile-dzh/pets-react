import * as redux from 'react-redux';
import ShallowRenderer from 'react-test-renderer/shallow';
import { races, offers } from '../../../../tests/mocks/latestRaces';
import * as hooks from '../../../contexts/BreakPointContext';

import LatestRaces from './index';

describe('Latest Races', () => {
    test('Latest races shows 4 races', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(offers)
            .mockReturnValueOnce({})

        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isLargeDesktop: false,
        }));

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        const renderer = new ShallowRenderer();
        renderer.render(<LatestRaces races = {races} />);
        const result = renderer.getRenderOutput();

        expect(result.props.children).toHaveLength(4);
    })

    test('Latest races shows 5 races on large desktop', () => {
        jest.spyOn(redux, 'useSelector')
            .mockReturnValueOnce(offers)
            .mockReturnValueOnce({})

        jest.spyOn(hooks, 'useBreakPoint').mockImplementation(() => ({
            isLargeDesktop: true,
        }));

        const useDispatchSpy = jest.spyOn(redux, 'useDispatch');
        const mockDispatchFn = jest.fn()
        useDispatchSpy.mockReturnValue(mockDispatchFn);

        const renderer = new ShallowRenderer();
        renderer.render(<LatestRaces races = {races} />);
        const result = renderer.getRenderOutput();

        expect(result.props.children).toHaveLength(5);
    })
})
