import ICouncilMemberVote from "./ICouncilMemberVote";

export default interface IUser {
    bill: string; 
    summary: string[];
    vote: boolean; 
    councilVotes: ICouncilMemberVote[]; 
    decision: boolean; 
}

