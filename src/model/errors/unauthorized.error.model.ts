export default class UnauthorizedError extends Error {
    
    constructor(public message: string, error?: any) {
        super(message);
        Object.setPrototypeOf(this, UnauthorizedError.prototype);
    }
}