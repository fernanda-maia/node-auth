import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response } from 'express';
import DatabaseError from '../model/errors/database.error.model';

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
    if(err instanceof DatabaseError) {
        res.sendStatus(StatusCodes.BAD_REQUEST);
    } else {
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }
}

export default errorHandler;