import { IArrayFilter, StringOrUndefined } from "types/types";
// @todo make it work
/**
 *
 * @returns undefined or filter.param
 * @description function that takes in a string and returns query param if it is defined
 */
interface Props {
  param: string;
  filter: IArrayFilter;
}

const addArrayFilter = ({ param, filter }: Props) => {
  let finalFilter: StringOrUndefined = undefined;

  if (param) finalFilter = `${filter}`;

  return finalFilter;
};

export default addArrayFilter;
