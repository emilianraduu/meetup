import {GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET, IOS_CLIENT_ID, TOKEN_SECRET} from "../config";
import {generateAccessToken} from "../middleware/auth";
import User from "../models/user.model";
import APIError from "../helpers/apiError";
import httpStatus from "http-status";
import jwt from "jsonwebtoken";
import emitter from "../helpers/emiter";
import app from "../index";

export default class authController {
    static login = async (req, res) => {
        const {body: {token: googleToken}} = req
        const resp = await getAccessTokenFromCode(googleToken)
        if (resp) {
            const {locale, email, family_name, given_name} = resp
            const jwtToken = generateAccessToken({locale, email, family_name, given_name})
            const user = new User({
                locale,
                family_name,
                given_name,
                email,
                token: jwtToken
            });
            const existingUser = await User.findOne({email})
            if (!existingUser) {
                try {
                    await user.save(user)
                } catch (err) {
                    return new APIError(err.message || "Some error occurred while creating the User.", httpStatus.INTERNAL_SERVER_ERROR)
                }
            }
            res.send({token: jwtToken, locale, email, family_name, given_name});
        } else {
            return new APIError('NOT FOUND', httpStatus.NOT_FOUND)
        }
    }
    static getUser = async (req, res) => {
        const {headers: {authorization}} = req
        let token = authorization && authorization.split(' ')
        if (token && token[1]) {
            token = token[1]
        }
        if (token == null) {
            return new APIError('UNAUTHORIZED', httpStatus.UNAUTHORIZED)
        }
        jwt.verify(token, TOKEN_SECRET, (err, user) => {
            if (err) {
                return new APIError('FORBIDDEN', httpStatus.FORBIDDEN)
            }
            if(user) {
                req.user = user
                res.send({...user, token});
            } else {
                return new APIError('NOT FOUND', httpStatus.NOT_FOUND)
            }
        })

    }
    static logout = async (req, res) => {
        const {user} = req
        try {
            if (user) {
                console.log('aici')
                app.io.emit('update_monsters',  'update_monsters')
                console.log('aici2')
                await User.findOneAndUpdate({email: user.email}, {token: ''})
                res.send({message: "Logout successful."});
            } else {
                return new APIError('NOT FOUND', httpStatus.NOT_FOUND)
            }
        } catch (e) {
            return new APIError(e.message || 'INTERNAL SERVER ERROR', httpStatus.INTERNAL_SERVER_ERROR)
        }
    };

}

const getAccessTokenFromCode = async (code) => {
    const {OAuth2Client} = require('google-auth-library');
    const client = new OAuth2Client(GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET);
    try {
        const ticket = await client.verifyIdToken({
            idToken: code,
            audience: IOS_CLIENT_ID,
        });
        return ticket.getPayload()
    } catch (e) {
        console.log(e)
    }
}
