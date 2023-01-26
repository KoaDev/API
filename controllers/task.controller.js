const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
const url = "mongodb://127.0.0.1:27017/";

exports.get = async function(req, res) {
    try {
        db = await MongoClient.connect(url);
        let datas = await db.db("taches").collection("taches").find({"owner" : req.session._id }).toArray();
        db.close();
        return res.status(200).json(datas);
    } catch (err) {
        return res.status(401).json({ message: err })
    }
};

exports.post = async function(req, res, next) {
    let tache = req.body;
    try {
        if(tache.title.length < 3) {
            throw err = "Task must have 3 letters !";
        }

        if(tache.list_id.length < 3) {
            throw err = "Task must have a list !";
        }

        db = await MongoClient.connect(url);
        await db.db("taches").collection("taches").insertOne(tache);
        db.close();

        return res.status(200).json(tache); 
    } catch (err) {
        return res.status(401).json({ message: err })
    }
};

exports.delete = async function(req, res, next) {
    try {
        db = await MongoClient.connect(url);
        await db.db("taches").collection("taches").deleteOne({ _id: new mongodb.ObjectId(req.params.id) });
        db.close();
        return res.status(200).send();
    } catch (err) {
        return res.status(401).json({ message: err })
    }
};

exports.put = async function(req, res, next) {
    try {
        db = await MongoClient.connect(url);
        await db.db("taches").collection("taches").updateOne({ _id: new mongodb.ObjectId(req.params.id) }, { $set: { title: req.body.title, status: req.body.status, list_id: req.body.list_id } });
        db.close();
        return res.status(200).send();
    } catch (err) {
        return res.status(401).json({ message: err })
    }
};

exports.authorized = function(req, res, next) {
    if (req.session.user) {
        return next();
    } else {
        return res.status(401).send("Unauthorized");
    }
};