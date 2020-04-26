
const user=[
    {
        username:'unique',
        password:'11'
    }
];

function findOne(username){
    // console.log('hi from db');
    // console.log(username)
    // console.log(user.find(data=>data.username===username))
    return user.find(data=>data.username===username)
}

// const findOne=(username)=>{
//     return user.find(data=>data.username===username)
// }

module.exports={findOne};