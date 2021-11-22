import { defaultTags } from "mockData";
import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";

const TableTagsCell = () => {
  const handleChange = (newValue: OnChangeValue<any, true>) => {
    console.log(newValue);
    // setTags(newValue);
  };

  return (
    // https://react-select.com/creatable
    <CreatableSelect
      styles={{
        container: base => ({
          ...base,
          width: "17rem",
        }),
      }}
      isMulti
      onChange={handleChange}
      // onChange={item => setTags(item)}
      options={defaultTags}
      // value={candidateTags.map(tag => ({
      //   value: tag.value,
      //   label: tag.label,
      // }))}
    />
  );
};
export default TableTagsCell;
