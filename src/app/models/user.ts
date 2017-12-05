import { SkiCard } from "./skicard";

export class User {
    _id: number;
    password: string;
    firstName: string;
    lastName: string;
    adress: string;
    addressnumber: string;
    addresspostalcode: string;
    addresscity: string;
    telephonenumber: string;
    email: string;
    skicards: SkiCard[];
    totalskiturns: number;
    member: boolean;
    role: string;
    constructor(){}
}



