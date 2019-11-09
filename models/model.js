const mongoose = require('mongoose');


const ReviewSchema = new mongoose.Schema({
    rating: { type: Number, required: true, min: 1, max: 5 },
    comment: { type: String, required: true, minlength: 3 }
}, { timestamps: true });


const CakeSchema = new mongoose.Schema({
    baker: { type: String, required: true, minlength: 2 },
    imgUrl: { type: String, required: true },
    reviews: [ReviewSchema]
}, { timestamps: true });

const Review = mongoose.model('Review', ReviewSchema);
const Cake = mongoose.model('Cake', CakeSchema);

module.exports = {
    Review: Review,
    Cake: Cake
};