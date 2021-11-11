export default class DatabaseError extends Error {

    constructor(public message: string, public error?: Error) {
        super(message);
        Object.setPrototypeOf(this, DatabaseError.prototype);
    }
}