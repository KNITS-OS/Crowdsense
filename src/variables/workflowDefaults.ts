import { CSSProperties } from "react";
import { ITrelloCard, ITrelloLane } from "types/types";

interface ITrelloDefaults {
  trelloBoardDefaults: CSSProperties;
  trelloCardDefaults: Partial<ITrelloCard>;
  trelloLaneDefaults: Partial<ITrelloLane>;
  trelloTagDefaults: CSSProperties;
}

export const trelloDefaults: ITrelloDefaults = {
  trelloBoardDefaults: {
    fontSize: 18,
    padding: "60px",
    height: "90vh",
    backgroundColor: "#eee",
  },
  trelloCardDefaults: {
    style: {
      backgroundColor: "#eec",
    },
    cardStyle: {},
  },
  trelloLaneDefaults: {
    style: {
      backgroundColor: "#fff",
    },
    titleStyle: {},
    labelStyle: {},
  },
  trelloTagDefaults: {
    fontSize: "80%",
  },
};
