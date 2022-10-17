import {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
    useRef,
    MutableRefObject,
    ReactElement,
    FC,
    HTMLAttributes,
} from 'react'

import useEffectAfterMount from '@components/custom-hooks/useEffectAfterMount';
import useEffectOnce from '@components/custom-hooks/useEffectOnce';

interface SlideToggleContextInterface {
    setActive: (ref: MutableRefObject<unknown>) => void;
    selectValue: (ref: MutableRefObject<unknown>, userValue: unknown) => void;
    active: MutableRefObject<unknown>;
}

const SlideToggleContext = createContext<SlideToggleContextInterface>(null);

const useSlideToggleContext = () : SlideToggleContextInterface => {
    const context = useContext(SlideToggleContext);

    if (!context) {
        throw new Error(
            'SlideToggleContext must be used within the SlideToggleProvider',
        )
    }

    return context;
}
interface ButtonInterface extends HTMLAttributes<HTMLDivElement> {
    isActive?: boolean;
    value?: unknown;
    children(isButtonActive: boolean): JSX.Element;
}

const Button : FC<ButtonInterface> = ({
    children,
    isActive,
    value: userValue,
    ...rest
}) => {
    const buttonRef = useRef();

    const { active, selectValue } = useSlideToggleContext();

    const isButtonActive = buttonRef === active;

    useEffectOnce(() => {
        if (!active && isActive) {
            selectValue(buttonRef, userValue)
        }
    })

    return (
        <button
            ref = {buttonRef}
            onClick = {() => selectValue(buttonRef, userValue)}
            {...rest as unknown}
            type = "button"
        >
            {children(isButtonActive)}
        </button>
    )
}

interface SlideToggleInterface extends HTMLAttributes<HTMLDivElement> {
    children: ReactElement | ReactElement[];
    onChange?: (selectedValue: unknown) => void;
}

export const SlideToggle : FC<SlideToggleInterface> & {
    Button: FC<ButtonInterface>;
} = ({
    children,
    // eslint-disable-next-line @typescript-eslint/no-empty-function
    onChange = () => {},
    ...rest
}) => {
    const [active, setActive] = useState<MutableRefObject<unknown> | undefined>();
    const [userValue, setUserValue] = useState();

    const selectValue = useCallback((ref, value) => {
        setActive(ref)
        setUserValue(value)
    }, [])

    const contextValue = useMemo(() => ({
        active,
        selectValue,
        setActive,
    }), [active, selectValue])

    useEffectAfterMount(() => {
        onChange(userValue);
    }, [onChange, userValue])

    return (
        <SlideToggleContext.Provider value = {contextValue}>
            <div {...rest}>
                {children}
            </div>
        </SlideToggleContext.Provider>
    )
}

SlideToggle.Button = Button;
