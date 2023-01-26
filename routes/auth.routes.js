const authController = require('../controllers/auth.controller.js');

module.exports = (app) => {
    app.post('/register', authController.register);
    app.post('/login', authController.login);
    app.post('/logout', authController.logout);
    app.get('/logged', authController.logged);
    
    app.get('/user', authController.user);

}