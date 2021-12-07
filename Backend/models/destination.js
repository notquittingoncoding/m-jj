const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const DestinationSchema = new Schema({

    title: {
        type: String,
        required: true
    },

    city: {
        type: String,
        required: true
    },


    description: {
        type: String,
        required: true
    },

    images: [ImageSchema],

    author: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    },

    reviews: [{
        type: Schema.Types.ObjectId,
        ref: 'Review'
    }],

    avgRating: Number

}, { timestamps: true })

module.exports = mongoose.model('Destination', DestinationSchema);