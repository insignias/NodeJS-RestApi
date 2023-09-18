import { Request, Response } from "express";
import logger from '../utils/logger';
import { createUser } from "../service/user.service";
import { createUserInput } from "../schema/user.schema";


export async function createUserHandler(req: Request<{}, {}, createUserInput>, res: Response) {
    try {
        const user = await createUser(req.body)
        return res.send(user);
    } catch (error: any) {
        logger.error(error.message)
        res.status(409).send(error.message)
    }
}