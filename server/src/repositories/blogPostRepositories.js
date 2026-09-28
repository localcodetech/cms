import BlogPost from "../models/blogpost/postModels.js";




// CRUD ======>



export const createPost = async (data) =>{

    return await BlogPost.create(data);

};



// R ==== READ ====



// read post by primaryKey
export const findPostByID = async (id) =>{
    return await BlogPost.findByPk(id);
};



// read post by  userId in relation user.id
export const findPostByUserId = async (userId) => {
    return await BlogPost.findAll({where: {userId: userId}})
}


// read posts according to status
export const findAllPostByStatus = async (status) =>{
    return await BlogPost.findAll({where: {status: status}})
}



// read all posts
export const findAllPost = async ()=>{
    return await BlogPost.findAll()
}



// U  ======> UPDATE

    export const updatePost = async (id, data) =>{
        return await BlogPost.update(data,{where:{id}})
    }




    
    // D ======= DELETE 


    export const deletePost =  async(id)  =>{
        return await BlogPost.destroy({where: {id}})
    }