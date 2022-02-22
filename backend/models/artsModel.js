import {Sequelize} from "sequelize";
import db from "../config/database.js";
import {Genre} from "./genresModel.js";
import {ArtGenre} from "./artGenreModel.js";

const {DataTypes} = Sequelize;

export const Art = db.define('arts', {
    name: {type: DataTypes.STRING},
    type: {type: DataTypes.STRING},
    description: {type: DataTypes.TEXT},
    path: {type: DataTypes.STRING},
    date: {type: DataTypes.INTEGER},
    rating: {type: DataTypes.INTEGER, default: 0},
    popularity: {type: DataTypes.INTEGER, default: 0},
    episodes: {type: DataTypes.INTEGER, default: 0}
}, {
    freezeTableName: true
});



Art.belongsToMany(Genre, {through: ArtGenre})
Genre.belongsToMany(Art, {through: ArtGenre})

