import {Sequelize} from "sequelize";
import db from "../config/database.js";
import {Art} from "../models/artsModel.js";

const {DataTypes} = Sequelize;

export const User = db.define('users', {
    name: {type: DataTypes.STRING, unique: true},
    email: {type: DataTypes.STRING, unique: true},
    isActivated: {type: DataTypes.BOOLEAN, default: false},
    activationLink: {type: DataTypes.STRING},
    password: {type: DataTypes.STRING},
    roles: {type: DataTypes.STRING, default: 'user'},
    avatar: {type: DataTypes.STRING, default: '/default.jpg'}
}, {freezeTableName: true});

export const Token = db.define('tokens', {
    id: {type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    refreshToken: {type: DataTypes.TEXT, required: true},
}, {freezeTableName: true});

export const UserRating = db.define("user_rating", {
    id: {type: Sequelize.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false},
    status: {type: Sequelize.STRING, allowNull: true},
    episodes_watched: {type: Sequelize.INTEGER, allowNull: true},
    rating: {type: Sequelize.INTEGER, allowNull: true}
});

User.hasOne(Token, {onDelete: 'cascade'})
User.belongsToMany(Art, {through: UserRating})
Art.belongsToMany(User, {through: UserRating})
