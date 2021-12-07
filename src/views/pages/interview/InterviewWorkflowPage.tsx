import { TrelloBoard } from "components/Trello";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { ITableColumn, IWorkflowCandidates } from "types/types";
import {
  checkStatusParam,
  interviewWorkflow,
  setCandidateLane,
} from "utils";
import {
  interviewWorkflowState,
  INTERVIEW_BOOKED,
  INTERVIEW_OFFERED,
  INTERVIEW_PERFORMED,
  READY_FOR_INTERVIEW,
} from "variables";

interface RouteParams {
  ReadyForInterviewIds: string;
  InterviewBookedIds: string;
  InterviewPerformedIds: string;
  InterviewOfferedIds: string;
}

const InterviewWorkflowPage = () => {
  const table: ITableColumn = "candidates2";
  const {
    ReadyForInterviewIds,
    InterviewBookedIds,
    InterviewOfferedIds,
    InterviewPerformedIds,
  } = useParams<RouteParams>();

  const [candidateLanes, setCandidateLanes] = useState<
    IWorkflowCandidates[]
  >(interviewWorkflowState);

  useEffect(() => {
    const getReadyForInterviewData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: READY_FOR_INTERVIEW,
        statusParam: ReadyForInterviewIds,
        table,
      });
      setCandidateLanes(oldLanes =>
        setCandidateLane(oldLanes, READY_FOR_INTERVIEW, data),
      );
    };

    const getInterviewOfferedData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: INTERVIEW_OFFERED,
        statusParam: InterviewOfferedIds,
        table,
      });
      setCandidateLanes(oldLanes =>
        setCandidateLane(oldLanes, INTERVIEW_OFFERED, data),
      );
    };

    const getInterviewBookedData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: INTERVIEW_BOOKED,
        statusParam: InterviewBookedIds,
        table,
      });
      setCandidateLanes(oldLanes =>
        setCandidateLane(oldLanes, INTERVIEW_BOOKED, data),
      );
    };

    const getInterviewPerformedData = async () => {
      const data = await checkStatusParam({
        order: "firstName",
        status: INTERVIEW_PERFORMED,
        statusParam: InterviewPerformedIds,
        table,
      });
      setCandidateLanes(oldLanes =>
        setCandidateLane(oldLanes, INTERVIEW_PERFORMED, data),
      );
    };

    getReadyForInterviewData();
    getInterviewOfferedData();
    getInterviewBookedData();
    getInterviewPerformedData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <TrelloBoard
        workflow={interviewWorkflow(candidateLanes)}
        table={table}
      />
    </>
  );
};
export default InterviewWorkflowPage;
