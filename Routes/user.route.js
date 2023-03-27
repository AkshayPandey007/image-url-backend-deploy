const {Router} = require("express")
var bcrypt = require('bcryptjs');
require("dotenv").config()
const {userModel} = require("../Models/user.model")
const userController = Router()
const jwt = require("jsonwebtoken")

userController.post("/signup" ,async (req,res)=>{
    try{
    const {username, email, password }=req.body
     const usernameCheck = await userModel.findOne({ username });
    if (usernameCheck)
      return res.json({ msg: "Username already used", status: false });
    const emailCheck = await userModel.findOne({ email });
    if (emailCheck)
      return res.json({ msg: "Email already used", status: false });

    const hash = await bcrypt.hash(password, 10);
    const user = new userModel({username,email,password:hash})
    await user.save()
     res.send({msg:"SignUp Success" ,status: true, user })
    }
    catch(err){
    console.log(err)
    res.send("something went wrong")
}
})


userController.post("/login" ,async (req, res) => {
    
    try {
        const { username, password } = req.body;
        const user = await userModel.findOne({ username });
        if (!user)
          return res.json({ msg: "Incorrect Username ", status: false });
        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid)
          return res.json({ msg: "Incorrect Password", status: false });
          const token = jwt.sign({name:'bar'} , 'secret')
        return res.json({ status: true, user ,token });
      } catch (err) {
        res.send("something went wrong")
      }
    
  });


module.exports={
    userController
}