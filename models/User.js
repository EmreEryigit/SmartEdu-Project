const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const slugify = require('slugify');
const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,   
        unique: true,  
    },
    password: {
        type: String,
        required: true,
    },
    createdAt: {
        type : Date,
        default: Date.now,
    },
    
})
UserSchema.pre("save", function(next) {
    const user = this;
    bcrypt.hash(user.password, 10, (error, hash) => {
        user.password = hash;
        next()
    })
})
UserSchema.pre("validate", function(next) {
    this.slug = slugify(this.name, {
        lower: true,
        strict: true,
    });
    next()
})
const User = mongoose.model('User', UserSchema);
module.exports = User;