import { addFilter } from "redux/filters";
import {
  ICandidateOrder,
  IGetCandidatesByStatusAndIdsParams,
  IGetCandidatesByStatusParams,
  ITableColumn,
} from "types/types";
import { axiosInstance } from ".";

/**
 * @description Gets data using filters
 */
export const getDataByFiltersQuery = async (
  table: ITableColumn,
  filters: any,
  select: string,
  limit?: number,
) => {
  let { data } = await axiosInstance.get(table, {
    params: {
      select,
      ...filters,
      limit,
    },
  });

  return { data };
};

const addAscDescOrder = (order: ICandidateOrder, asc: boolean = true) => {
  let finalOrder;

  if (asc) {
    finalOrder = `${order}.asc`;
  } else {
    finalOrder = `${order}.desc`;
  }
  return finalOrder;
};

/**
 * @description Gets Ordered Candidates By Status And Ids
 * @param asc default true
 */
export const getCandidatesByStatusAndIds = async ({
  table,
  candidateIds,
  status,
  order,
}: IGetCandidatesByStatusAndIdsParams) => {
  const statusFilter = addFilter({
    param: status,
    filter: "eq",
  });
  const reqIdFilter = addFilter({
    param: [candidateIds],
    filter: "in",
  });
  const finalOrder = addAscDescOrder(order);

  const filters = {
    status: statusFilter,
    reqId: reqIdFilter,
    order: finalOrder,
  };

  const res = await getDataByFiltersQuery(table, filters, "*");

  return res;
};

/**
 * @description Gets Ordered Candidates By Status
 * @param asc default true
 */
export const getCandidatesByStatus = async ({
  status,
  table,
  order,
}: IGetCandidatesByStatusParams) => {
  const statusFilter = addFilter({
    param: status,
    filter: "eq",
  });

  const finalOrder = addAscDescOrder(order);
  const filters = {
    status: statusFilter,
    order: finalOrder,
  };

  const res = await getDataByFiltersQuery(table, filters, "*");

  return res;
};
