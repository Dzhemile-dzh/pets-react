import {
    createContext,
    useContext,
    useState,
    useMemo,
    useCallback,
    ReactElement,
    FC,
} from 'react'

interface AccordionContextInterface {
    isOpen: boolean;
    toggleOpen: () => void;
}

const AccordionContext = createContext<AccordionContextInterface>(null);

const useAccordionContext = () : AccordionContextInterface => {
    const context = useContext(AccordionContext);

    if (!context) {
        throw new Error(
            'AccordionContext must be used within the AccordionProvider',
        )
    }

    return context;
}

interface CommonInterface {
    children: ReactElement | ReactElement[];
}

const Title : FC<CommonInterface> = ({ children, ...rest }) => (
    <div {...rest}>
        {children}
    </div>
)

const Content : FC<CommonInterface> = ({ children, ...rest }) => (
    <div {...rest}>
        {children}
    </div>
)

interface ItemInterface extends CommonInterface {
    isOpen?: boolean;
}

const Item : FC<ItemInterface> = ({
    children,
    isOpen: userIsOpen = false,
    ...rest
}) => {
    const [isOpen, setOpen] = useState<boolean>(userIsOpen);
    const toggleOpen = useCallback(() => setOpen((prevIsOpen) => !prevIsOpen), [setOpen])

    const contextValue = useMemo(() => ({
        isOpen,
        toggleOpen,
    }), [isOpen, toggleOpen])

    return (
        <AccordionContext.Provider value = {contextValue}>
            <div {...rest}>
                {children}
            </div>
        </AccordionContext.Provider>
    )
}

const ItemHeader : FC<CommonInterface> = ({ children, ...rest }) => {
    const { toggleOpen } = useAccordionContext();
    return (
        <div onClick = {toggleOpen} {...rest}>
            {children}
        </div>
    )
}

interface ItemHeaderSmartInterface {
    children(isOpen: boolean): JSX.Element;
}

const ItemHeaderSmart : FC<ItemHeaderSmartInterface> = ({ children, ...rest }) => {
    const { isOpen, toggleOpen } = useAccordionContext();
    return (
        <div onClick = {toggleOpen} {...rest}>
            {children(isOpen)}
        </div>
    )
}

const ItemBody : FC<CommonInterface> = ({ children, ...rest }) => {
    const { isOpen } = useAccordionContext();

    if (!isOpen) return null;

    return (
        <div {...rest}>
            {children}
        </div>
    )
}

export const Accordion : FC<CommonInterface> & {
    Title: FC<CommonInterface>;
    Content: FC<CommonInterface>;
    Item: FC<CommonInterface>;
    ItemHeader: FC<CommonInterface>;
    ItemHeaderSmart: FC<ItemHeaderSmartInterface>;
    ItemBody: FC<CommonInterface>
} = ({ children, ...rest }) => (
    <div {...rest}>
        {children}
    </div>
)

Accordion.Title = Title;
Accordion.Content = Content;

Accordion.Item = Item;
Accordion.ItemHeader = ItemHeader;
Accordion.ItemHeaderSmart = ItemHeaderSmart;

Accordion.ItemBody = ItemBody;
