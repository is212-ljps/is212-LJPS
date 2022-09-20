const express = require('express');
const router = express.Router();


router.get('/test', function (req, res) {
    console.log('test')
    res.sendStatus(200)
});



module.exports = router;
