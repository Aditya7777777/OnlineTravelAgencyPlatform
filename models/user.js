const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const passportLocalMongoose = require("passport-local-mongoose");

const userSchema = new Schema({
    email: {
        type:String,
        required:true,
    }
})

userSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model('User',userSchema);


/* When we plugin passportLocalMongoose what it does is that it 
 automatically  implements username,hashing,salting and hash password 
we don't have to built it by scratch and there are also some method that passport 
 will add to our schema */

