const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017/";

exports.register = async function(req, res) {
    let {username, password} = req.body;
    try {
        db = await MongoClient.connect(url);

        const existingUser = await db.db("taches").collection('utilisateur').count({username : username}, {limit : 1});

        if (username.length < 3) {
            throw err = "Username must have 3 letters !";
        }

        if (existingUser) {
            throw err = "Username already exist !";
        }

        await db.db("taches").collection("utilisateur").insertOne(req.body);
        db.close();
        return res.status(200).send();
        
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: err })
    }
}

exports.login = async function(req, res) {
    let {username, password} = req.body;
    try {

        console.log(req.body);
        db = await MongoClient.connect(url);

        const user = await db.db("taches").collection("utilisateur").findOne({username: username});

        if(!user){
            throw err = "User does not exist";
        }
        
        if(password !== user.password){
            throw err = "Wrong Credential" ;
        }

        req.session.user = username;
        req.session._id = user._id.toString();
        db.close();

        return res.status(200).end();
            
    } catch (err) {
        return res.status(401).json({ message: err })
    }
}

exports.logout = async function(req, res) {
    if (req.session)
        return await req.session.destroy();
    return res.status(200).end();
};

exports.logged = async function(req, res) {
    if (req.session.user) {
        return res.status(200).end();
    } else {
        return res.status(401).json({ message: "Unauthorized" })
    }
};

exports.user = async function(req, res) {
    if (req.session.user) {
        return res.status(200).json({
            username: req.session.user,
            _id : req.session._id
        });
    } else {
        return res.status(401).json({ message: "Unauthorized" })
    }
}