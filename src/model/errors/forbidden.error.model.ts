export default class ForbiddenError extends Error {
    
    constructor(public message: string, error?: any) {
        super(message);
        Object.setPrototypeOf(this, ForbiddenError.prototype);
    }
}