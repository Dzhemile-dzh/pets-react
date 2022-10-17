import { MultipleBetItemSelection } from '../MultipleItem.types';

export interface MultipleItemSelectionInterface {
    multipleBetItemSelections: MultipleBetItemSelection[];
    isSelectionEditable?: boolean;
    betTypeName: string;
    numberLines: number;
    includedInMultipleSelections?: Record<string, boolean>;
    className?: string;
    id?: string;
    result?: string;
    eventName?: string;
}
