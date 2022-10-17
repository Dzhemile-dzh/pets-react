export interface SilkInterface {
    silkUrl: string;
    tips?: string,
    displayTips?: boolean,
    isRunner?: boolean
}

export interface IconInterface {
    className: string;
    dataTestId: string;
}

export interface SpinnerInterface {
    className?: string;
    fill?: string;
    size?: string;
    type?: string;
}

export interface HeaderInterface {
    purpose?: string,
    headerText: string,
    headerLinkText: string,
}
