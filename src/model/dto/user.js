export class User {
    username;
    password;


    constructor(username, password) {
        console.log(username, password)
        this.username = username;
        this.password = password;
    }


    setUsername(username) {
        this.username = username;
    }

    setPassword(password) {
        this.password = password;
    }

    getUsername() {
        return this.username;
    }

    getPassword() {
        return this.password;
    }


}