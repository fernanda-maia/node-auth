import { NextFunction, Request, Response, Router } from 'express';
import { StatusCodes } from 'http-status-codes';
import userRepository from '../database/repositories/user.repository';

const usersRoute = Router();

usersRoute.get('/users', async (req: Request, res: Response, next: NextFunction) => {
    const users = await userRepository.findAllUsers();
    
    res.status(StatusCodes.OK).send(users);
});

usersRoute.get('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
   try {
       const { uuid }= req.params;
       const user = await userRepository.findById(uuid);

       res.status(StatusCodes.OK).send(user);
       
   } catch(error) {
        next(error);
   }
   
});

usersRoute.post('/users', async (req: Request, res: Response, next: NextFunction) => {
    try {
        const newUser = await userRepository.createUser(req.body);
        res.status(StatusCodes.CREATED).send(newUser);

    } catch(error) {
        next(error);
    }
});

usersRoute.put('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const userToUpdate = req.body;
        userToUpdate.uuid = req.params.uuid;
    
        await userRepository.updateUser(userToUpdate)
        res.status(StatusCodes.NO_CONTENT).send();

    } catch(error) {
        next(error);
    }
});

usersRoute.delete('/users/:uuid', async (req: Request<{ uuid: string }>, res: Response, next: NextFunction) => {
    try {
        const { uuid } = req.params;
        await userRepository.deleteUser(uuid);
    
        res.status(StatusCodes.NO_CONTENT).send();

    } catch(error) {
        next(error);
    }
});

export default usersRoute;