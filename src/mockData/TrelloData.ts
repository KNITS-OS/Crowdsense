export const fullBoardExample = {
  lanes: [
    {
      cards: [
        {
          description: "2 Gallons of milk at the Deli store",
          id: "Milk",
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
      currentPage: 1,
      disallowAddingCard: false,
      id: "PLANNED",
      label: "20/70",
      style: {
        width: 280,
      },
      title: "Disallowed adding card",
    },
    {
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
      currentPage: 1,
      id: "WIP",
      label: "10/20",
      style: {
        width: 280,
      },
      title: "Work In Progress",
    },
    {
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
      currentPage: 1,
      id: "COMPLETED",
      label: "2/5",
      style: {
        width: 280,
      },
      title: "Completed",
    },
    {
      cards: [
        {
          description: "Track using fitbit",
          id: "Repeat1",
          label: "30 mins",
          laneId: "REPEAT",
          title: "Morning Jog",
        },
      ],
      currentPage: 1,
      id: "REPEAT",
      label: "1/1",
      style: {
        width: 280,
      },
      title: "Repeat",
    },
    {
      cards: [
        {
          description: "Completed 10km on cycle",
          id: "Archived1",
          label: "300 mins",
          laneId: "ARCHIVED",
          title: "Go Trekking",
        },
      ],
      currentPage: 1,
      id: "ARCHIVED",
      label: "1/1",
      style: {
        width: 280,
      },
      title: "Archived",
    },
  ],
};
