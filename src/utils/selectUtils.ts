import {
  ICandidateRating,
  ICandidateStatus,
  OptionType,
  SelectTag,
  Tag,
} from "types/types";

export const getSelectStatus = (statuses: ICandidateStatus[]) =>
  statuses.map(status => {
    return {
      value: status,
      label: status,
    };
  }) as OptionType[];

const selectRatingArray: ICandidateRating[] = [1, 2, 3, 4, 5];

export const getSelectRating: any = selectRatingArray.map(status => {
  return {
    value: status.toString(),
    label: status.toString(),
  };
});

export const mapTags = (tags: Tag[]) => {
  return tags.map(tag => {
    return {
      value: tag.id.toString(),
      label: tag.name,
    };
  });
};

export const convertTag = (tag: Tag) => {
  const selectTag: SelectTag = {
    value: tag.id.toString(),
    label: tag.name,
  };
  return selectTag;
};
