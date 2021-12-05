const mongoose = require('mongoose');
<<<<<<< HEAD

=======
>>>>>>> bbb789e9927c10e9152aa3d2dc7417338e71c803
const Schema = mongoose.Schema;

const ImageSchema = new Schema({
    url: String,
    filename: String
});

const DestinationSchema = new Schema({

    title: {
        type: String,
<<<<<<< HEAD
        required: true
=======
        required: [true, 'name of destination is required']
>>>>>>> bbb789e9927c10e9152aa3d2dc7417338e71c803
    },

    city: {
        type: String,
<<<<<<< HEAD
        required: true
    },


    description:{
     type:String,
     required:true
    },    

    images: [ImageSchema],
=======
        required: [true, 'location of destination is required']
    },

    price: Number,

    description: String,

    images: [ImageSchema],

>>>>>>> bbb789e9927c10e9152aa3d2dc7417338e71c803
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