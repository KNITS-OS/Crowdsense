import { ICandidateRating, IKNCareerStatus } from "./types";

export interface ICurriculumFileRequest {
importFile: File
}

export interface ICreateCurriculumRequest {
    firstName: string;
    lastName: string;
    email: string;
    country: string;
    status: IKNCareerStatus | "";
    rating: ICandidateRating | "";
    comment: string;
    submissionDate: string;
}