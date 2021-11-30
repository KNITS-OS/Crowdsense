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
  param: string[] | string;
  filter: ISimpleFilter | ILikeFilter | IArrayFilter;
}

const addFilter = ({ param, filter }: Props) => {
  let finalFilter: StringOrUndefined = undefined;

  if (param) {
    if (
      typeof param === "string" &&
      (filter === "like" || filter === "ilike")
    ) {
      finalFilter = `${filter}.%${param}%`;
    } else if (Array.isArray(param) && filter === "in") {
      finalFilter = `${filter}.(${param})`;
    } else if (
      Array.isArray(param) &&
      (filter === "cs" || filter === "cd")
    ) {
      finalFilter = `${filter}.{${param}}`;
    } else {
      finalFilter = `${filter}.${param}`;
    }
  }

  console.log("finalFilter");
  console.log(finalFilter);

  return finalFilter;
};

export default addFilter;
