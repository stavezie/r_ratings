import jwt from "jsonwebtoken";
import {Token} from '../models/userModel.js'


class TokenService {
    generateTokens(payload) {
        const accessToken = jwt.sign(
            payload,
            process.env.JWT_ACCESS_SECRET,
            {expiresIn: '15m'});
        const refreshToken = jwt.sign(
            payload,
            process.env.JWT_REFRESH_SECRET,
            {expiresIn: '30d'});
        return {
            accessToken,
            refreshToken
        }
    }

    validateAccessToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            return userData
        } catch (e) {
            return null
        }
    }

    validateRefreshToken(token) {
        try {
            const userData = jwt.verify(token, process.env.JWT_REFRESH_SECRET)
            return userData
        } catch (e) {

        }
    }

    async saveToken(userId, refreshToken) {
        const tokenData = await Token.findOne({where: {userId}})
        if (tokenData) {
            tokenData.refreshToken = refreshToken
            return tokenData.save()
        }
        return await Token.create({userId, refreshToken})
    }

    async removeToken(refreshToken) {
        return await Token.destroy({where: {refreshToken}})
    }

    async findToken(refreshToken) {
        const token = await Token.findOne({where: {refreshToken}})
        console.log('findToken', token)
        return token
    }

}

export default new TokenService()