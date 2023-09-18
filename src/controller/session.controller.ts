import { Request, Response } from "express";
import { createSession, findSessions } from "../service/session.service";
import { validatePassword } from "../service/user.service";
import { signJwt } from "../utils/jwt.utils";
import config  from "config";


export async function createSessionHandler(req: Request, res: Response) {
    // Validate user's password
    const user = await validatePassword(req.body)

    if (!user) return res.status(401).send('Invalid email or password')

    // Create a session
    const session = await createSession(user._id, req.get("user-agent") || "");

    // Create an access token
    const accessToken = signJwt(
        {
        ...user,
          session: session._id
        },
        {
            expiresIn: config.get<string>("accessTokenTtl")
        }
    )

    // Create a refresh token
    const refreshToken = signJwt(
        {
        ...user,
          session: session._id
        },
        {
            expiresIn: config.get<string>("refreshTokenTtl")
        }
    )
    // Return access and refresh tokens
    res.send({accessToken, refreshToken})
}

export async function getSessionHandler(req: Request, res: Response) {
    const userId = res.locals.user._id;
    const sessions = await findSessions({user: userId, valid: true})
    res.send(sessions)
}