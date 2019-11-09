const mongoose = require('mongoose');
const MongModels = require('../models/model');

const Cake = MongModels.Cake;
const Review = MongModels.Review;

module.exports = {
    allCakes: function(req, res) {
        Cake.find()
            .then(data => res.json({ message: "success", result: data }))
            .catch(err => res.json({ message: "We have an error", result: err }))
    },
    oneCake: function(req, res) {
        Cake.findOne({ _id: req.params.id })
            .then(data => res.json({ message: "success", result: data }))
            .catch(err => res.json({ message: "We have an error", result: err }))
    },
    newCake: function(req, res) {
        let cake = req.body;
        Cake.create(cake)
            .then(data => res.json({ message: "success", result: data }))
            .catch(err => res.json({ message: "We have an error", result: err }))
    },
    newReview: function(req, res) {
        let review = req.body;
        Review.Create(review)
            .then(data => {
                Cake.updateOne({ _id: req.params.id }, { $addToSet: { reviews: data } })
                    .then(data => res.json({ message: "success", result: data }))
                    .catch(err => res.json({ message: "We have an error", result: err }))
            })
            .then(data => res.json({ message: "success", result: data }))
            .catch(err => res.json({ message: "We have an error", result: err }))
    },
    removeCake: function(req, res) {
        Cake.deleteOne({ _id: req.params.id })
            .then(data => res.json({ message: "success", result: data }))
            .catch(err => res.json({ message: "We have an error", result: err }))
    }
}