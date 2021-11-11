import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response, Router } from 'express';

import ForbiddenError from '../model/errors/forbidden.error.model';
import userRepository from '../database/repositories/user.repository';

const authRoute = Router();

authRoute.post('/token', async (req: Request, res: Response, next: NextFunction) => {
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
        console.log(user)
        res.status(StatusCodes.CREATED).send();

    } catch(error) {
        next(error);
    }
});

export default authRoute;