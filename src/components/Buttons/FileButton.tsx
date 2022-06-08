import { Button, ButtonProps } from "reactstrap";
import React from "react";

interface IProps extends ButtonProps {
    label: string
    onImport: (value:any) => void
}

export const FileButton = ({ label,onImport, ...rest }: IProps) => {

    const hiddenFileInput = React.useRef<HTMLInputElement | null>(null);

    const handleClick = () => {
            hiddenFileInput.current?.click()
    };

    return (
        <>
            <Button onClick={handleClick} {...rest}>
                {label}
            </Button>

            <input type="file"
                   ref={hiddenFileInput}
                   onChange={onImport}
                   style={{ display: 'none' }}
            />
        </>
    );
};

