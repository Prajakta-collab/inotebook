const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/?readPreference=primary&appname=MongoDB%20Compass&ssl=false://localhost:27017/?readPreference=primary&ssl=false";

connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Conneted to mongodb successfully ");
    })
}
module.exports=connectToMongo;