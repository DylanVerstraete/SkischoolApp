export class User {
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
    member: boolean;
    constructor(){}
}

class SkiCard{
    numberOfTurns: number;
}
