const users = require('../MOCK_DATA.json');

exports.getusers = (req,res) =>{
    // console.log("this is user ?",req.user);
    // if(users.length > 0){
    //     return res.render('home',{users, error:null});
    // }
    // else{
    //     return res.status(404).render('home',{users:[] , error:'No users Found'});
    // }
    return res.render('home');
}

exports.getuserbyid = (req,res) =>{
    const id = Number(req.params.id);
    const user = users.find((user)=> user.id === id);
    if (!user) {
        return res.status(404).send('User not found');
    }
    return res.render('userid',{user});
}