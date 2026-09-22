import User from "../models/userModels.js";






export const createUser = async (data) =>{

    return await User.create(data);
};


export const findUserByID = async (id) =>{
    return await User.findByPk(id);
};



export const findByUserEmail = async (email) =>{
    return await User.findOne({where:{
        email:email
    }})
};




export const findByUserName = async (username) =>{
    return await User.findOne({where:{
        username: username
    }});
};



export const findAllUSers = async () =>{
    return await User.findAll();
};



export const updateUSerInfo = async(id,password, username, firstname, lastname) =>{
    return await User.update({
        password: password,
        firstname:firstname,
        lastname: lastname,
        username: username
    },{
        where:{
            id: id
        }
    })
};





export const deleteUSerAccount = async (id) =>{
    return await User.destroy({where: {
        id:id
    }});
};



