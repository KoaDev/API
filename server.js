const express = require('express');
const session = require('express-session');

const bodyParser = require('body-parser');
const cors = require('cors')

const authRoutes = require('./routes/auth.routes.js');
const taskRoutes = require('./routes/task.routes.js');
const listRoutes = require('./routes/list.routes.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use(cors({credentials: true, origin: 'http://localhost:4200'}));
app.use(session({
    secret: "secret",
    name: "cookie"
}));


authRoutes(app);
taskRoutes(app);
listRoutes(app);

app.listen(port, () => {
    console.log(`L'application écoute le port ${port}`)
})