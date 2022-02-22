import db from "../config/database.js";
import {Sequelize} from "sequelize";


const {DataTypes} = Sequelize;

export const ArtGenre = db.define('art_genre', {
    artId: {type: DataTypes.INTEGER},
    genreId: {type: DataTypes.INTEGER},
})