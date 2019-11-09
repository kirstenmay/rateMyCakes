const controller = require('../controllers/controller');

module.exports = app => {
    app.get('/api/cakes', controller.allCakes);
    app.get('/api/cakes/:id', controller.oneCake);
    app.post('/api/cakes/new', controller.newCake);
    app.put('/api/cakes/:id/review', controller.newReview);
    app.delete('/api/cakes/:id/delete', controller.removeCake);
}