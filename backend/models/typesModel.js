import db from "../config/database.js";
import {Sequelize} from "sequelize";

const {DataTypes} = Sequelize;

export const Types = db.define('types', {
    name: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING},
})