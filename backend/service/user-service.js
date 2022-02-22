import {User, UserRating} from "../models/userModel.js";
import bcrypt from "bcrypt";
import {v4} from 'uuid'
import mailService from "./mail-service.js";
import tokenService from "./token-service.js";
import UserDto from '../dtos/user-dto.js'
import ApiErrors from "../exceptions/api-errors.js";
import {Art} from "../models/artsModel.js";

class UserService {
    async registration(name, email, password) {
        const candidate = await User.findOne({where: {email}})
        if (candidate) {
            throw ApiErrors.BadRequest(`Пользователь с почтовым адресов ${email} уже зарегистрирован.`)
        }
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        const hash = bcrypt.hashSync(password, salt);
        const activationLink = v4();

        const user = await User.create({name, email, password: hash, activationLink, isActivated: false})
        await mailService.sendActivationMail(email, `${process.env.API_URL}/api/activate/${activationLink}`)

        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async login(email, password) {
        const user = await User.findOne({where: {email}})
        if (!user) {
            throw ApiErrors.BadRequest(`Пользователь с почтовым адресом ${email} не найден`)
        }
        const isPassEquals = await bcrypt.compare(password, user.password)
        if (!isPassEquals) {
            throw ApiErrors.BadRequest(`Пароль или почтовый адрес не верный`)
        }
        const userDto = new UserDto(user)
        const tokens = tokenService.generateTokens({...userDto})
        const lib = await this.getUserLib(user.id)

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            lib,
            user: userDto
        }
    }

    async activate(activationLink) {
        const user = await User.findOne({where: {activationLink}})
        if (!user) {
            throw ApiErrors.BadRequest('Неверная ссылка для активации')
        }
        user.isActivated = true;
        await user.save();
    }

    async logout(refreshToken) {
        return await tokenService.removeToken(refreshToken)
    }

    async refresh(refreshToken) {
        if (!refreshToken) {
            throw ApiErrors.UnauthorizedError()
        }
        const userData = tokenService.validateRefreshToken(refreshToken)
        const tokenFromDb = await tokenService.findToken(refreshToken)
        if (!userData || !tokenFromDb) {
            throw ApiErrors.UnauthorizedError()
        }
        const user = await User.findOne({where: {id: userData.id}})
        const userDto = new UserDto(user)

        const tokens = tokenService.generateTokens({...userDto})

        await tokenService.saveToken(userDto.id, tokens.refreshToken)

        return {
            ...tokens,
            user: userDto
        }
    }

    async getAllUsers() {
        const users = await User.findAll()
        return users
    }

    async getUserLib(id) {
        const user = await User.findOne({where: {id}})
        const arts = user.getArts();
        return arts
    }

    async addArtToUserLib(userId, artId, settings) {
        const art = await Art.findOne({where: {id: artId}})
        const user = await User.findOne({where: {id: userId}})
        await user.addArt(art, {
            through: {
                rating: settings.rating,
                episodes_watched: settings.episodes_watched,
                status: settings.status
            }
        })
    }

    async deleteArtFromUserLib(userId, artId) {
        await UserRating.destroy({where: {userId, artId}})

    }

    async changeArt(userId, artId, settings) {
        const response = await UserRating.update({
            rating: settings.rating,
            episodes_watched: settings.episodes_watched,
            status: settings.status
        }, {where: {artId, userId}})
        return response
    }

    async changeAccount(data = {}) {
        const user = await User.findOne({where: {id: data.id}})
        let newPassword
        let oldPassword = data.oldPassword
        const saltRounds = 10;
        const salt = bcrypt.genSaltSync(saltRounds);
        if (data.newPassword === '') {
            newPassword = user.password
        } else {
            newPassword = await bcrypt.hash(data.newPassword, salt)
        }
        let newUser
        const passwordVerify = await bcrypt.compare(oldPassword, user.password)
        if (passwordVerify) {
            await user.update({name: data.name, password: newPassword})
            newUser = await User.findOne({where: {id: data.id}})
        }
        return newUser
    }
}

export default new UserService()