import mongoose, { mongo, MongooseError } from "mongoose"

const placeschema = new mongoose.Schema({
    Destination : {type : String , required : true , unique : true} , 
    region : {type : String , required : true} , 
    bestime : {type : String , required : true} , 
    spots :{type  : [String] , required : true },
    food : {type : String , required : true} , 
    budget : {type : String , required : true}, 
    travel : {type : String , required : true} , 
    activities : {type : String , required : true}
} , {timestamps : true})

export const Places = mongoose.model("Place" , placeschema); // this will create a database collections in mongodb with "places"