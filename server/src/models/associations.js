import User from "./user/userModels.js";

import BlogPost from "./blogpost/postModels.js";



export const associationsModel = ()=>{
    User.hasMany(BlogPost, {
        foreignKey : "userId",
       onDelete: "CASCADE",
       onUpdate :  "CASCADE"

    });


    BlogPost.belongsTo(User, {
        foreignKey : "userId"
    })

};

