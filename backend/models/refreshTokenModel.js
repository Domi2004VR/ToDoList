const mongoose = require('mongoose')

const refreshTokenSchema = mongoose.Schema({
    token:{
        type: String,
        required: true,
        unique: true,
    },
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }

})

const RefreshToken = mongoose.model('RefreshToken',refreshTokenSchema)

module.exports = RefreshToken