const mongoose = require('mongoose')
const passportLocalMongoose = require('passport-local-mongoose')

const userSchema = new mongoose.Schema({
    //there is no need to add usernme and password (only the other fields) passport will do the work
    email: {
        type: String,
        required: true,
        unique: true
    }
})
// pass the username and password here
userSchema.plugin(passportLocalMongoose);


module.exports = mongoose.model('User', userSchema);