var express = require('express'),   
    router = express.Router(),
    mongojs = require('mongojs'),
    db = require('../db/db'),
    scoresMock = require('../db/scoresMock');   // require to prepopulate scores collection if empty

/* GET All Scores */
router.get('/scores', function (req, res, next) {
    db.scores.find(function (err, scores) {
        if (err) {
            res.send(err);
        } else {
            res.json(scores);
        }
    });
});
/* GET One Score with the provided ID */
router.get('/score/:id', function (req, res, next) {
    db.scores.findOne({
        _id: mongojs.ObjectId(req.params.id)
    }, function (err, scores) {
        if (err) {
            res.send(err);
        } else {
            res.json(scores);
        }
    });
});
/* POST/SAVE a Score */
router.post('/score', function (req, res, next) {
    var score = req.body;
    if (!score.text || !(score.isCompleted + '')) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.scores.save(score, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        })
    }
});
/* PUT/UPDATE a Score */
router.put('/score/:id', function (req, res, next) {
    var score = req.body;
    var updObj = {};
    if (score.isCompleted) {
        updObj.isCompleted = score.isCompleted;
    }
    if (score.text) {
        updObj.text = score.text;
    }
    if (!updObj) {
        res.status(400);
        res.json({
            "error": "Invalid Data"
        });
    } else {
        db.scores.update({
            _id: mongojs.ObjectId(req.params.id)
        }, updObj, {}, function (err, result) {
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }
});
/* DELETE a Score */
router.delete('/score/:id', function (req, res) {
    db.scores.remove({
        _id: mongojs.ObjectId(req.params.id)
    }, '', function (err, result) {
        if (err) {
            res.send(err);
        } else {
            res.json(result);
        }
    });
});

module.exports = router;