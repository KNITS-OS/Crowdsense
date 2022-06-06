import { FormGroup, Input, InputProps } from "reactstrap";
import { OptionType } from "../../types/types";
import React from "react";

interface IProps extends InputProps {
    id: string;
    label: string;
    options: OptionType[];
    defaultOption: string,
    errorText?: string
}

const FormSelectField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, IProps>(
    ({
         id,
         label,
         options,
         defaultOption,
         errorText,
         ...props
     }, ref) => {
        return (
            <FormGroup>
                <label className="form-control-label" htmlFor={id}>
                    {label}
                </label>
                <Input
                    id={id}
                    innerRef={ref}
                    type="select"
                    defaultValue='DEFAULT'
                    {...props}
                >
                    <option hidden disabled value="DEFAULT"> -- {defaultOption} --</option>
                    {options.map(option => (
                        <option style={{ fontSize: "1rem" }} value={option.value}
                                key={option.value}>{option.label}</option>
                    ))}
                </Input>
                {errorText && <div className="invalid-feedback">{errorText}</div>}
            </FormGroup>
        )
    }
)

export default FormSelectField;