import { useTags } from "hooks";
import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { FormGroup, Label } from "reactstrap";
import { Tag } from "types/types";
import { createTagMutation } from "utils/axios";
import { convertTag, mapTags } from "utils";

interface Props {
  id: string;
  label: string;
  value: Tag[];
  setValue: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const CreateableSelectFilter = ({ setValue, id, label, value }: Props) => {
  const { defaultTags, setDefaultTags } = useTags();

  const handleChange = (newValue: OnChangeValue<any, true>) => {
    const newTags = newValue.map(tag => {
      return { id: parseInt(tag.value), name: tag.label };
    });

    setValue(newTags);
  };

  const handleCreate = async (inputValue: string) => {
    const newTag = await createTagMutation({ name: inputValue });

    // set new tag as value
    setValue(oldTags => [...oldTags, newTag]);
    setDefaultTags(oldTags => [...oldTags, convertTag(newTag)]);
  };

  return (
    <FormGroup style={{ marginBottom: 0 }}>
      <Label className="form-control-label" htmlFor={id}>
        {label}
      </Label>
      <CreatableSelect
        isMulti
        onChange={handleChange}
        onCreateOption={handleCreate}
        options={defaultTags}
        value={mapTags(value)}
      />
    </FormGroup>
  );
};
export default CreateableSelectFilter;
