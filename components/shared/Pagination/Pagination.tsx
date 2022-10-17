import {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
    Children,
    useEffect,
    FC,
    HTMLAttributes,
} from 'react'

interface PaginationContextInterface {
    offset: number;
    handleNextPagination: () => void;
    handlePrevPagination: () => void;
    shouldShowNext: boolean;
    shouldShowPrev: boolean;
    setShouldShowNext: (value: boolean) => void;
    setShouldShowPrev: (value: boolean) => void;
    userPageSize: number;
}

const PaginationContext = createContext<PaginationContextInterface>(null);

const usePaginationContext = () : PaginationContextInterface => {
    const context = useContext(PaginationContext);

    if (!context) {
        throw new Error(
            'PaginationContext must be used within the PaginationProvider',
        )
    }

    return context;
}

interface PaginationInterface extends HTMLAttributes<HTMLDivElement> {
    pageSize?: number;
    offset?: number;
}

const PrevButton : FC<HTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
    const { shouldShowPrev, handlePrevPagination } = usePaginationContext();

    if (!shouldShowPrev) return null;

    return (<button type = "button" onClick = {handlePrevPagination} {...rest}>{children}</button>)
}

const NextButton : FC<HTMLAttributes<HTMLButtonElement>> = ({ children, ...rest }) => {
    const { shouldShowNext, handleNextPagination } = usePaginationContext();

    if (!shouldShowNext) return null;

    return (<button type = "button" onClick = {handleNextPagination} {...rest}>{children}</button>)
}

const Content : FC<HTMLAttributes<HTMLDivElement>> = ({ children, ...rest }) => {
    const {
        offset,
        setShouldShowNext,
        setShouldShowPrev,
        userPageSize,
        shouldShowNext,
        shouldShowPrev,
    } = usePaginationContext();

    useEffect(() => {
        const value = Children.count(children) > offset + userPageSize;

        if (value !== shouldShowNext) {
            setShouldShowNext(value)
        }
    }, [children, offset, setShouldShowNext, shouldShowNext, userPageSize])

    useEffect(() => {
        const value = offset > 0;

        if (value !== shouldShowPrev) {
            setShouldShowPrev(value)
        }
    }, [offset, setShouldShowPrev, shouldShowNext, shouldShowPrev])

    return <div {...rest}>{Children.toArray(children).slice(offset, offset + userPageSize)}</div>
}

const PAGE_SIZE = 5;
export const Pagination : FC<PaginationInterface> & {
    PrevButton: FC<HTMLAttributes<HTMLButtonElement>>;
    NextButton: FC<HTMLAttributes<HTMLButtonElement>>;
    Content: FC<HTMLAttributes<HTMLDivElement>>;
} = ({
    children,
    pageSize: userPageSize = PAGE_SIZE,
    offset: userOffset = 0,
    ...rest
}) => {
    const [offset, setOffset] = useState(userOffset);
    const [shouldShowNext, setShouldShowNext] = useState(false);
    const [shouldShowPrev, setShouldShowPrev] = useState(false);

    const handleNextPagination = useCallback(() => setOffset((prev) => prev + 1), []);
    const handlePrevPagination = useCallback(() => setOffset((prev) => prev - 1), []);

    const contextValue = useMemo(
        () => ({
            offset,
            handleNextPagination,
            handlePrevPagination,
            shouldShowNext,
            shouldShowPrev,
            setShouldShowNext,
            setShouldShowPrev,
            userPageSize,
        }),
        [
            handleNextPagination,
            handlePrevPagination,
            offset,
            shouldShowNext,
            shouldShowPrev,
            userPageSize,
        ],
    )

    return (
        <PaginationContext.Provider value = {contextValue}>
            <div {...rest}>
                {children}
            </div>
        </PaginationContext.Provider>
    )
}

Pagination.PrevButton = PrevButton;
Pagination.NextButton = NextButton;
Pagination.Content = Content;
