const mongoose= require("mongoose");

const userSchema=new mongoose.Schema({

    username:{
        type:String,
        require:true

    },
    designation:String,
    email:{
        type:String,
        index : {unique :true}

    },
    password:String

})


module.exports = mongoose.model("user", userSchema);