const User = require("../model/userModel")
const bcrypt = require("bcrypt")

// for register 
module.exports.register = async (req,res,next) =>{
try{
    const {username,email,password}=req.body;
const usernameCheck = await User.findOne({username});
if(usernameCheck)   
return res.json({msg:"Username already used",status:false});
 const emailCheck = await User.findOne({email});
 if(emailCheck)
 return res.json({msg:"Email is already used", status:false});
 const hashedpassword = await  bcrypt.hash(password,10);

 
 const user = await User.create({
    email,
    username,
    password:hashedpassword,
 });
 delete user.password;   
 return res.json({status:true,user});
 
} catch(ex){
    next(ex);
}
};

// for login 

module.exports.login = async (req,res,next) =>{
    try{
        const {username,password}=req.body;
        const user = await User.findOne({username});
     if(!user)   
    return res.json({msg:"Incorrect username and password ",status:false});
    
    const ispasswordvalid = await bcrypt.compare(password,user.password);
    if(!ispasswordvalid)
    return res.json({msg:"Incorrect username and password", status:false});
     delete user.password; 
     return res.json({status:true,user});
     
    } catch(ex){
        next(ex);
    }
    };
//   for avtar 
    module.exports.setAvtar= async (req,res,next) =>{
   try{
       const userId = req.params.id;
       const avtarimage = req.body.image;
     
       const userData = await User.findByIdAndUpdate(userId,{
        isAvtarImageSet:true,
        avtarimage,
       },
       { new: true });
       return res.json({isSet:userData.isAvtarImageSet,image:userData.avtarimage});




   }catch(ex){
    next(ex);
   }
    };




    // for contacts

    module.exports.getAllUsers= async (req,res,next) =>{
        try{
              const users = await User.find({_id:{$ne:req.params.id}}).select([
                "email","username","avtarimage","_id",
              ]);
              return res.json(users);
        }catch(ex){
    next(ex);
   }
    };