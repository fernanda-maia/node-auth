import { NextFunction, Request, Response } from 'express';

import ForbiddenError from '../model/errors/forbidden.error.model';
import userRepository from '../database/repositories/user.repository';

async function basicAuthentication(req: Request, res: Response, next: NextFunction) {
    try {
        const { authorization } = req.headers;
        
        if(!authorization) {
            throw new ForbiddenError("Something went wrong!");
        }
        
        const [ authType, token ] = authorization.split(" ");
        
        if(authType !== 'Basic' || !token) {
            throw new ForbiddenError("Something went wrong!");
        }
        
        const content = Buffer.from(token, 'base64').toString('utf-8');
        const [ username, password ] = content.split(":");

        if(!username || !password) {
            throw new ForbiddenError("Something went wrong!");
        }

        const user = await userRepository.findByUsernameAndPassword(username, password);

        if(!user) {
            throw new ForbiddenError("Something went wrong!");
        }

        req.user = user;
        next();
        
    } catch(error) {
        next(error);
    }
    
}

export default basicAuthentication;