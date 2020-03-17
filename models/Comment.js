const mongoose = require('mongoose')

const commentModel = new mongoose.Schema({
    content: { type: String, required: true },
}, { versionKey: false });

const Comment = mongoose.model('comments', commentModel)

Comment.find({}, (error, result) => {
    if (error) {
        console.log('Error para insertar los Comments Fake');
    }

    if (result.length < 2) {
        Comment.create({
            content: 'COMENTARIOOOOOO',
        });
    
    }
});

module.exports = Comment;