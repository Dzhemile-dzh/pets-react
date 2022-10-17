import HybridLink from '@components/base/HybridLink';

interface HybridConditionalLinkInterface {
    condition?: boolean;
    hybridUrl?: string;
    url?: string;
    openInNewTab?: boolean;
    children: JSX.Element;
}

export const HybridConditionalLink = ({
    children,
    condition = false,
    hybridUrl = null,
    url = null,
    openInNewTab = false,
} : HybridConditionalLinkInterface) : JSX.Element => {
    if (condition) {
        return (

            <HybridLink
                hybridUrl = {hybridUrl}
                url = {url}
                isConditionalLink = {condition}
                openInNewTab = {openInNewTab}
            >
                {children}
            </HybridLink>
        )
    }

    return children;
}
