import { ISimpleFilter, StringOrUndefined } from "types/types";

/**
 *
 * @returns undefined or filter.param
 * @description function that takes in a string and returns query param if it is defined
 */
interface Props {
  param: string;
  filter: ISimpleFilter;
}

const addSimpleFilter = ({ param, filter }: Props) => {
  let finalFilter: StringOrUndefined = undefined;

  if (param) finalFilter = `${filter}.${param}`;

  return finalFilter;
};

export default addSimpleFilter;
