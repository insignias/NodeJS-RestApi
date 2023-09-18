import { Express, Request, Response } from 'express';
import { createUserSchema } from './schema/user.schema';
import { createUserHandler } from './controller/user.controller';
import validateResource from './middleware/validateResource';
import { createSessionHandler, getSessionHandler } from './controller/session.controller';
import { createSessionSchema } from './schema/session.schema';
import requireUser from './middleware/requireUser';

function routes(app: Express) {
    app.get('/healtcheck', (req: Request, res: Response) => res.sendStatus(200))

    app.post('/api/users', validateResource(createUserSchema), createUserHandler)

    app.post('/api/sessions', validateResource(createSessionSchema), createSessionHandler)

    app.get('/api/sessions', requireUser, getSessionHandler)
}

export default routes;