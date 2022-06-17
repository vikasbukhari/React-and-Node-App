var express = require('express');
var router = express.Router();
var fs = require("fs");
/* GET users listing. */
router.get('/', function(req, res, next) {
    
    // Get ALl users and Send them to the client
    if(fs.existsSync('data/user.json')){
        let userData = JSON.parse(fs.readFileSync('data/user.json'));
        res.send(userData);
    }else{
        res.send([]);
    }
});

module.exports = router;
