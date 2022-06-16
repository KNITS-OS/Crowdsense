import { Button } from "reactstrap";
import { useState } from "react";

interface IProps {
    reqId:string
    value: string
    updateColumn: (value: string, reqId:string) => void
}

export const EditableColumn = ({ value, reqId, updateColumn }: IProps) => {
    const [ newValue, setNewValue ] = useState('')
    const [ toggle, setToggle ] = useState(false)

    const onSave = () => {
        if (newValue !== value) {
            updateColumn(newValue, reqId)
            setToggle(false)
        } else return
    }

    return (
        <>
            {!toggle ? (
                <div
                    onDoubleClick={() => setToggle(true)}
                    className={"blur--hover"}
                >
                    {value}
                </div>
            ) : (
                <div>
                    <textarea
                        style={{ width: "100%" }}
                        defaultValue={value}
                        onChange={(e) => setNewValue(e.target.value)}
                    />
                    <div className="d-flex justify-content-between flex-wrap">
                        <Button
                            size="sm"
                            color="success"
                            onClick={onSave}
                        >
                            Save
                        </Button>
                        <Button
                            size="sm"
                            color="danger"
                            className="m-0"
                            onClick={() => setToggle(false)}
                        >
                            Cancel
                        </Button>
                    </div>
                </div>
            )
            }
        </>
    );
};

