import express, { Request, Response, NextFunction } from 'express';
import usersRoute from './routes/users.route';

const PORT = 3000;
const HOST = 'localhost'

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(usersRoute);

app.get('/status', (req: Request, res: Response, next: NextFunction) => {
    res.status(200).send({ status: 'UP' });
});

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});