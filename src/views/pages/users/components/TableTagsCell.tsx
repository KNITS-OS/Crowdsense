import { defaultTags } from "mockData";
import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { Col, Row } from "reactstrap";

const TableTagsCell = () => {
  const handleChange = (newValue: OnChangeValue<any, true>) => {
    console.log(newValue);
    // setTags(newValue);
  };

  return (
    <>
      <Row>
        <Col md="10">
          {/* https://react-select.com/creatable */}
          <CreatableSelect
            isMulti
            onChange={handleChange}
            // onChange={item => setTags(item)}
            options={defaultTags}
            // value={candidateTags.map(tag => ({
            //   value: tag.value,
            //   label: tag.label,
            // }))}
          />
        </Col>
      </Row>
    </>
  );
};
export default TableTagsCell;
