const Database=require('../config/keys.js')

const user=[
    {
        id:Database.id,
        username:Database.username,
        password:Database.password
    }
];

function findOne(username){
    return user.find(data=>data.username===username)
}

async function findById(id){
    return user.find(data=>data.id===id)
}

module.exports={findOne,findById};