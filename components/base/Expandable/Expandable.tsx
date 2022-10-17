import {
    // TS
    ReactChild,
    ReactChildren,
    ReactNode,
    // React
    Children,
    useContext,
    createContext,
    useState,
    useMemo,
    useCallback,
    useEffect,
} from 'react';

interface ExpandableContextInterface {
    isExpanded: boolean;
    toggleIsExpanded: () => void;
    canExpand: boolean;
    setCanExpand: (canExpand :boolean) => void;
}

const ExpandableContext = createContext<Partial<ExpandableContextInterface>>(null);

const useExpandableContext = () => {
    const context = useContext(ExpandableContext);

    if (!context) {
        throw new Error(
            'ExpandableContext must be used within the ExpandableProvider',
        )
    }

    return context;
}

interface ExpandablesChildrenInterface {
    children: ReactChild | ReactChild[] | ReactChildren | ReactChildren[] | ReactNode | ReactNode[];
    className?: string;
}

interface ExpandableInterface extends ExpandablesChildrenInterface {
    onToggleExpand?: (isExpanded : boolean) => void;
    isExpanded?: boolean;
}

export const Expandable = ({
    children,
    onToggleExpand,
    isExpanded: userIsExpanded = false,
    ...rest
} : ExpandableInterface) : React.ReactElement => {
    const [isExpanded, setIsExpanded] = useState(userIsExpanded);
    const [canExpand, setCanExpand] = useState(true);

    const toggleIsExpanded = useCallback(() => setIsExpanded((prev) => !prev), [])

    useEffect(() => {
        onToggleExpand && onToggleExpand(isExpanded)
    }, [isExpanded, onToggleExpand])

    const contextValue = useMemo(() => ({
        isExpanded,
        toggleIsExpanded,
        canExpand,
        setCanExpand,
    }), [canExpand, isExpanded, toggleIsExpanded])

    return (
        <ExpandableContext.Provider value = {contextValue}>
            <div {...rest}>
                {children}
            </div>
        </ExpandableContext.Provider>
    )
}

interface ExpandableContentInterface extends ExpandablesChildrenInterface {
    collapsedChildrenLimit?: number;
}

const Content = ({
    children,
    collapsedChildrenLimit,
    className,
} : ExpandableContentInterface) => {
    const { isExpanded, setCanExpand } = useExpandableContext();

    useEffect(() => {
        setCanExpand(Children.count(children) > collapsedChildrenLimit)
    }, [children, collapsedChildrenLimit, setCanExpand])

    const childrenToDisplay = useMemo(() => {
        return isExpanded ? children : Children.toArray(children).slice(0, collapsedChildrenLimit);
    }, [children, collapsedChildrenLimit, isExpanded])

    return (
        <div className = {className}>
            {childrenToDisplay}
        </div>
    )
}

const ExpandButton = ({
    children,
} : ExpandablesChildrenInterface) => {
    const { isExpanded, toggleIsExpanded, canExpand } = useExpandableContext();
    if (!isExpanded || !canExpand) return null;

    return (
        <div onClick = {toggleIsExpanded}>
            {children}
        </div>
    )
}

const CollapseButton = ({
    children,
} : ExpandablesChildrenInterface) => {
    const { isExpanded, toggleIsExpanded, canExpand } = useExpandableContext();
    if (isExpanded || !canExpand) return null;

    return (
        <div onClick = {toggleIsExpanded}>
            {children}
        </div>
    )
}

Expandable.Content = Content;
Expandable.ExpandButton = ExpandButton;
Expandable.CollapseButton = CollapseButton;
