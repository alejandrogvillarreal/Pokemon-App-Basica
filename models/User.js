const mongoose = require('mongoose')
const bcrypt = require('bcryptjs');

const userModel = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    pokemons: [{ type: mongoose.Schema.Types.ObjectId, ref: 'pokemons' }],
}, { versionKey: false });

const User = mongoose.model('Users', userModel)

User.find({}, (error, result) => {
    if (error) {
        console.log('Error para insertar los Users Fake');
    }

    if (result.length < 1) {
        User.create({
            username: 'admin',
            password: '$2a$10$3b4C31mFFfJwBCHlWaTX0.kshZm3lvYAZWCMXV6C1qTXUqmKg0RZy',
        });

    }
});

module.exports = User;

module.exports.createUser = function (newUser, callback) {
    bcrypt.genSalt(10, function (err, salt) {
        bcrypt.hash(newUser.password, salt, function (err, hash) {
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

module.exports.getUserByUsername = function (username, callback) {
    const query = { username: username };
    User.findOne(query, callback);
}

module.exports.getUserById = function (id, callback) {
    User.findById(id, callback);
}

module.exports.comparePassword = function (candidatePassword, hash, callback) {
    bcrypt.compare(candidatePassword, hash, function (err, isMatch) {
        if (err) throw err;
        callback(null, isMatch);
    });
}