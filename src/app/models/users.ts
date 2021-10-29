export class Users {
    constructor(userId?: string, name?: string, email?: string) {
        this.name = name || "";
        this.email = email || "";
        this.id = userId || "";
    }

    id: string;
    name: string;
    email: string;

}