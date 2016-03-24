var path = require('path'),
    express = require('express'),
    router = express.Router();

/* GET home page. */
function renderIndex(req, res) {
    res.sendFile('index.html', {'root': path.resolve(".") + '/dist/webapp'});
};
router.get('/*', renderIndex);

module.exports = router;