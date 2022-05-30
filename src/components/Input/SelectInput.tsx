import { Input, InputProps } from "reactstrap";
import { OptionType } from "../../types/types";

type Props = InputProps & {
    id: string;
    label: string;
    options: OptionType[];
    defaultOption:string,
};

const SelectInput = ({ id, label,options,defaultOption, ...rest }: Props) => {
    return (
        <>
            <label
                className="form-control-label"
                htmlFor={id}
            >
                {label}
            </label>
            <Input id={id} type="select" {...rest} defaultValue={'DEFAULT'} className={"fa-5x"}>
                <option hidden disabled value="DEFAULT">{defaultOption}</option>
                {options.map(option => (
                    <option style={{fontSize:"1rem"}} value={option.value} key={option.value}>{option.label}</option>
                ))}
            </Input>
        </>
    );
};

export default SelectInput;