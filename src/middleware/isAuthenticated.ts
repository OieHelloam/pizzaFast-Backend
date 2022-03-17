import {NextFunction, Request, Response} from 'express'
import { verify } from 'jsonwebtoken'

interface Payload {
    sub: string;

}

export function isAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction
){

    //receber o token//
    const authToken = req.headers.authorization
    if(!authToken){
        return res.status(401).end();
    }
    const [, token] = authToken.split(" ")

    //validar o token
    try{
        const {sub} = verify(
            token,
            process.env.JWT_SECRET
        ) as Payload;
        /* console.log(sub) */

        //recurer o id do token e colocar dentro de uma variavel
        req.user_id = sub

        return next();
    }catch(err){
        return res.status(401).end()
    }
}