import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { ICandidate, IUpdateCandidateUIParams, Tag } from "types/types";
import { createTagMutation } from "../../../../utils/axios";

interface Props {
  row: ICandidate;
  defaultTags: Tag[];
  updateCandidateUI: ({ reqId, body }: IUpdateCandidateUIParams) => void;
}

const TableTagsCell = ({ row, defaultTags, updateCandidateUI }: Props) => {
  const handleChange = (newValue: OnChangeValue<any, true>) => {
    console.log("newValue", newValue);

    const newTags = newValue.map(tag => {
      return { name: tag.label, id: parseInt(tag.value) };
    });
    console.log("newTags", newTags);

    updateCandidateUI({
      reqId: row.reqId,
      body: {
        tags: newTags,
      },
    });
  };

  const handleCreate = async (inputValue: string) => {
    const data = await createTagMutation({ name: inputValue });
    console.log("data here", data);
    handleChange(data);
    // setValue(oldValue => [...oldValue, data]);
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
      options={defaultTags.map(tag => ({
        label: tag.name,
        value: tag.id.toString(),
      }))}
      value={row.tags.map(tag => ({
        label: tag.name,
        value: tag.id.toString(),
      }))}
      onCreateOption={handleCreate}
    />
  );
};
export default TableTagsCell;
