const taskController = require('../controllers/task.controller.js');

module.exports = (app) => {
    app.get('/task/', taskController.get);
    app.post('/task/', taskController.authorized, taskController.post);
    app.delete('/task/:id', taskController.authorized, taskController.delete);
    app.put('/task/:id', taskController.authorized, taskController.put);
}