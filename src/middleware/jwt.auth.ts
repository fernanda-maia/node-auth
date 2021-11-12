import config from 'config';
import JWT from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import ForbiddenError from '../model/errors/forbidden.error.model';
import UnauthorizedError from '../model/errors/unauthorized.error.model';

async function JWTAuthentication(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;

        if(!authorization) {
            throw new ForbiddenError("Something went wrong!");
        }

        const [ type, token ] = authorization.split(" ");

        if(type !== 'Bearer' || !token) {
            throw new ForbiddenError("Something went wrong!");
        }

        try {
            const payload = JWT.verify(token, config.get<string>("authentication.cryptKey"));
            
            if(typeof payload !== 'object' || !payload.sub) {
                throw new ForbiddenError("Something went wrong!");
            }
    
            const user = {
                uuid: payload.sub,
                email: payload.email,
                username: payload.username
            }
    
            req.user = user;
    
            next();

        } catch {
            throw new UnauthorizedError("Not allowed!");
        }

    } catch(error) {
        next(error);
    }
}

export default JWTAuthentication;