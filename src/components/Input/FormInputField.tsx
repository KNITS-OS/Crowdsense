import React from "react";
import { FormGroup, Input, InputProps } from "reactstrap";

interface IProps extends InputProps {
    id: string;
    label: string;
    errorText?: string
}

const FormInputField = React.forwardRef<HTMLInputElement | HTMLTextAreaElement, IProps>(
    ({
         id,
         label,
         errorText,
         ...props
     }, ref) => {
        return (
            <FormGroup>
                <label className="form-control-label" htmlFor={id}>
                    {label}
                </label>
                <Input innerRef={ref} {...props} />
                {errorText && <div className="invalid-feedback">{errorText}</div>}
            </FormGroup>
        );
    }
)

export default FormInputField;