import { ICandidate, WorkflowLinesType } from "types/types";

interface ITag {
  bgcolor: string;
  color: string;
  title: string;
}

export interface ICard {
  id: string;
  laneId?: number;
  description: string | undefined;
  title: string;
  tags: ITag[] | undefined;
}

interface ILane {
  cards: ICard[];
  id: WorkflowLinesType;
  title: string;
  label?: string;
  currentPage?: number;
  disallowAddingCard?: boolean;
  style?: React.CSSProperties;
  cardStyle?: React.CSSProperties;
}

const CV_COLUMN = 0;
const INTERVIEW_COLUMN = 1;
const OFFER_COLUMN = 2;
const INTERNSHIP_COLUMN = 3;
const ARCHIVE_COLUMN = 4;

export const workflowTrelloBoard = (data: ICandidate[]) => {
  const board: { lanes: ILane[] } = {
    lanes: [
      {
        cards: [],
        currentPage: 1,
        id: "cv",
        style: {
          width: 280,
        },
        title: "CV Review",
      },
      {
        cards: [],
        currentPage: 1,
        id: "interview",
        style: {
          width: 280,
        },
        title: "Interview",
      },
      {
        cards: [],
        currentPage: 1,
        id: "offer",
        style: {
          width: 280,
        },
        title: "Offer",
      },
      {
        cards: [],
        currentPage: 1,
        id: "internship",
        style: {
          width: 280,
        },
        title: "Internship",
      },
      {
        cards: [],
        currentPage: 1,
        id: "archive",
        style: {
          width: 280,
        },
        title: "Archived",
      },
    ],
  };

  for (let i = 0; i < data.length; i++) {
    const cardObject: ICard = {
      description: data[i].comment,
      id: data[i].reqId,
      laneId: i,
      title: data[i].fullName,
      tags: data[i]?.tags?.map((tag) => {
        return {
          bgcolor: "#5e72e4",
          color: "#fff",
          title: tag.label,
        };
      }),
    };

    switch (data[i].workflow) {
      case "cv":
        board.lanes[CV_COLUMN].cards.push(cardObject);
        break;
      case "interview":
        board.lanes[INTERVIEW_COLUMN].cards.push(cardObject);
        break;
      case "offer":
        board.lanes[OFFER_COLUMN].cards.push(cardObject);
        break;
      case "internship":
        board.lanes[INTERNSHIP_COLUMN].cards.push(cardObject);
        break;
      case "archive":
        board.lanes[ARCHIVE_COLUMN].cards.push(cardObject);
        break;
    }
  }

  return {
    lanes: board.lanes.map((lane) => {
      return {
        ...lane,
        label: (
          <span
            className={`font-weight-bolder ${
              lane.cards.length ? "text-success" : "text-danger"
            }`}
          >
            {lane.cards.length.toString()}
          </span>
        ),
      };
    }),
  };
};
