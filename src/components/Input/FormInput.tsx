import { Input, InputProps } from "reactstrap";

const FormInput = ({ ...rest }: InputProps) => {
    return (
        <Input{...rest} required={true}/>
    );
};
export default FormInput;
