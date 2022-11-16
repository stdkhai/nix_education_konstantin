var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
        Name: {
            type: String,
            required: true,
            min: [3, "Ім'я має бути не коротше 3 символів"],
            max: [100, "Ім'я має бути не довше 20 символів"],
        },
        Email: {
            type: String,
            required: true,
            unique:true,
        },
        Password: {
            type: String,
            required: true,
        }
    
});

module.exports = mongoose.model('users', userSchema);