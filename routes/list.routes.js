const listController = require('../controllers/list.controller.js');

module.exports = (app) => {
    app.get('/list/', listController.get);
    app.post('/list/', listController.authorized, listController.post);
    app.delete('/list/:id', listController.authorized, listController.delete);

}