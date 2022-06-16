import { ICandidate } from "types/types";

export const filterTwoArraysByReqId = (arr1:ICandidate[],arr2:ICandidate[]) => {
  return arr1.filter(({ reqId: id1 }) => (
      !arr2.some(({ reqId: id2 }) => id2 === id1)))
}