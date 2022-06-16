import { defaultTags } from "mockData";
import { MultiValue } from "react-select";
import { Badge, Button, Col, Row } from "reactstrap";
import { useState } from "react";
import { OptionType } from "types/types";
import CreatableSelect from "react-select/creatable";
import { FcPlus } from "react-icons/fc";

interface IProps {
    reqId: string
    callback: (value: OptionType[],reqId: string) => void
    value: OptionType[]
}

const TableTagsCell = ({ reqId, value, callback }: IProps) => {
    const [ tags, setTags ] = useState<MultiValue<OptionType>>(value)
    const [ toggle, setToggle ] = useState(false)

    const handleChange = () => {
        callback(tags as OptionType[] , reqId)
        setToggle(false)
    };

    return (
        <Row className="flex-column">
            {
                !toggle ? (
                    <Col>
                        {tags.map(item => <Badge
                                key={item.value}
                                color="primary"
                                className="ml-0 mr-1 text-white"
                            >
                                {item.label}
                            </Badge>
                        )}
                        <FcPlus
                            size={24}
                            className="react-table-tags-button"
                            onClick={() => setToggle(true)}/>
                    </Col>
                ) : (
                    <>
                        <Col>
                            <CreatableSelect
                                isMulti
                                onChange={setTags}
                                isSearchable={false}
                                className="flex-column"
                                defaultValue={tags}
                                options={defaultTags}
                            />
                        </Col>
                        <Col className="d-flex justify-content-between flex-wrap">
                            <Button
                                size="sm"
                                color="success"
                                onClick={handleChange}
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
                        </Col>
                    </>
                )
            }
        </Row>
    );
};
export default TableTagsCell;
