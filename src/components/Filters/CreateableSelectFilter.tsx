import { useTags } from "hooks";
import Select, { OnChangeValue } from "react-select";
import { FormGroup, Label } from "reactstrap";
import { Tag } from "types/types";
import { mapTags } from "utils";

interface Props {
  id: string;
  label: string;
  value: Tag[];
  setValue: React.Dispatch<React.SetStateAction<Tag[]>>;
}

const CreateableSelectFilter = ({ setValue, id, label, value }: Props) => {
  const { defaultTags } = useTags();

  const handleChange = (newValue: OnChangeValue<any, true>) => {
    const newTags = newValue.map(tag => {
      return { id: parseInt(tag.value), name: tag.label };
    });

    setValue(newTags);
  };

  return (
    <FormGroup style={{ marginBottom: 0 }}>
      <Label className="form-control-label" htmlFor={id}>
        {label}
      </Label>
      <Select
        isMulti
        onChange={handleChange}
        options={defaultTags}
        value={mapTags(value)}
      />
    </FormGroup>
  );
};
export default CreateableSelectFilter;
