import userController from '../controllers/user.controller'

import {Router} from 'express'
import {catchErrors} from "../helpers/errorHelpers";
import APIError from "../helpers/apiError";
import {isAuthenticated} from "../middleware/auth";

const api = Router()


/**
 * @swagger
 * /user:
 *    post:
 *      summary: This shall return each date and value update starting with creation date for selected betting market
 *      responses:
 *        200:
 *           description: fetch daily odds events
 */




api.post("/", catchErrors( userController.create));

api.get("/", isAuthenticated, catchErrors( userController.findAll));

api.get("/published", catchErrors( userController.findAllPublished));

api.get("/:id", catchErrors(userController.findOne));

api.put("/:id", catchErrors(userController.update));

api.delete("/:id", catchErrors(userController.delete));

api.delete("/", catchErrors(userController.deleteAll));

export default api
