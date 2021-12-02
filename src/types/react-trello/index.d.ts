declare module "react-trello" {
  export class Board<CardMetaData> extends React.Component<
    ReactTrello.BoardProps<CardMetaData>,
    any
  > {}

  export default Board;
}

declare namespace ReactTrello {
  /**
   * react-trello uses `React.cloneElement`, so these props
   * will have to be added to `defaultProps`, otherwise
   * TypeScript will (understandably) freak out.
   */
  interface NewCardTemplateProps<CardMetaData = unknown> {
    laneId: string;
    onAdd: (card: Card<CardMetaData>) => void;
    onCancel: () => void;
  }

  interface BoardData<CardMetaData = unknown> {
    lanes: Array<Lane<CardMetaData>>;
  }

  interface EventBusPublish {
    type: string;
    laneId: string;
    cardId: string;
  }

  interface EventBus {
    publish: ({ type, laneId, cardId }: EventBusPublish) => void;
  }

  interface DraggableCard {
    id: string;
    laneId: string;
    title: string;
    label?: string;
    description?: string;
    cardColor?: string;
    body?: string;
    style?: CSSProperties;
    cardStyle?: CSSProperties;
    dueOn?: string;
    escalationText?: string;
    metadata?: {
      id?: string;
      completedAt?: string;
      shortCode?: string;
    };
    name?: string;
    subTitle?: string;
    tags?: ITrelloTags[];
  }

  interface Lane {
    id: string;
    cards: Array<DraggableCard>;
    title: string;
    label?: string;
    style?: CSSProperties;
    currentPage?: number;
    disallowAddingCard?: boolean;
    titleStyle?: CSSProperties;
    labelStyle?: CSSProperties;
    /**
     * Pass CSS style props for cards in this lane
     */
    cardStyle?: CSSProperties;
    target?: string;
    current?: string;
  }

  interface BoardProps<CardMetaData = object> {
    /**
     * @description Makes all cards and lanes draggable
     * @default false
     */
    draggable?: boolean;
    /**
     * @description Set to false to disable lane dragging.
     * @default true
     */
    laneDraggable?: boolean;
    /**
     * @description Set to false to disable card dragging.
     * @default true
     */
    cardDraggable?: boolean;
    /**
     * @description Make the lanes with cards collapsible.
     * @default false
     */
    collapsibleLanes?: boolean;
    /**
     * @description Makes the entire board editable. Allow cards to be added or deleted
     * @default false
     */
    editable?: boolean;
    /**
     * @description Callback function triggered when card drag is started: handleDragStart(cardId, laneId)
     */
    handleDragStart?: (cardId: string, laneId: string) => void;
    /**
     * @description Callback function triggered when card drag ends: handleDragEnd(cardId, sourceLaneId, targetLaneId, position, cardDetails)
     */
    handleDragEnd?: (
      cardId: string,
      sourceLandId: string,
      targetLaneId: string,
      position: number,
      cardDetails: Card<CardMetaData>,
    ) => void;
    /**
     * Callback function triggered when lane drag is started: handleLaneDragStart(laneId)
     */
    handleLaneDragStart?: (laneId: string) => void;
    /**
     * Callback function triggered when lane drag ends: handleLaneDragEnd(laneId, newPosition)
     */
    handleLaneDragEnd?: (laneId: string, newPosition: number) => void;
    /**
     * CSS class to be applied to Card when being dragged
     */
    cardDragClass?: string;
    /**
     * CSS class to be applied to Lane when being dragged
     */
    laneDragClass?: string;
    /**
     * Called when a lane is scrolled to the end: onLaneScroll(requestedPage, laneId)
     */
    onLaneScroll?: (requestedPage: unknown, laneId: string) => void;
    /**
     * Called when a card is clicked: onCardClick(cardId, metadata, laneId)
     */
    onCardClick?: (
      cardId: string,
      metaData: CardMetaData,
      laneId: string,
    ) => void;
    /**
     * Called when a new card is added: onCardAdd(card, laneId)
     */
    onCardAdd?: (card: DraggableCard, laneId: string) => void;
    /**
     * Pass custom element to replace the Add Card link at the end of the lane (when board is editable)
     */
    components?: {
      AddCardLink?: React.ReactNode;
      LaneHeader?: React.ReactNode;
      NewCardForm?: React.ReactNode;
      NewLaneSection?: React.ReactNode;
      Card?: React.ReactNode;
    };
    /**
     * Disable showing the delete icon to the top right corner of the card (when board is editable)
     */
    hideCardDeleteIcon?: boolean;
    /**
     * Called when a card is deleted: onCardDelete(cardId, laneId)
     */
    onCardDelete?: (cardId: string, laneId: string) => void;

    onBeforeCardDelete?: (props: any) => void;
    /**
     * Called when a lane is clicked: onLaneClick(laneId). Card clicks are not propagated to lane click event
     */
    onLaneClick?: (laneId: string) => void;
    /**
     * Used to specify the logic to sort cards on a lane: laneSortFunction(card1, card2)
     */
    laneSortFunction?: (card1: Card, card2: Card) => void;
    /**
     * This is a special function that providers a publishHook to pass new events to the board. See details in Publish Events section
     */
    eventBusHandle?: (hook: EventBus) => void;
    /**
     * Called everytime the data changes due to user interaction or event bus: onDataChange(newData)
     */
    onDataChange?: (newData: unknown) => void;
    /**
     * Pass css style props to board container
     */
    style?: React.CSSProperties;
    /**
     * Pass css style props to lane container
     */
    laneStyle?: React.CSSProperties;

    /**
     * Pass css style props to card container
     */
    cardStyle?: React.CSSProperties;

    /**
     * Actual board data in the form of json
     */
    data: BoardData<CardMetaData>;
    /**
     * If cards have tags, use this prop to modify their style
     */
    tagStyle?: unknown;
    addCardTitle?: string;

    onCardMoveAcrossLanes?: (
      fromLaneId: ICandidateStatus,
      toLaneId: ICandidateStatus,
      cardId: string,
      index: number,
    ) => void;
  }
}
