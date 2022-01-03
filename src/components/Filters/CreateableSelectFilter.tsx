import { useTags } from "hooks";
import { OnChangeValue } from "react-select";
import CreatableSelect from "react-select/creatable";
import { FormGroup, Label } from "reactstrap";
import { Tag } from "types/types";
import { createTagMutation } from "utils/axios";

interface Props {
  id: string;
  label: string;
  setValue: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const CreateableSelectFilter = ({ setValue, id, label }: Props) => {
  const { defaultTags } = useTags();

  const handleChange = (newValue: OnChangeValue<any, true>) => {
    const newTags = newValue.map(tag => {
      return { id: parseInt(tag.value), name: tag.label };
    });

    setValue(newTags);
  };

  const handleCreate = async (inputValue: string) => {
    const data = await createTagMutation({ name: inputValue });
    console.log("data here", data);

    setValue(oldValue => [...oldValue, data]);
  };

  return (
    <FormGroup style={{ marginBottom: 0 }}>
      <Label className="form-control-label" htmlFor={id}>
        {label}
      </Label>
      <CreatableSelect
        isMulti
        onChange={handleChange}
        options={defaultTags.map(tag => ({
          label: tag.name,
          value: tag.id.toString(),
        }))}
        onCreateOption={handleCreate}
      />
    </FormGroup>
  );
};
export default CreateableSelectFilter;
