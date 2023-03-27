const { Router } = require("express");
const {uploadModel} = require("../Models/upload.model")
const uploadController = Router()
const cloudinary = require("cloudinary").v2;
const jwt = require("jsonwebtoken")


cloudinary.config({
    cloud_name: "dkpsiuvz9",
  api_key: "526497836563942",
  api_secret: "qN8QvkdO7uCUIEGu6nwgkBw7wUs",
    secure: true,
  });


  uploadController.get("/", async (req, res) => {
    //console.log(req.body);
    const { _id } = req.query;
    let result
    if(_id){
  result = await uploadModel.find({_id})
    }else{
   result = await uploadModel.find().sort({ createdAt: -1 });
    }
    
    res.json(result);
  });



    uploadController.post("/new", async (req, res) => {
    const {imageUrl}=req.body

    const file = req.files.photo;
   
    cloudinary.uploader.upload(file.tempFilePath,  async (err, result  ) => {
     
      const token = req.headers.authorization.split(" ")[1]
    jwt.verify(token,'secret',async function(err){
      if(err)
      {
        res.json({msg:"Please Login" , status:false})
      }
      else{
        const Newupload = new uploadModel({imageUrl:result.url})
        await Newupload.save()
        res.json({msg:"Successfully Uploades" , status:true})
      }
    })
      
    })
  });


  
module.exports={
    uploadController
}