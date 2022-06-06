import { FormLabel } from "../Labels";
import { Input, InputProps } from "reactstrap";

interface IProps extends InputProps {
    id: string;
    label: string;
}

const LabeledFormInput = ({ id, label, ...props }: IProps) => {
    return (
        <>
            <FormLabel id={id} label={label}/>
            <Input{...props} id={id} required={true}/>
        </>
    );
};
export default LabeledFormInput;
