import userService from "../service/user-service.js";
import {validationResult} from "express-validator";
import ApiErrors from "../exceptions/api-errors.js";

class UserController {
    async registration(req, res, next) {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return next(ApiErrors.BadRequest('Ошибка при валидации', errors.array()))
            }
            const {name, email, password} = req.body
            const userData = await userService.registration(name, email, password)

            res.cookie('refreshToken', userData.refreshToken,
                {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async login(req, res, next) {
        try {
            const {email, password} = req.body;
            const userData = await userService.login(email, password)

            res.cookie('refreshToken', userData.refreshToken,
                {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async logout(req, res, next) {
        try {
            const {refreshToken} = req.cookies;
            const token = await userService.logout(refreshToken)
            res.clearCookie('refreshToken')
            return res.json(token)
        } catch (e) {
            next(e)
        }
    }

    async activate(req, res, next) {
        try {
            const activationLink = req.params.link;
            await userService.activate(activationLink)
            return res.redirect(process.env.CLIENT_URL);
        } catch (e) {
            next(e)
        }
    }

    async refresh(req, res, next) {
        try {
            const {refreshToken} = req.cookies
            const userData = await userService.refresh(refreshToken)

            res.cookie('refreshToken', userData.refreshToken,
                {maxAge: 30 * 24 * 60 * 60 * 1000, httpOnly: true})
            return res.json(userData)
        } catch (e) {
            next(e)
        }
    }

    async getAllUsers(req, res, next) {
        try {
            const arts = await userService.getAllUsers()
            return res.json(arts)
        } catch (e) {
            next(e)
        }
    }

    async getUserLib(req, res, next) {
        try {
            const {id} = req.body
            const arts = await userService.getUserLib(id)
            return res.json(arts)
        } catch (e) {
            next(e)
        }
    }

    async addArtToUserLib(req, res, next) {
        try {
            const {userId, artId, settings} = req.body
            const arts = await userService.addArtToUserLib(userId, artId, settings)
            return res.json(arts)
        } catch (e) {
            next(e)
        }
    }

    async deleteArtFromUserLib(req, res, next) {
        try {
            const {userId, artId} = req.body
            const arts = await userService.deleteArtFromUserLib(userId, artId)
            return res.json(arts)
        } catch (e) {
            next(e)
        }
    }

    async changeArtInLib(req, res, next) {
        try {
            const {userId, artId, settings} = req.body
            const arts = await userService.changeArt(userId, artId, settings)
            return res.json(arts)
        } catch (e) {
            next(e)
        }
    }

    async changeUserAccount(req, res, next) {
        try {
            const {data} = req.body
            const arts = await userService.changeAccount(data)
            return res.json(arts)
        } catch (e) {
            next(e)
        }
    }
}

export default new UserController();