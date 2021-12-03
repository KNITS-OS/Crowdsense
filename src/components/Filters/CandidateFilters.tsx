import { useState } from "react";
import { Button, Col, FormGroup, Row } from "reactstrap";
import { addFilter } from "redux/filters";
import { ICandidate, ICandidateStatus, ITableColumn } from "types/types";
import { axiosInstance, getSelectRating, getSelectStatus } from "utils";
import { InputFilter, SelectFilter } from ".";

type SetCandidatesType = React.Dispatch<
  React.SetStateAction<ICandidate[]>
>;

interface Props {
  table: ITableColumn;
  setCandidates: SetCandidatesType;
  setUpdatedCandidates: SetCandidatesType;
  setSelectedRows: SetCandidatesType;
  defaultStatuses: ICandidateStatus[];
}

const CandidateFilters = ({
  table,
  setCandidates,
  setSelectedRows,
  setUpdatedCandidates,
  defaultStatuses,
}: Props) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState("");
  const [email, setEmail] = useState("");

  const findByFilters = async () => {
    const nameFilter = addFilter({ param: name, filter: "like" });
    const statusFilter = addFilter({ param: status, filter: "eq" });
    const statusesFilter = addFilter({
      param: defaultStatuses,
      filter: "in",
    });
    const ratingFilter = addFilter({ param: rating, filter: "eq" });
    const emailFilter = addFilter({ param: email, filter: "like" });

    let finalStatusFilter = () => {
      if (statusFilter) {
        return statusFilter;
      } else {
        return statusesFilter;
      }
    };

    const filters = {
      fullName: nameFilter,
      status: finalStatusFilter(),
      rating: ratingFilter,
      email: emailFilter,
    };

    let { data } = await axiosInstance.get(table, {
      params: {
        select: "*",
        ...filters,
        limit: 100,
      },
    });
    setCandidates(data);
    // getFilteredCandidates({ limit: 100, select: "*", filters });
    setUpdatedCandidates([]);
    setSelectedRows([]);
  };

  return (
    <Row
      style={{
        justifyContent: "center",
        alignItems: "flex-end",
      }}
    >
      <Col md="3">
        <InputFilter
          id="name"
          placeholder="Name"
          value={name}
          setValue={setName}
        />
      </Col>
      <Col md="2">
        <InputFilter
          id="email"
          placeholder="Email"
          value={email}
          setValue={setEmail}
        />
      </Col>
      <Col md="3">
        <SelectFilter
          id="status"
          label="Status"
          setValue={setStatus}
          options={getSelectStatus(defaultStatuses)}
        />
      </Col>
      <Col md="2">
        <SelectFilter
          id="rating"
          label="Rating"
          setValue={setRating}
          options={getSelectRating}
        />
      </Col>
      <Col
        md="2"
        style={{
          textAlign: "center",
        }}
      >
        <FormGroup style={{ marginBottom: 0 }}>
          <Button
            className="btn btn-primary"
            color="primary"
            onClick={findByFilters}
          >
            Search
          </Button>
        </FormGroup>
      </Col>
    </Row>
  );
};
export default CandidateFilters;
