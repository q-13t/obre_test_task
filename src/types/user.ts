export default class User {
    id: number;
    username: string | null;
    email: string | null

    constructor(id: number, username: string | null, email: string | null) {
        this.id = id;
        this.username = username;
        this.email = email;
    }
}
