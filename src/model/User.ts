export default class User {
    public id : number;
    public email : string;
    public username : string = '';
    public familyId : number;
    constructor(id : number, email : string, username : string, familiID : number) {
        this.id = id;
        this.email = email;
        this.username = username;
        this.familyId = familiID;
    }
}