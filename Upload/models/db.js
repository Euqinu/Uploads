
const user=[
    {
        id:'1',
        username:'unique',
        password:'11'
    }
];

function findOne(username){
    return user.find(data=>data.username===username)
}

async function findById(id){
    return user.find(data=>data.id===id)
}

module.exports={findOne,findById};