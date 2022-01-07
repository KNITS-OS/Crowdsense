import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import {
  Button,
  Card,
  CardBody,
  CardHeader,
  Col,
  FormGroup,
  Label,
  Row,
} from "reactstrap";
import { addFilter } from "redux/filters";
import { ICandidate, ICandidateStatus, Tag } from "types/types";
import { getSelectStatus } from "utils";
import { getDataByFiltersQuery } from "utils/axios";
import { CreateableSelectFilter, InputFilter, SelectFilter } from ".";
import { candidatesTable } from "variables/tableVariables";

type SetCandidatesType = React.Dispatch<
  React.SetStateAction<ICandidate[]>
>;

interface Props {
  setCandidates: SetCandidatesType;
  setUpdatedCandidates: SetCandidatesType;
  setSelectedCandidates: SetCandidatesType;
  /**
   * @description Defines what candidates are selected (based on status)
   */
  defaultStatuses: ICandidateStatus[];
}

export const CandidateFilters = ({
  setCandidates,
  setSelectedCandidates,
  setUpdatedCandidates,
  defaultStatuses,
}: Props) => {
  const [name, setName] = useState("");
  const [status, setStatus] = useState("");
  const [rating, setRating] = useState<number | undefined>();
  const [email, setEmail] = useState("");
  const [tags, setTags] = useState<Tag[]>([]);

  const findByFilters = async () => {
    const nameFilter = addFilter({ param: name, filter: "like" });
    const emailFilter = addFilter({ param: email, filter: "like" });
    const statusFilter = addFilter({ param: status, filter: "eq" });
    const statusesFilter = addFilter({
      param: defaultStatuses,
      filter: "in",
    });
    const ratingFilter = addFilter({
      param: rating,
      filter: "eq",
    });
    const tagIds = tags.map(tag => tag.id.toString());
    const tagsFilter = addFilter({
      param: tagIds,
      filter: "in",
    });

    // status filter will be added to the query if it is not empty
    // otherwise search using all statuses
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
      tags: tagsFilter,
    };

    const { data } = await getDataByFiltersQuery(candidatesTable, filters);

    setCandidates(data);
    setUpdatedCandidates([]);
    setSelectedCandidates([]);
  };

  const handleRatingChange = (newRating: number) => {
    setRating(newRating);
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
              <Col md="2">
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
              <Col md="2">
                <SelectFilter
                  id="status"
                  label="Status"
                  setValue={setStatus}
                  options={getSelectStatus(defaultStatuses)}
                />
              </Col>
              <Col md="2">
                <CreateableSelectFilter
                  id="tags"
                  label="Tags"
                  value={tags}
                  setValue={setTags}
                />
              </Col>
              <Col md="2">
                <FormGroup style={{ marginBottom: 0 }}>
                  <Col>
                    <Label className="form-control-label" htmlFor="rating">
                      Rating
                    </Label>
                  </Col>
                  <Col>
                    <Rating
                      key="rating"
                      onClick={newRating =>
                        handleRatingChange(newRating / 20)
                      }
                      ratingValue={rating === undefined ? 0 : rating}
                      size={30}
                    />
                  </Col>
                </FormGroup>
              </Col>
              <Col
                md="1"
                style={{
                  textAlign: "center",
                }}
              >
                <FormGroup style={{ marginBottom: 0 }}>
                  <Col>
                    <Button
                      className="btn btn-primary"
                      color="primary"
                      onClick={findByFilters}
                    >
                      Search
                    </Button>
                  </Col>
                </FormGroup>
              </Col>
            </Row>
          </CardBody>
        </Card>
      </Col>
    </Row>
  );
};
