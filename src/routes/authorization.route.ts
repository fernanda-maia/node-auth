import config from 'config';
import JWT, { SignOptions } from 'jsonwebtoken';
import { StatusCodes } from 'http-status-codes';
import { NextFunction, Request, Response, Router } from 'express';

import basicAuthentication from '../middleware/basic.auth';
import JWTAuthentication from '../middleware/jwt.auth';

const authRoute = Router();

authRoute.post('/token', basicAuthentication, async (req: Request, res: Response, next: NextFunction) => {
    try {
        const { user } = req;

        const payload = { username: user!.username };
        const secret = config.get<string>("authentication.cryptKey");
        const options: SignOptions = { subject: user!.uuid, expiresIn: "2h" };
        
        const jwtToken = JWT.sign(payload, secret, options);

        res.status(StatusCodes.OK).json({ token: jwtToken });

    } catch(error) {
        next(error);
    }
});

authRoute.post('/token/validate', JWTAuthentication, (req: Request, res: Response, next: NextFunction) => {
    res.sendStatus(StatusCodes.OK);
});

export default authRoute;