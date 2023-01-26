const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017/";

exports.authorized = function(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).send("Unauthorized");
    }
};

exports.get = async function(req, res) {
    db = await MongoClient.connect(url);

        try {
            db = await MongoClient.connect(url);
            let datas = await db.db("taches").collection("list").find({"owner" : req.session._id }).toArray()
            db.close();
            return res.status(200).json(datas);
        } catch (err) {
            return res.status(401).json({ message: err })
        }
};

exports.post = async function(req, res, next) {
    let {title, owner} = req.body;
    try {
        db = await MongoClient.connect(url);

        const existingList = await db.db("taches").collection("list").count({title : title}, {limit : 1});

        if (title.length < 3) {
            throw err = "List must have 3 letters !";
        }

        if (existingList) {
            throw err = "List already exist !";
        }

        await db.db("taches").collection("list").insertOne(req.body);
        db.close();
        return res.status(200).send();
    } catch (err) {
        console.log(err);
        return res.status(401).json({ message: err })
    }
};

exports.delete = async function(req, res, next) {
    try {
        db = await MongoClient.connect(url);
        await db.db("taches").collection("list").deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
        db.close();
        return res.status(200).send();
    } catch (err) {
        return res.status(401).json({ message: err })
    }
};