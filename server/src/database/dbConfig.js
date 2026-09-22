import dotenv from "dotenv";

import { Sequelize } from "sequelize";

dotenv.config()


const {DATABASE_URL} = process.env
const sequelize = new Sequelize(DATABASE_URL, {
    dialect : "postgres"
}) 



export default sequelize;