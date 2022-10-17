export interface FieldProps {
    type: string,
    name: string,
    placeholder?: string,
    className?: string,
    defaultValue?: string,
    onFocus?: () => void,
    onClick?: () => void,
    icon?: React.ReactElement,
    onChange?: (name :string, value: string | boolean)=> void,
    value?: string,
    label?: string,
}
