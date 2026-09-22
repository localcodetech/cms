import { DataTypes } from "sequelize";
import sequelize from "../database/dbConfig.js";




const User = sequelize.define('User', {
    uuid : {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false,

    },

    lastname : {
        type: DataTypes.STRING,
        allowNull: false
    },

    username : {
        type : DataTypes.STRING,
        unique: true,
        allowNull : false
    },
    email : {
        type: DataTypes.STRING,
        allowNull: false
    },

    password : {
        type : DataTypes.STRING,
        allowNull: false
    }
})



export default User;