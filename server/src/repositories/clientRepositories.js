

import ClientModel from "../models/clientModels.js";


// CRUD ACTIONS HERE =>
   
   
    //  C    =====> CREATE  
    
    


export const createClientData = async (data) =>{
    return await ClientModel.create(data);
};



// R   =======> READ



export const findClientByID = async (id) =>{
    return await ClientModel.findByPk(id);
};



export const findClientByName = async (name) =>{
    return await ClientModel.findOne({where: {name}})
};

export const findClientByEmail = async (email) =>{
    return await ClientModel.findOne({where: {email}})
};



// U   =======> UPDATE

export const updateClientData = async (id, name,email, phone, company, status) =>{
    return await ClientModel.update({email:email,
        name:name, phone:phone, company: company, status:status
    }, {where: {id}})
};



// D =========> DELETE / DESTROY 


export const deleteClientData = async (id) =>{
    return await ClientModel.destroy({where: {id:id}})
};