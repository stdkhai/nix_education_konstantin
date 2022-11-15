var mongoose = require('mongoose');

var userSchema = new mongoose.Schema({
    Name: {
        type: String,
        required: [true, "Обов'язково заповніть ім'я"],
        min: [3, "Ім'я має бути не коротше 3 символів"],
        max: [100, "Ім'я має бути не довше 20 символів"],
        unique:true,
    },
    Email: {
        type: String,
        required: [true, "Обов'язково заповніть email"],
        unique:true,
    },
    Password: {
        type: String,
        required: [true, "Обов'язково заповніть пароль"],
    }
});

module.exports = mongoose.model('users', userSchema);