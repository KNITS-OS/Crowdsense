import { useState } from "react";
import { Col, Row } from "reactstrap";
import { FilterPanel } from "components/panels";
import SelectFilter from "../../Filters/SelectFilter";
import { getSelectRating } from "../../../utils";
import { InputFilter } from "../../Filters";
import { ICandidateFilters, OptionType } from "../../../types/types";
import { addFilter } from "../../../redux/filters";

interface Props {
    title: string
    statusSelectOptions: OptionType[]
    callback: (filters: ICandidateFilters) => void;
}

export const SearchFilterPanel = ({ callback, title, statusSelectOptions }: Props) => {
    const [ searchName, setSearchName ] = useState('');
    const [ searchEmail, setSearchEmail ] = useState('');

    const [ statusSelected, setStatusSelected ] = useState<OptionType | null>();
    const [ ratingSelected, setRatingSelected ] = useState<OptionType | null>();

    const resetFilters = () => {
        setSearchName('');
        setSearchEmail('')
        setRatingSelected(null);
        setStatusSelected(null);
    };

    const findByFilters = () => {
        const fullNameFilter = addFilter({ param: searchName, filter: "like", });
        const statusFilter = addFilter({ param: statusSelected?.value || '', filter: "eq" });
        const ratingFilter = addFilter({ param: ratingSelected?.value || '', filter: "eq" });
        const emailFilter = addFilter({ param: searchEmail, filter: "like" });

        const filters: ICandidateFilters = {
            fullName: fullNameFilter,
            status: statusFilter,
            rating: ratingFilter,
            email: emailFilter,
        };

        callback(filters)
    };

    return (
        <FilterPanel
            title={title}
            findByAllParameters={findByFilters}
            resetFilters={resetFilters}
        >
            <Row>
                <Col md="3">
                    <InputFilter
                        id="name"
                        placeholder="Name"
                        value={searchName}
                        setValue={setSearchName}
                    />
                </Col>
                <Col md="3">
                    <InputFilter
                        id="email"
                        placeholder="Email"
                        value={searchEmail}
                        setValue={setSearchEmail}
                    />
                </Col>
                <Col md="3">
                    <SelectFilter
                        id="status"
                        label="Status"
                        value={statusSelected}
                        setValue={setStatusSelected}
                        options={statusSelectOptions}
                    />
                </Col>
                <Col md="3">
                    <SelectFilter
                        id="rating"
                        label="Rating"
                        value={ratingSelected}
                        setValue={setRatingSelected}
                        options={getSelectRating}
                    />
                </Col>
            </Row>
        </FilterPanel>
    );
};