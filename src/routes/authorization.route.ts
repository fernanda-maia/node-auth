import JWT from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response, Router } from 'express';

import basicAuthentication from '../middleware/basic.auth';

const authRoute = Router();

authRoute.post('/token', basicAuthentication, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;

        const payload = { username: user!.username };
        const secret = "my_secret_key";
        const options = { subject: user!.uuid };
        
        const jwtToken = JWT.sign(payload, secret, options);

        res.status(StatusCodes.OK).json({ token: jwtToken });

    } catch(error) {
        next(error);
    }
});

export default authRoute;