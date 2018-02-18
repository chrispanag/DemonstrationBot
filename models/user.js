class User {
    constructor (id, { first_name = "", last_name = "", gender = null}, cellLogin = false) {
        if (!id) 
            throw new Error("No user id is setted!");
        this.id = id;
        this.first_name = first_name;
        this.last_name = last_name;
        this.gender = gender;
        this._context = {};
        this.cellLogin = cellLogin;
    }

    get fullname () {
        return `${this.first_name} ${this.last_name}`;
    }

    get context () {
        return this._context;
    }

    set context (context) {
        if (context) 
            this._context = context;
        else 
            throw new Error("New context is not defined!");
    }
}

module.exports = User;
