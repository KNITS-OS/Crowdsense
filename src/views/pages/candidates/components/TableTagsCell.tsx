import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import {
  ICandidate,
  IUpdateCandidateUIParams,
  SelectTag,
} from "types/types";
import { mapTags, convertTag } from "utils";
import { createTagMutation } from "utils/axios";

interface Props {
  row: ICandidate;
  defaultTags: SelectTag[];
  updateCandidateUI: ({ reqId, body }: IUpdateCandidateUIParams) => void;
}

const TableTagsCell = ({ row, defaultTags, updateCandidateUI }: Props) => {
  const tags = defaultTags;
  const handleChange = (newValue: OnChangeValue<any, true>) => {
    const newTags = newValue.map(tag => {
      return { name: tag.label, id: parseInt(tag.value) };
    });

    updateCandidateUI({
      reqId: row.reqId,
      body: {
        tags: newTags,
      },
    });
  };

  const handleCreate = async (inputValue: string) => {
    const newTag = await createTagMutation({ name: inputValue });
    tags.push(convertTag(newTag));

    updateCandidateUI({
      reqId: row.reqId,
      body: {
        tags: [...row.tags, newTag],
      },
    });
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
      options={tags}
      value={mapTags(row.tags)}
      onCreateOption={handleCreate}
    />
  );
};
export default TableTagsCell;
