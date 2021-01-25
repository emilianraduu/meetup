import authController from '../controllers/auth.controller'

import {Router} from 'express'
import {catchErrors} from "../helpers/errorHelpers";
import {isAuthenticated} from "../middleware/auth";

const api = Router()

api.post("/login", catchErrors( authController.login));
api.get("/getUser", isAuthenticated, catchErrors( authController.getUser));
api.post("/logout", isAuthenticated, catchErrors(authController.logout));

export default api
