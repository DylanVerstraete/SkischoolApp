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

class SkiCard{
    numberOfTurns: number;
    turns: Turn[];
    payed: boolean;
}

class Turn{
    minutes: number;
    used: boolean;
}
