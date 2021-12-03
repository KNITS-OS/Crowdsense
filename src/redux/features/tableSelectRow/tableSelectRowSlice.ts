import { createSlice } from "@reduxjs/toolkit";
import { ICandidate } from "types/types";

interface InitialState {
  // const [selectedRows, setSelectedRows] = useState<ICandidate[]>([]);
  selectedRows: ICandidate[];
}

const initialState: InitialState = {
  selectedRows: [],
};

export const tableSelectRowSlice = createSlice({
  name: "tableSelectRow",
  initialState,
  reducers: {
    setSelectedRows: (state, action) => {
      state.selectedRows = action.payload;
    },
  },
});

export const { setSelectedRows } = tableSelectRowSlice.actions;
