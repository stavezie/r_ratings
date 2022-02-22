import {Sequelize} from "sequelize";
import db from "../config/database.js";

const {DataTypes} = Sequelize;

export const Genre = db.define('genres', {
    name: {type: DataTypes.STRING}
})