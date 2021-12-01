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
    paddingLeft: "30px",
    paddingRight: "30px",
    maxHeight: "91.5vh",
    backgroundColor: "#003369",
  },
  trelloCardDefaults: {
    style: {
      backgroundColor: "#ffffff",
    },
    cardStyle: {},
  },
  trelloLaneDefaults: {
    style: {
      backgroundColor: "##ebecf0",
      maxHeight: "80vh",
    },
    titleStyle: {},
    labelStyle: {},
  },
  trelloTagDefaults: {
    fontSize: "80%",
  },
};
