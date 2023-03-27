const mongoose = require("mongoose")

const uploadSchema = new mongoose.Schema(
    {
      imageUrl:{type:String , required: true}
    },
    {timestamps:true}
)

const uploadModel = mongoose.model("upload" , uploadSchema)

module.exports ={
    uploadModel
}