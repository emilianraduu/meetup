import jwt from 'jsonwebtoken'
import {TOKEN_SECRET} from "../config";
import APIError from "../helpers/apiError";
import httpStatus from "http-status";

export const isAuthenticated = async (req, res, next) => {
    const {headers: {authorization}} = req
    let token = authorization && authorization.split(' ')
    if(token && token[1]){
        token = token[1]
    }
    if (token == null) {
        return new APIError('UNAUTHORIZED', httpStatus.UNAUTHORIZED)
    }
    jwt.verify(token, TOKEN_SECRET, (err, user) => {
        if (err) {
            return new APIError('FORBIDDEN', httpStatus.FORBIDDEN)
        }
    })
    next()
}

export const  generateAccessToken = (username) => {
    return jwt.sign(username, TOKEN_SECRET, { expiresIn: '188888800s' });
}
