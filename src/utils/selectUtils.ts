import {
    ICandidateRating,
    IKNCareerCurriculumStatus,
    IKNCareerStatus,
    OptionType,
} from "types/types";

export const selectCandidatesStatusArray: IKNCareerStatus[] = [
    "Closed",
    "In Review",
    "New",
];

export const selectCurriculumStatusArray: IKNCareerCurriculumStatus[] = [
    "CV Review",
    "CV Reviewed",
    "Ready for interview"
];


export const getCandidatesSelectStatus: OptionType[] = selectCandidatesStatusArray.map(
    status => {
        return {
            value: status,
            label: status,
        };
    },
);

export const getCurriculumSelectStatus: OptionType[] = selectCurriculumStatusArray.map(
    status => {
        return {
            value: status,
            label: status,
        };
    },
);


export const selectRatingArray: ICandidateRating[] = [ 1, 2, 3, 4, 5 ];

export const getSelectRating: OptionType[] = selectRatingArray.map(status => {
    return {
        value: status.toString(),
        label: status.toString(),
    };
});

export const findSelectValue = (selectArr: OptionType[], inputValue: string) => {
    return selectArr.some(val => val.value.includes(inputValue))
}

