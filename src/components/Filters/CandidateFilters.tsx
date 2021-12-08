import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Row,
} from "reactstrap";
import { addFilter } from "redux/filters";
import { ICandidate, ICandidateStatus, ITableColumn } from "types/types";
import { getSelectRating, getSelectStatus } from "utils";
import { InputFilter, SelectFilter } from ".";
import { getDataByFiltersQuery } from "../../utils/axios";

type SetCandidatesType = React.Dispatch<
  React.SetStateAction<ICandidate[]>
>;

interface Props {
  table: ITableColumn;
  setCandidates: SetCandidatesType;
  setUpdatedCandidates: SetCandidatesType;
  setSelectedCandidates: SetCandidatesType;
  /**
   * @description Defines what candidates are selected (based on status)
   */
  defaultStatuses: ICandidateStatus[];
}

const CandidateFilters = ({
  table,
  setCandidates,
  setSelectedCandidates,
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

    const { data } = await getDataByFiltersQuery(table, filters, "*", 100);

    setCandidates(data);
    // getFilteredCandidates({ limit: 100, select: "*", filters });
    setUpdatedCandidates([]);
    setSelectedCandidates([]);
  };

  return (
    <Row>
      <Col>
        <Card>
          <CardHeader>
            <h3 className="mb-0">Search Candidates</h3>
            <p className="text-sm mb-0">Filters</p>
          </CardHeader>
          <CardBody>
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
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
export default CandidateFilters;
