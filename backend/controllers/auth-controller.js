import User from "../models/userModel.js";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import {config} from '../config/config.js'

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, config.secret, {expiresIn: '1h'})
}

export class authController {
    static async registration(req, res) {
        try {
            const {name, password} = req.body;
            const candidate = await User.findOne({where: {name: name}});
            if (candidate) {
                return res.status(400).json({message: `Пользователь с именем ${name} уже зарегистрирован`})
            }
            const saltRounds = 10;
            const salt = bcrypt.genSaltSync(saltRounds);
            const hash = bcrypt.hashSync(password, salt);
            const user = new User({name, password: hash})
            await user.save()
            return res.json({message: 'Вы успешно зарегистрировались'})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Registration error'})
        }
    }

    static async login(req, res) {
        try {
            const {name, password} = req.body;
            const user = await User.findOne({where: {name: name}})
            if (!user) {
                return res.status(400).json({message: `Пользователь с именем ${name} не зарегистрирован`})
            }
            const validPassword = bcrypt.compareSync(password, user.password)
            if (!validPassword) {
                return res.status(400).json({message: `Вы ввели неправильный пароль`})
            }

            const token = generateAccessToken(user.id, user.roles)
            return res.json({token})
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }

    static async getAllUsers(req, res) {
        try {
            const users = await User.findAll();
            res.json(users);
        } catch (e) {
            console.log(e)
            res.status(400).json({message: 'Login error'})
        }
    }
}