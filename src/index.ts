import express, { Request, Response, NextFunction } from 'express';

import usersRoute from './routes/users.route';
import statusRoutes from './routes/status.route';
import authRoute from './routes/authorization.route';
import errorHandler from './middleware/error.handler';
import JWTAuthentication from './middleware/jwt.auth';

const PORT = 3000;
const HOST = 'localhost'

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(statusRoutes);
app.use(authRoute);

app.use(JWTAuthentication);
app.use(usersRoute);

app.use(errorHandler);

app.listen(PORT, () => {
    console.log(`Server is running on http://${HOST}:${PORT}`);
});