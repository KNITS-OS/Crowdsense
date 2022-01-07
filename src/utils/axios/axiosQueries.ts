import { addFilter } from "redux/filters";
import {
  ICandidateOrder,
  IGetCandidatesByStatusAndIdsParams,
  IGetCandidatesByStatusParams,
  ITableColumn,
} from "types/types";
import { axiosInstance } from ".";
import { candidatesTable } from "variables/tableVariables";

/**
 * @description Gets data using filters
 */
export const getDataByFiltersQuery = async (
  table: ITableColumn,
  filters: any,
) => {
  let { data } = await axiosInstance.get(table, {
    params: {
      ...filters,
    },
  });

  return { data };
};

const addOrder = (order: ICandidateOrder, asc: boolean = true) => {
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
  const finalOrder = addOrder(order);

  let filters;

  if (process.env.REACT_APP_BACKEND_ENV === "spring") {
    filters = {
      status: statusFilter,
      reqId: reqIdFilter,
    };
  } else {
    filters = {
      status: statusFilter,
      reqId: reqIdFilter,
      order: finalOrder,
    };
  }

  const res = await getDataByFiltersQuery(candidatesTable, filters);

  return res;
};

/**
 * @description Gets Ordered Candidates By Status
 * @param asc default true
 */
export const getCandidatesByStatus = async ({
  status,
  order,
}: IGetCandidatesByStatusParams) => {
  const statusFilter = addFilter({
    param: status,
    filter: "eq",
  });

  const finalOrder = addOrder(order);

  let filters;

  if (process.env.REACT_APP_BACKEND_ENV === "spring") {
    filters = {
      status: statusFilter,
    };
  } else {
    filters = {
      status: statusFilter,
      order: finalOrder,
    };
  }

  const res = await getDataByFiltersQuery(candidatesTable, filters);

  return res;
};

/**
 * @description Gets Candidate By Id
 */
export const getCandidateByIdQuery = async (id: string) => {
  const idFilter = addFilter({ param: id, filter: "eq" });
  let data;
  const filters = {
    reqId: idFilter,
  };

  if (process.env.REACT_APP_BACKEND_ENV === "spring") {
    let { data: _data } = await axiosInstance.get(
      `${candidatesTable}/${id}`,
    );
    data = _data;
  } else {
    let { data: _data } = await axiosInstance.get(candidatesTable, {
      params: {
        ...filters,
      },
    });
    data = _data;
  }

  return { data };
};

/**
 * @description Gets All Tags
 */
export const getAllTags = async () => {
  let { data } = await axiosInstance.get("tags/all");
  return { data };
};
