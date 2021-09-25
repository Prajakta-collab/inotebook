const mongoose = require('mongoose');
const mongoURI="mongodb://localhost:27017/inotebook?readPreference=primary&appname=MongoDB%20Compass&directConnection=true&ssl=false"
connectToMongo=()=>{
    mongoose.connect(mongoURI,()=>{
        console.log("Conneted to mongodb successfully ");
    })
}
module.exports=connectToMongo;