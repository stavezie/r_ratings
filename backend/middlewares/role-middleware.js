import jwt from "jsonwebtoken";

export default function (incomingRoles) {
    return function (req, res, next) {
        if (req.method === "OPTIONS") next()

        try {
            const token = req.headers.authorization.split(' ')[1]
            if (!token) return res.status(403).json({message: 'Пользователь не авторизован'})
            const {roles: userRoles} = jwt.verify(token, process.env.JWT_ACCESS_SECRET)
            let hasRole = false
            console.log(userRoles)
            console.log(incomingRoles[0])
            userRoles.split(',').forEach(i => {
                if (incomingRoles.includes(i.trim())) {
                    hasRole = true
                }
            })

            if (!hasRole) {
                return res.status(403).json({message: 'Пользователь не имеет прав try'})
            }
            next()
        } catch (e) {
            console.log(e)
            return res.status(403).json({message: 'Пользователь не имеет прав catch'})
        }
    }
}