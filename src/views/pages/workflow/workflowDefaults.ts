import { CSSProperties } from "react";
import { ITrelloCard, ITrelloLane } from "types/types";

export const trelloBoardDefaults: CSSProperties = {
  fontSize: 18,
  padding: "60px",
  height: "90vh",
  backgroundColor: "#eee",
};

export const trelloCardDefaults: Partial<ITrelloCard> = {
  style: {
    backgroundColor: "#eec",
  },
  cardStyle: {},
};

export const trelloLaneDefaults: Partial<ITrelloLane> = {
  style: {
    backgroundColor: "#fff",
  },
  titleStyle: {},
  labelStyle: {},
};

export const trelloTagDefaults: CSSProperties = {
  fontSize: "80%",
};
