import { CSSProperties } from "react";

interface ITrelloDefaults {
  trelloBoardDefaults: CSSProperties;
  trelloCardDefaults: Partial<ReactTrello.DraggableCard>;
  trelloLaneDefaults: Partial<ReactTrello.Lane>;
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
