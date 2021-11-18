import {
  ILikeFilter,
  ISimpleFilter,
  StringOrUndefined,
  IArrayFilter,
} from "types/types";

/**
 *
 * @returns undefined or filter.param
 * @description function that takes in a string and returns query param if it is defined
 *
 */
interface Props {
  param: string;
  filter: ISimpleFilter | ILikeFilter | IArrayFilter;
}

const addFilter = ({ param, filter }: Props) => {
  let finalFilter: StringOrUndefined = undefined;

  if (param) {
    if (filter === "like" || filter === "ilike") {
      finalFilter = `${filter}.%${param}%`;
    } else if (filter === "in") {
      finalFilter = `${filter}.(${param})`;
    } else if (filter === "cs" || filter === "cd") {
      finalFilter = `${filter}.{${param}}`;
    } else {
      finalFilter = `${filter}.${param}`;
    }
  }

  return finalFilter;
};

export default addFilter;
