import { ITrello } from "types/types";

export const fullBoardExample: ITrello = {
  lanes: [
    {
      currentPage: 1,
      disallowAddingCard: false,
      id: "PLANNED",
      label: "20/70",
      title: "Disallowed adding card",
      cards: [
        {
          id: "Milk",
          description: "2 Gallons of milk at the Deli store",
          label: "15 mins",
          laneId: "PLANNED",
          title: "Buy milk",
          tags: [
            {
              bgcolor: "#ff00ff",
              color: "#fff",
              title: "grocery",
            },
            {
              bgcolor: "#ff0000",
              color: "#fff",
              title: "faster",
            },
          ],
        },
        {
          description: "Sort out recyclable and waste as needed",
          id: "Plan2",
          label: "10 mins",
          laneId: "PLANNED",
          title: "Dispose Garbage",
        },
        {
          description: "Can AI make memes?",
          id: "Plan3",
          label: "30 mins",
          laneId: "PLANNED",
          title: "Write Blog",
        },
        {
          description: "Transfer to bank account",
          id: "Plan4",
          label: "5 mins",
          laneId: "PLANNED",
          title: "Pay Rent",
        },
      ],
    },
    {
      currentPage: 1,
      id: "WIP",
      label: "10/20",
      title: "Work In Progress",
      cards: [
        {
          description:
            "Soap wash and polish floor. Polish windows and doors. Scrap all broken glasses",
          id: "Wip1",
          label: "30 mins",
          laneId: "WIP",
          title: "Clean House",
        },
      ],
    },
    {
      currentPage: 1,
      id: "COMPLETED",
      label: "2/5",
      title: "Completed",
      cards: [
        {
          description: "Use Headspace app",
          id: "Completed1",
          label: "15 mins",
          laneId: "COMPLETED",
          title: "Practice Meditation",
        },
        {
          description: "Use Spreadsheet for now",
          id: "Completed2",
          label: "15 mins",
          laneId: "COMPLETED",
          title: "Maintain Daily Journal",
        },
      ],
    },
  ],
};

export const cvWorkflowExample: ITrello = {
  lanes: [
    {
      id: "CV Review",
      title: "CV Review",
      cards: [],
    },
    {
      id: "CV Reviewed",
      title: "CV Reviewed",
      cards: [],
    },
    {
      id: "Ready for interview",
      title: "Ready for interview",
      cards: [],
    },
  ],
};
