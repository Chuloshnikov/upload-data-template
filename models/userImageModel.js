const mongoose = require('mongoose');

const userImageSchema = mongoose.Schema({
    fullname: {
        type: String,
        require: [true, 'Fullname is required']
    },
    photo: {
        type: String,
        default: null
    },
    
})

const UserImage = mongoose.model('UserImage', userImageSchema);

module.exports = UserImage;