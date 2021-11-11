import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';

import DatabaseError from '../model/errors/database.error.model';
import ForbiddenError from '../model/errors/forbidden.error.model';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    const instance = err.constructor.name;
    let code;

    switch(instance) {
        case DatabaseError.name:
            code = StatusCodes.BAD_REQUEST;
            break;

        case ForbiddenError.name:
            code = StatusCodes.FORBIDDEN;
            break;
    
        default:
            code = StatusCodes.INTERNAL_SERVER_ERROR;
    }
 
    res.sendStatus(code);
}

export default errorHandler;