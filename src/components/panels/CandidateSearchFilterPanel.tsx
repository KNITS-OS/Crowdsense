import { Col, Form, Row } from "reactstrap";
import { ICandidateFilters, OptionType } from "types/types";
import { FilterPanel } from "./FilterPanel";
import { useForm } from "react-hook-form";
import { FormInputField, FormSelectField } from "components/Input";
import { getSelectRating } from "utils";

interface Props {
  title: string;
  statusSelectOptions: OptionType[];
  callback: (filters: ICandidateFilters) => void;
  setFilteredData: (value: any[] | null) => void;
}

export const CandidateSearchFilterPanel = ({
  callback,
  title,
  statusSelectOptions,
  setFilteredData,
}: Props) => {
  const { register, handleSubmit, control, reset } =
    useForm<ICandidateFilters>();

  const onFormSubmit = handleSubmit((filters) => {
    callback({
      ...filters,
      fullName: filters.fullName || undefined,
      email: filters.email || undefined,
    });
  });

  const onReset = () => {
    setFilteredData(null);
    reset();
  };

  return (
    <Form onSubmit={onFormSubmit}>
      <FilterPanel title={title} resetFilters={onReset}>
        <Row>
          <Col md="3">
            <FormInputField
              label="First name"
              placeholder="First Name"
              {...register("fullName")}
            />
          </Col>
          <Col md="3">
            <FormInputField
              id="input-email"
              label="Email"
              placeholder="Email"
              {...register("email")}
            />
          </Col>
          <Col md="3">
            <FormSelectField
              options={statusSelectOptions}
              name={"status"}
              label={"Status"}
              control={control}
            />
          </Col>
          <Col md="3">
            <FormSelectField
              name="rating"
              label="Rating"
              options={getSelectRating}
              control={control}
            />
          </Col>
        </Row>
      </FilterPanel>
    </Form>
  );
};
