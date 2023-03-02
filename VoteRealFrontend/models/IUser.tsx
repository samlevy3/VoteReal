import ICouncilMember from "./ICouncilMember"; 
import IVote from './IVote';
export default interface IUser {
    username: string;
    password: string;
    councilMembers: ICouncilMember[]; 
    votes: IVote[];
    currVote: IVote | null;
}