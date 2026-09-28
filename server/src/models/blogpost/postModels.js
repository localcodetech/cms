import sequelize from "../../database/dbConfig.js"
import { DataTypes } from "sequelize"





const BlogPost = sequelize.define(
    "blogPost",{
        userId : {
            type: DataTypes.INTEGER,
            allowNull : false
        },
        uuid : {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4
        },
        title : {
            type: DataTypes.STRING,
            allowNull: false 
        },
        content : {
            type: DataTypes.TEXT,
            allowNull: false 
        },

        status : {
            type : DataTypes.ENUM("draft", "published"),
            allowNull : false,
            defaultValue : "draft"

        },
        coverImage : {
            type: DataTypes.STRING,
            allowNull: true
        }
    }
)



export default BlogPost;