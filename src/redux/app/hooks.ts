import {
  TypedUseSelectorHook,
  useDispatch,
  useSelector,
} from "react-redux";
import { AppDisptatch, RootState } from "./store";

export const useAppDispatch = () => useDispatch<AppDisptatch>();

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
