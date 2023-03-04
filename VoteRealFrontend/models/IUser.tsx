import ICouncilMember from "./ICouncilMember"; 
import IVote from './IVote';
export default interface IUser {
    username: string;
    password: string;
    votes: IVote[];
    currVote: IVote | null;
    uuid: string;
}