import { Turn } from "./turn";

export class SkiCard{
    _id: number;
    numberOfTurns: number;
    turns: Turn[];
    payed: boolean;
}