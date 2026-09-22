import sequelize from "../database/dbConfig.js"
import { DataTypes } from "sequelize"





const ClientModel = sequelize.define("Client", {

    uuid : {
        type : DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
    },

    name : {
        type : DataTypes.STRING,
        allowNull : false,

    },

    email : {
        type : DataTypes.STRING,
        allowNull: false,
        unique : true
    },

    phone : {
        type : DataTypes.STRING,
        allowNull : false 
    },

    company : {
        type : DataTypes.STRING,

    },
    status : {
        type: DataTypes.STRING,
        allowNull: false
    }
})



export default ClientModel;