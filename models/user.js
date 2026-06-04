const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: false
    },
    email:{
        type:String,
        required: false,
        unique: true
    },
    password: {
        type: String,
        required: false
    },
    phone_number: {
        type: Number
    },
    profile_image: {
        type: String,
        default: null
    },
    status: {
        type: String,
        enum: ['active', 'inactive'],
        default: 'active'
    },
    role: {
        type: String,
        enum: ['user', 'admin','organization'],
        default: 'admin'
    }
},{
    timestamps: true
})

module.exports = mongoose.model('User',userSchema)