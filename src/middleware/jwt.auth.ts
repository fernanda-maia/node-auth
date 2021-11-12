import JWT from 'jsonwebtoken';
import { NextFunction, Request, Response } from 'express';

import ForbiddenError from '../model/errors/forbidden.error.model';

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
            const payload = JWT.verify(token, "my_secret_key");

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
        } catch(error) {
            throw new ForbiddenError("Something went wrong!");
        }
    
    } catch(error) {
        next(error);
    }
}

export default JWTAuthentication;